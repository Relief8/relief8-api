var crypto = require('crypto');

// Hash up the salt and password for login functions
exports.getPasswordHash = function (salt, password) {
    // Generate SHA-256 hash
    return crypto.createHash('sha256').update(salt + password).digest('hex');
};

// Generate a random alphanumeric hash in the specified length
exports.getRandomAlphanumericHash = function (length) {
    // Generate random alphanumeric hash
    return crypto.randomBytes(length).toString('hex');
};