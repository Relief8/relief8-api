var config = require('../../../config');
var db = require('../../../util/db');
var input = require('../../../util/input');

// POST /register/survivor
module.exports = function* () {
    // Get input
    var firstName = this.request.body.firstName;

    // Input validation
    if (!input.isPopulatedString(firstName)) {
        throw { status: 400, message: 'The first name is missing.' };
    }

    // User obj
    var survivor = {
        firstName: firstName
    };

    // Insert it
    yield db.survivors.insert(survivor);

    // Send back success
    this.body = { success: true };
};
