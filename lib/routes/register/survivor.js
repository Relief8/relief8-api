var util = require('util');
var db = require('../../../util/db');
var input = require('../../../util/input');
var maps = require('../../../util/maps');
var unix = require('../../../util/unix');

// POST /register/survivor
module.exports = function* () {
    // Get input
    var firstName = this.request.body.firstName;
    var lastName = this.request.body.lastName;
    var dateOfBirth = this.request.body.dateOfBirth;
    var email = this.request.body.email;
    var gender = this.request.body.gender;
    var address = this.request.body.address;
    var familyMembers = this.request.body.familyMembers;
    var medicalNeeds = this.request.body.medicalNeeds;
    var familyNeeds = this.request.body.familyNeeds;
    var bloodType = this.request.body.bloodType;
    var phoneNumber = this.request.body.phoneNumber;
    var immediateKin = this.request.body.immediateKin;
    var emergencyContact = this.request.body.emergencyContact;

    // Input validation
    if (!input.isPopulatedString(firstName)) {
        throw { status: 400, message: 'The first name is missing.' };
    }
    if (!input.isPopulatedString(lastName)) {
        throw { status: 400, message: 'The last name is missing.' };
    }
    if (!input.isPopulatedObject(dateOfBirth)){
        throw { status: 400, message: 'The date of birth is missing'};
    }
    if (!input.isPopulatedString(address)) {
        throw { status: 400, message: 'The address is missing.' };
    }
    if (!input.isPopulatedString(phoneNumber)) {
        throw { status: 400, message: 'The phone number is missing.' };
    }
    if ((phoneNumber.replace(/\D+/g,'')).length<10){
        throw { status: 400, message: 'The phone number is too short.' };
    }
    if ((phoneNumber.replace(/\D+/g,'')).length>10){
        throw { status: 400, message: 'The phone number is too long.' };
    }

    // User obj
    var survivor = {
        _id: db.monk.id(),
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        email: email,
        gender: gender,
        address: address,
        familyMembers: familyMembers,
        medicalNeeds: medicalNeeds,
        familyNeeds: familyNeeds,
        bloodType: bloodType,
        phoneNumber: phoneNumber,
        immediateKin: immediateKin,
        emergencyContact: emergencyContact
    };

    try {
        // Geocode using Google Maps
        var response = yield maps.getGoogleMapsClient().geocode({ address: survivor.address }).asPromise();

        // Got at least one?
        if (response.json.results.length > 0) {
            // Get first geolocation
            var location = response.json.results[0].geometry.location;

            // Save location
            survivor.location = {
                type: 'Point',
                coordinates: [location.lng, location.lat]
            };

            survivor.locationDate = unix.getCurrentTimestamp();
        }
    }
    catch (err) {
        // Geocoding failed
        throw { status: 400, message: 'Geocoding failed: ' + util.inspect(err) };
    }

    // Insert it
    yield db.survivors.insert(survivor);

    // Send back success
    this.body = { id: survivor._id.toString() };
};
