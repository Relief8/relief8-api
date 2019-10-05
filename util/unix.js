exports.getCurrentTimestamp = function () {
    // Return current unix timestamp in seconds
    return Math.round(new Date().getTime() / 1000);
};

exports.getStartOfMonthTimestamp = function () {
    // Get current date and time
    var now = new Date();

    // Return start of month timestamp at 00:00:00
    return Math.round(new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0) / 1000);
};

exports.getStartOfPreviousMonthTimestamp = function () {
    // Get current date and time
    var now = new Date();

    // Return start of previous month timestamp at 00:00:00
    return Math.round(new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0) / 1000);
};

exports.getStartOfYesterdayTimestamp = function () {
    // Prepare a JS date
    var date = new Date();

    // Drop the time
    date.setUTCHours(0, 0, 0, 0);

    // Subtract a day
    date.setUTCDate(date.getUTCDate() - 1);

    // Back to unix
    return Math.round(date.getTime() / 1000);
};

exports.getStartOfTodayTimestamp = function () {
    // Prepare a JS date
    var date = new Date();

    // Drop the time
    date.setUTCHours(0, 0, 0, 0);

    // Back to unix
    return Math.round(date.getTime() / 1000);
};

exports.getStartOfMinuteTimestamp = function () {
    // Prepare a JS date
    var date = new Date();

    // Drop the seconds
    date.setSeconds(0);
    date.setMilliseconds(0);

    // Back to unix
    return Math.round(date.getTime() / 1000);
}

exports.getStartOfHourTimestamp = function () {
    // Prepare a JS date
    var date = new Date();

    // Drop the minutes and seconds
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    // Back to unix
    return Math.round(date.getTime() / 1000);
}