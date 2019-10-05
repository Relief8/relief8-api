var monk = require('monk');
var config = require('../config');
var monkster = require('monkster');

// Initialize monk with MongoDB connection string
var db = monk(process.env.DB);

// Initialize Monkster 
var wrap = monkster(config.db.monksterOptions);

// Load object models
exports.angels = wrap(db.get('angels'));
exports.checkins = wrap(db.get('checkins'));
exports.survivors = wrap(db.get('survivors'));

// Indexes
exports.survivors.index({ location: '2dsphere' });