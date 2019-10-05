var logger = require('../../util/logger');

module.exports = function () {
    return function* (next) {
        try {
            // Attempt to execute downstream generators
            yield next;
        } catch (err) {
            // Purposely-thrown exception?
            if (err.status && err.message) {
                // Set HTTP status code & JSON body
                this.status = err.status;
                this.body = { error: err.message };

                // Error code provided?
                if (err.code) {
                    this.body.code = err.code;
                }
            }
            else {
                // Unhandled exception - send generic error
                this.status = 500;
                this.body = { error: 'An unexpected error occurred, please contact us.' };

                // Notify developer of unhandled exception
                logger.fatalError('Unhandled Exception', { error: err, stack: err.stack, request: this.request, body: this.request.body });
            }
        }
    };
};