var db = require('../../util/db');
var input = require('../../util/input');
var unix = require('../../util/unix');

// POST /checkin
module.exports = function* () {
    // Get user ID
    var id = this.request.body.id;

    // Update latitude & longitude
    var lat = this.request.body.latitude;
    var lng = this.request.body.longitude;

    // ID validation
    if (!input.isPopulatedDocumentId(id)) {
        throw { status: 400, message: 'The user ID is missing.' };
    }

    // Latitude validation
    if (!input.isPopulatedNumber(lat)) {
        throw { status: 400, message: 'The latitude is missing.' };
    }

    // Longitude validation
    if (!input.isPopulatedNumber(lng)) {
        throw { status: 400, message: 'The longitude is missing.' };
    }

    // Find survivor with this ID
    var survivors = yield db.survivors.find({ _id: db.monk.id(id) }, { sort: { _id: -1 } });

    // Got any?
    if (survivors.length === 0) {
        throw { status: 400, message: 'No survivors were found with this ID.' };
    }

    // Prepare location
    var location = {
        type: 'Point',
        coordinates: [lng, lat]
    };

    // Update survivor locaton
    yield db.survivors.update({ _id: db.monk.id(id) }, { $set: { location: location, locationDate: unix.getCurrentTimestamp() } });

    // Return success
    this.body = {success: true};
};
