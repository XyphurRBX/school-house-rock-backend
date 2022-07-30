const express = require('express');
const router = express.Router();

const SIGNUP_ENABLED = process.env.SIGNUP_ENABLED == 'false' ? false : true;

router.get('/signupenabled', function(req, res) {	
	return res.send(SIGNUP_ENABLED);
});

module.exports = router;