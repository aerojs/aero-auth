let session = require('express-session')
let AerospikeStore = require('aerospike-session-store')(session)

// Cookie: 6 months
const cookieDurationInSeconds = 6 * 30 * 24 * 60 * 60

module.exports = app => {
	const sessionOptions = {
		store: new AerospikeStore({
			namespace: app.db.namespace,
			set: 'Sessions',
			ttl: cookieDurationInSeconds,
			hosts: app.config.database.host || '127.0.0.1:3000'
		}),
		name: 'sid',
		secret: app.api.session.secret || require('crypto').randomBytes(64).toString('hex'),
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: true,
			maxAge: cookieDurationInSeconds * 1000
		}
	}

	return session(sessionOptions)
}