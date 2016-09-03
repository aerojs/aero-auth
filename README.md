# aero-auth
Allow users to login. Requires additional plugins for each login provider.

## Installation
Add `aero-auth` to `dependencies` in your `package.json`:

```json
"dependencies": {
	"aero-auth": "*"
}
```

Make sure you added a database plugin like [aerospike](https://github.com/aerojs/aero-aerospike) before `aero-auth` is loaded.

### Session secret
Your `security/api-keys.json` should include a session secret if you don't want sessions to be lost on server restart:

```json
{
	"session": {
		"secret": "11111111111111111111111111111111"
	}
}
```

## Database
This plugin will populate the `Users` table and assume that `id` is defined for users. It will also use the `Sessions` table to store session data.

## Logout
This plugin will add the route `/logout` which destroys the session and redirects back to the frontpage.