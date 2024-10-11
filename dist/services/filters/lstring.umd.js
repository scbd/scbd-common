(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ScbdCommonServicesFiltersLstring = {}));
})(this, function (exports) {
  'use strict';

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
  exports.lstring = lstring;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
//# sourceMappingURL=lstring.umd.js.map
