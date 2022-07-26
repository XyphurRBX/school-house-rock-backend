const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const authenticateRouter = require('./routes/authenticate');
const logoutRouter = require('./routes/logout');
const signupRouter = require('./routes/signup');
const apiRouter = require('./routes/api');

const app = express();

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const MILLISECONDS_IN_DAY = MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR * HOURS_IN_DAY;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors({
	origin: [
		'http://localhost:5173', // vite dev
		'http://localhost:4173', // vite preview (static site)
		'https://school-house-rock-frontend-b3up8.ondigitalocean.app' // production
	],
	credentials: true,
	exposedHeaders: ['set-cookie'],
}));
app.use(logger('dev'));
app.use(cookieParser());

const sessionData = {
	secret: process.env.SESSION_SECRET || 'test_secret',
	resave: true,
	saveUninitialized: true,
	cookie: {
		maxAge: MILLISECONDS_IN_DAY,
	},
}
if (app.get('env') === 'production') {
	app.set('trust proxy', 1);
	sessionData.cookie.secure = true;
	sessionData.cookie.sameSite = "none";
}
app.use(session(sessionData));

app.use('/authenticate', authenticateRouter);
app.use('/logout', logoutRouter);
app.use('/signup', signupRouter);
app.use('/api', apiRouter);

module.exports = app;