var util = require('util');

// Notifies developer of a fatal error
exports.fatalError = function (subject, err) {
    // Convert to debuggable string
    err = util.inspect(err);

    // Add prefix to subject
    subject = '[API] Fatal Error (' + subject + ')';

    // Add subject to error
    err = subject + '\r\n\r\n' + err;

    // Log it
    console.log(subject, err);
};