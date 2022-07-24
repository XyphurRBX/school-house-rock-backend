const express = require('express');
const router = express.Router();

router.get('/', async function(req, res) {
	return res.send(['testdata1', 'testdata2', 'testdata3']);
});

router.post('/', async function(req, res) {
	return res.send(['testdata1', 'testdata2', 'testdata3']);
});

module.exports = router;