const { Pool } = require('pg');

const connectionPool = new Pool({
	ssl: true
});


async function getUserPassword(username) {
	const returnedValue = await connectionPool.query('SELECT password FROM admin WHERE username=$1', [username], (err, res) => {
		if (err) return null;

		if (res.rowCount != 1) return null;

		return res.rows[0].password;
	});

	return returnedValue;
}

async function signupUser(username, password) {
	const returnedValue = await connectionPool.query('INSERT INTO admin(username,password) VALUES ($1,$2)', [username, password], (err, res) => {
		console.log(err.message);
		if (err) return false;

		return true;
	});

	return returnedValue;
}

module.exports = { getUserPassword, signupUser };