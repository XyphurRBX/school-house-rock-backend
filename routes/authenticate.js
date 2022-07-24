const express = require('express');
const db = require('../services/db');
const hash = require('../services/hash')
const router = express.Router();

router.post('/', async function(req, res, next) {
	const username = req.body.username;
	if (username == null) return res.sendStatus(401);

	const currentPassword = await db.getUserPassword(username);
	if (currentPassword == null) return res.sendStatus(401);

	const hashedPassword = hash(req.body.password);
	if (hashedPassword != currentPassword) return res.sendStatus(401);

	req.session.loggedIn = true;
	return res.sendStatus(200);
});

module.exports = router;