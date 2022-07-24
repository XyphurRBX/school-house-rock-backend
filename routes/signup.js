const express = require('express');
const db = require('../services/db');
const hash = require('../services/hash');
const router = express.Router();

const SIGNUP_ENABLED = (process.env.SIGNUP_ENABLED == 'true') || false;

router.post('/', async function(req, res) {

	if (!SIGNUP_ENABLED) return res.sendStatus(404);

	const username = req.body.username;
	const password = req.body.password;
	if (username == null || password == null) return res.sendStatus(400);

	const hashedPassword = hash(password);
	const success = await db.signupUser(username, hashedPassword);
	if (!success) return res.sendStatus(400);

	return res.sendStatus(200);
});

module.exports = router;