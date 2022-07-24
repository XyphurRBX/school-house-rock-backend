
module.exports = function(req, res, next) {
	
	if (req.session && req.session.loggedIn) return next();
	
	return res.sendStatus(401);
}