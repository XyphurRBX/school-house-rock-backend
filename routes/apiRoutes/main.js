const express = require('express');
const router = express.Router();

const db = require("../../services/db");

router.post('/table', async function(req, res) {
	return res.send(await db.getTable(req.body.tableName, req.body.limit, req.body.offset,
		req.body.orderBy, req.body.ascending));
});

router.post('/entrycount', async function(req, res) {
	return res.send(await db.getEntryCount(req.body.tableName));
});

router.delete('/row', async function(req, res) {
	return res.send(await db.deleteRow(req.body.tableName, req.body.rowIdentifiers));
});

router.post('/row', async function(req, res) {
	return res.send(await db.createRow(req.body.tableName, req.body.values));
});

router.patch('/row', async function(req, res) {
	return res.send(await db.modifyRow(req.body.tableName, req.body.rowIdentifiers, req.body.values));
});

router.post('/tableWithFilter', async function(req, res) {
	return res.send(await db.getRows(req.body.tableName, req.body.rowIdentifiers));
});

module.exports = router;