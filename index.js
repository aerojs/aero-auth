let passport = require('passport')

module.exports = app => {
	if(!app.db)
		throw new Error('The auth plugin needs to be loaded AFTER the database plugin')
	
	let db = app.db
	
	// Serialize
	// This means we're reducing the user data to a single hash by which the user can be identified.
	passport.serializeUser(function(request, user, done) {
		db.set('Users', user.id, user)
		.catch(console.error)
		.finally(() => done(null, user.id))
	})
	
	// Deserialize
	// This means a web page is requesting full user data by some kind of hash.
	passport.deserializeUser(function(id, done) {
		db.get('Users', id)
		.then(user => done(undefined, user))
		.catch(error => done(undefined, false))
	})
	
	// Middleware
	app.use(
		require('./lib/session')(app),
		passport.initialize(),
		passport.session()
	)
	
	// Logout
	app.get('/logout', function(request, response) {
		request.logout()
		
		Promise.delay(100).then(() => {
			response.redirect('/')
		})
	})
}