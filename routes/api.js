const express = require('express');
const router = express.Router();

// authenticate all requests to /api/*
const auth = require('../services/authMiddleware');
router.use('/', auth);

// put db routes here
const mainRoute = require("./apiRoutes/main");
router.use("/main", mainRoute);

module.exports = router;