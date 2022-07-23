const express = require('express');
const router = express.Router();

const SIGNUP_ENABLED = (process.env.SIGNUP_ENABLED == 'true') || false;

router.post('/', function(req, res, next) {
	if (SIGNUP_ENABLED) {

	} else {
		
	}
	res.sendStatus(200);
});