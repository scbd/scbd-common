(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash'), require('@/services/composables/i18n'), require('@/services/filters/lstring')) : typeof define === 'function' && define.amd ? define(['exports', 'lodash', '@/services/composables/i18n', '@/services/filters/lstring'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ScbdCommonServicesUtilArrays = {}, global._, global.i18n, global.lstring));
})(this, function (exports, _, i18n, lstring) {
  'use strict';

  function _interopDefaultLegacy(e) {
    return e && typeof e === 'object' && 'default' in e ? e : {
      'default': e
    };
  }
  var ___default = /*#__PURE__*/_interopDefaultLegacy(_);
  function asArray(data) {
    return ___default["default"]([data]).flatten().compact().value();
  }
  function sortBy(list, property) {
    //const { locale } = useNuxtApp().$i18n;
    const {
      t,
      locale
    } = i18n.useI18n();
    return list.sort((a, b) => {
      let valueA = a[property];
      let valueB = b[property];
      if (isLString(valueA)) {
        valueA = lstring.lstring(valueA, locale.value);
        valueB = lstring.lstring(valueB, locale.value);
      }
      return valueA.localeCompare(valueB);
    });
  }
  exports.asArray = asArray;
  exports.sortBy = sortBy;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
//# sourceMappingURL=arrays.umd.js.map
