var util = require('util');
var db = require('../../util/db');
var config = require('../../config');
var unix = require('../../util/unix');
var input = require('../../util/input');
var maps = require('../../util/maps');

// POST /map
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
    var radius = metersToRadian(milesToMeters(config.cache.radiusMiles));

    // Within the last 48 hours
    var cutoffPeriod = unix.getCurrentTimestamp() - (60 * 60 * 48);

    // Find survivors within radius of user location and within cutoff time
    var survivors = yield db.survivors.find({ location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }, locationDate: { $gt: cutoffPeriod } }, { sort: { _id: -1 } });

    // Got any?
    if (survivors.length === 0) {
        throw { status: 400, message: 'No survivors were found in a radius of ' + config.cache.radiusMiles + ' miles from you.' };
    }

    // Return all survivor information
    this.body = {
        survivors: survivors,
        bloodBanks: yield getNearbyPlaces({lat: lat, lng: lng}, { keyword: 'blood donation center'} ),
        shelters: yield getNearbyPlaces({lat: lat, lng: lng}, { keyword: 'shelter'} ),
        gasStations: yield getNearbyPlaces({lat: lat, lng: lng}, { type: 'gas_station'} ),
        pharmacies: yield getNearbyPlaces({lat: lat, lng: lng}, { type: 'pharmacy'} ),
        hospitals: yield getNearbyPlaces({lat: lat, lng: lng}, { type: 'hospital'} ),
    };
};

function* getNearbyPlaces(location, options) {
    // Radius & location
    options.location = location;
    options.radius = milesToMeters(config.cache.radiusMiles);

    // Places
    var places = [];

    try {
        // Geocode using Google Maps
        var response = yield maps.getGoogleMapsClient().placesNearby(options).asPromise();

        // Got at least one?
        for (var result of response.json.results ) {
            // Save location
            places.push({
                icon: result.icon,
                name: result.name, 
                opening_hours: result.opening_hours,
                rating: result.rating,
                vicinity: result.vicinity,
                location: result.geometry.location
            });
        }
    }
    catch (err) {
        // Geocoding failed
        throw { status: 400, message: 'Geocoding failed: ' + util.inspect(err) };
    }

    // Return all places
    return places;
}

function metersToRadian(meters) {
    // Radius in meters
    var earthRadiusInKilometers = 6371000;

    // Easy enough
    return meters / earthRadiusInKilometers;
}

function milesToMeters(miles) {
    return miles * 1609.34;
}