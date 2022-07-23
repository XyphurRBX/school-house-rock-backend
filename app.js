const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const logger = require('morgan');

const authenticateRouter = require('./routes/authenticate')
const logoutRouter = require('./routes/logout')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: process.env.SESSION_SECRET || 'test_secret',
	resave: true,
	saveUninitialized: true, 
}));

app.use('/authenticate', authenticateRouter);
app.use('/logout', logoutRouter);

module.exports = app;