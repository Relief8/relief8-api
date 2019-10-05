var config = require('../../config');
var input = require('../../util/input');

// POST /register
module.exports = function* () {
    // Get input
    var firstName = this.request.body.firstName;

    // Input validation
    if (!input.isPopulatedString(firstName)) {
        throw { status: 400, message: 'The first name is missing.' };
    }

    // Send back success
    this.body = { success: true };
};
