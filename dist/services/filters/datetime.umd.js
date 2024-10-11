(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('luxon')) : typeof define === 'function' && define.amd ? define(['exports', 'luxon'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ScbdCommonServicesFiltersDatetime = {}, global.luxon));
})(this, function (exports, luxon) {
  'use strict';

  function timezone(dateTime) {
    let tz = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    dateTime = dateTime && asDateTime(dateTime);
    if (dateTime) dateTime = dateTime.setZone(tz || 'local');
    return dateTime;
  }

  //https://moment.github.io/luxon/docs/manual/formatting#table-of-tokens

  function format(dateTime) {
    let format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'T';
    return dateTime && asDateTime(dateTime).toFormat(format);
  }
  function asDateTime(date) {
    if (date instanceof luxon.DateTime) return date;
    if (date instanceof Date) return luxon.DateTime.fromJSDate(date);
    if (typeof date === 'string') return luxon.DateTime.fromISO(date);
    throw Error('Unknown date/time format');
  }
  exports.asDateTime = asDateTime;
  exports.format = format;
  exports.timezone = timezone;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
//# sourceMappingURL=datetime.umd.js.map
