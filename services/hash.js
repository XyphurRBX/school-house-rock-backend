const crypto = require('crypto');

const HASH_SECRET = process.env.HASH_SECRET || 'test_secret';

module.exports = function(string) {
	const sha256Hasher = crypto.createHmac('sha256', HASH_SECRET);
	return sha256Hasher.update(string).digest("base64");
}