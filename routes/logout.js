const express = require('express');
const router = express.Router();

router.post('/', function(req, res) {
	req.session.destroy();
	
	return res.sendStatus(200);
});

module.exports = router;