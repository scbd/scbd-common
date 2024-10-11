'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var luxon = require('luxon');

function timezone(dateTime, tz=null) {
    dateTime = dateTime && asDateTime(dateTime);

    if(dateTime) dateTime = dateTime.setZone(tz||'local');

    return dateTime;
}

//https://moment.github.io/luxon/docs/manual/formatting#table-of-tokens

function format(dateTime, format='T') {
    return dateTime && asDateTime(dateTime).toFormat(format)
}

function asDateTime(date) {
    if(date instanceof luxon.DateTime)  return date
    if(date instanceof Date)      return luxon.DateTime.fromJSDate(date)
    if(typeof(date) === 'string') return luxon.DateTime.fromISO(date)

    throw Error('Unknown date/time format');
}

exports.asDateTime = asDateTime;
exports.format = format;
exports.timezone = timezone;
//# sourceMappingURL=datetime.cjs.map
