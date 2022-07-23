var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
// Actual implementation would check values in a database
	if (req.body.username=='foo' && req.body.password=='bar') {
		res.locals.username = req.body.username;
		next();
	} else {
		res.sendStatus(401);
	}
}, (req, res) => {
	req.session.loggedIn = true;
	req.session.username = res.locals.username;
	res.sendStatus(200);
});