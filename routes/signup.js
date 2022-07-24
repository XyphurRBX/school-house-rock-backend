const express = require('express');
const db = require('../services/db');
const hash = require('../services/hash');
const router = express.Router();

const SIGNUP_ENABLED = process.env.SIGNUP_ENABLED == 'false' ? false : true;

router.post('/', async function(req, res) {

	if (!SIGNUP_ENABLED) return res.sendStatus(404);

	const username = req.body.username;
	const password = req.body.password;
	if (username == null || password == null) return res.status(400).send("Missing parameters");

	const hashedPassword = hash(password);
	const success = await db.signupUser(username, hashedPassword);
	if (!success) return res.status(400).send("Sign up errored");

	return res.sendStatus(200);
});

module.exports = router;