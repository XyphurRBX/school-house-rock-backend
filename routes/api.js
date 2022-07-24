const express = require('express');
const router = express.Router();

// authenticate all requests to /api/*
const auth = require('../services/authMiddleware');
router.use('/', auth);

// put db routes here
const employeeRoute = require('./apiRoutes/employee');
router.use('/employee', employeeRoute); // route to /api/employee

module.exports = router;