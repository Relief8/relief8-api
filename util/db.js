var monk = require('monk');
var config = require('../config');
var monkster = require('monkster');

// Initialize monk with MongoDB connection string
var db = monk(process.env.DB);

// Initialize Monkster 
var wrap = monkster(config.db.monksterOptions);

// Load object models
exports.accounts = wrap(db.get('accounts'));
exports.checkins = wrap(db.get('checkins'));