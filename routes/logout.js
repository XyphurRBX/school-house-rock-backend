const express = require('express');
const router = express.Router();

router.post('/', function(req, res, next) {
	req.session.destroy();
	res.sendStatus(200);
});