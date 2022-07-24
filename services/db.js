const { Pool } = require('pg');

const connectionPool = new Pool({
	ssl: {
		rejectUnauthorized: false,
	},
});


async function getUserPassword(username) {	
	try {
		const res = await connectionPool.query('SELECT password FROM admin WHERE username=$1', [username]);
		
		if (res.rowCount != 1) return null;

		return res.rows[0].password;
	} catch (err) {
		return null;
	}
}

async function signupUser(username, password) {
	try {
		const res = await connectionPool.query('INSERT INTO admin(username,password) VALUES ($1,$2)', [username, password]);

		return true;
	} catch (err) {
		return false;
	}
}

module.exports = { getUserPassword, signupUser };