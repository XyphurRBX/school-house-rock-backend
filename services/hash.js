const crypto = require('crypto');

const HASH_SECRET = process.env.HASH_SECRET || 'test_secret';

const sha256Hasher = crypto.createHmac('sha256', HASH_SECRET);

module.exports = function(string) {
	return sha256Hasher.update(string).digest("base64");
}