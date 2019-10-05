var maps = require('@google/maps');

exports.getGoogleMapsClient = function () {
    // Easy enough
    return maps.createClient({
        key: process.env.GOOGLE_API_KEY,
        Promise: Promise
    });
}