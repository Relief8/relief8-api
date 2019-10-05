var db = require('../../util/db');
var config = require('../../config');
var unix = require('../../util/unix');
var input = require('../../util/input');

// POST /cache
module.exports = function* () {
    // Get location
    var lat = this.request.body.latitude;
    var lng = this.request.body.longitude;

    // Latitude validation
    if (!input.isPopulatedNumber(lat)) {
        throw { status: 400, message: 'The latitude is missing.' };
    }

    // Longitude validation
    if (!input.isPopulatedNumber(lng)) {
        throw { status: 400, message: 'The longitude is missing.' };
    }

    // X meter radius
    var radius = metersToRadian(config.cache.radiusMiles * 1609.34);

    // Within the last 48 hours
    var cutoffPeriod = unix.getCurrentTimestamp() - (60 * 60 * 48);

    // Find survivors within radius of user location and within cutoff time
    var survivors = yield db.survivors.find({ location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }, locationDate: { $gt: cutoffPeriod } }, { sort: { _id: -1 } });

    // Got any?
    if (survivors.length === 0) {
        throw { status: 400, message: 'No survivors were found in a radius of ' + config.cache.radiusMiles + ' miles from you.' };
    }

    // Return all survivor information
    this.body = survivors;
};

function metersToRadian(meters) {
    // Radius in meters
    var earthRadiusInKilometers = 6371000;

    // Easy enough
    return meters / earthRadiusInKilometers;
}