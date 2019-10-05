var config = require('../../config');
var input = require('../../util/input');

// POST /
module.exports = function* () {
    this.body = { healthy: true };
};
