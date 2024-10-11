(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('luxon')) : typeof define === 'function' && define.amd ? define(['exports', 'luxon'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ScbdCommonServicesFilters = {}, global.luxon));
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
  var datetime = /*#__PURE__*/Object.freeze({
    __proto__: null,
    timezone: timezone,
    format: format,
    asDateTime: asDateTime
  });
  function lstring(ltext, locale) {
    if (Number.isInteger(ltext))
      //is number to handle generic implementation of NR
      return ltext;
    if (!ltext) return "";
    if (typeof ltext == 'string') return ltext;
    let sText = "";
    if (!sText && locale) sText = ltext[locale];
    if (!sText) sText = ltext.en;
    if (!sText) {
      var normalized = normalizeText(ltext);
      if (normalized[locale]) return normalized[locale];
      for (var key in ltext) {
        sText = ltext[key];
        if (sText) break;
      }
    }
    return sText || "";
  }
  function normalizeText(text) {
    if (!text) return null;
    var entry = {
      ar: text.ar,
      en: text.en,
      es: text.es,
      fr: text.fr,
      ru: text.ru,
      zh: text.zh
    };
    if (!entry.en) entry.en = entry.fr;
    if (!entry.en) entry.en = entry.es;
    if (!entry.en) entry.en = entry.ru;
    if (!entry.en) entry.en = entry.ar;
    if (!entry.en) entry.en = entry.zh;
    if (!entry.fr) entry.fr = entry.en;
    if (!entry.es) entry.es = entry.en;
    if (!entry.ru) entry.ru = entry.en;
    if (!entry.ar) entry.ar = entry.en;
    if (!entry.zh) entry.zh = entry.en;
    return entry;
  }
  var lstring$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    lstring: lstring
  });
  exports.datetime = datetime;
  exports.lstring = lstring$1;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
//# sourceMappingURL=index.umd.js.map
