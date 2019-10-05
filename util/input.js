var bson = require('bson');

exports.isString = function(string) {
    // Check for non-undefined string variable
    return string !== undefined && typeof string === 'string';
};

exports.isNumber = function(number) {
    // Check for non-undefined number variable
    return number !== undefined && typeof number === 'number';
};

exports.isObject = function(obj) {
    // Check for a valid object
    return obj !== undefined && Object.prototype.toString.call(obj) === '[object Object]';
};

exports.isArray = function(array) {
    // Check for a valid array
    return array !== undefined && Array.isArray(array);
};

exports.isPopulatedString = function(string) {
    // Check for non-undefined string variable with at least 1 character
    return string !== undefined && typeof string === 'string' && string.length > 0;
};

exports.isPopulatedObject = function(obj) {
    // Check for non-undefined object variable with at least 1 element
    return exports.isObject(obj) && Object.keys(obj).length > 0;
};

exports.isPopulatedArray = function(array) {
    // Check for non-undefined array variable with at least 1 item
    return exports.isArray(array) && array.length > 0;
};

exports.isPopulatedStringArray = function(array) {
    // Check for non-undefined array variable with at least 1 item
    if (!exports.isArray(array) || array.length === 0) {
        return false;
    }

    // Validate elements
    for (var item of array) {
        // Verify that it's a valid string
        if (!exports.isPopulatedString(item)) {
            return false;
        }
    }

    // We're in the clear
    return true;
};

exports.isOptionalStringArray = function(array) {
    // Undefined value is fine since this is optional
    if (array === undefined) {
        return true;
    }

    // Not undefined but not an array?
    if (!exports.isArray(array)) {
        return false;
    }

    // Validate elements
    for (var item of array) {
        // Verify that it's a valid string
        if (!exports.isPopulatedString(item)) {
            return false;
        }
    }

    // We're in the clear
    return true;
};

exports.isOptionalObject = function(obj) {
    // Check for optional non-undefined object variable
    return obj === undefined || exports.isObject(obj);
};

exports.isOptionalBoolean = function(boolean) {
    // Check for non-undefined variable of type boolean (optional) 
    return boolean === undefined || typeof boolean === 'boolean';
};

exports.isOptionalString = function(string) {
    // Check for non-undefined variable of type string (optional) 
    return string === undefined || typeof string === 'string';
};

exports.isOptionalNumber = function(number) {
    // Check for non-undefined variable of type number (optional)
    return number === undefined || typeof number === 'number';
};

exports.isPopulatedDocumentId = function (string) {
    // Check for non-undefined variable of type string and validate object ID
    return exports.isString(string) && bson.BSON.ObjectID.isValid(string);
};

exports.isOptionalDocumentId = function (string) {
    // Check for non-undefined variable of type string (optional) and validate object ID
    return string === undefined || (exports.isPopulatedDocumentId(string));
};