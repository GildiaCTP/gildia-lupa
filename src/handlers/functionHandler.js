const client = require("../client.js");
const config = require('../config.js');

function getActualDate() {
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    return '' + (day <= 9 ? '0' + day : day) + '.' + (month <= 9 ? '0' + month : month) + '.' + year;
};

function getActualTime() {
    var date = new Date();

    var minute = date.getMinutes();
    var hour = date.getHours();

    return '' + (hour <= 9 ? '0' + hour : hour) + ':' + (minute <= 9 ? '0' + minute : minute);
};

module.exports = { getActualDate, getActualTime };