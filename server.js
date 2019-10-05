var api = require('./lib/api');

// Log system date & time along with version
console.log('[System]', 'Initializing on ' + new Date().toUTCString());

// Initialize API
api.initialize();