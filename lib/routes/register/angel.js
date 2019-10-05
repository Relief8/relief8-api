var config = require('../../../config');
var db = require('../../../util/db');
var input = require('../../../util/input');

// POST /register/angel
module.exports = function* () {
    // Get input
    var firstName = this.request.body.firstName;

    // Input validation
    if (!input.isPopulatedString(firstName)) {
        throw { status: 400, message: 'The first name is missing.' };
    }

    // User obj
    var angel = {
        firstName: firstName
    };

    // Insert it
    yield db.angels.insert(angel);

    // Send back success
    this.body = { success: true };
};
