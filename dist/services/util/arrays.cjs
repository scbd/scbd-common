'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _ = require('lodash');
var i18n = require('@/services/composables/i18n');
var lstring = require('@/services/filters/lstring');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ___default = /*#__PURE__*/_interopDefaultLegacy(_);

function asArray(data) {
    return ___default["default"]([ data ])
      .flatten()
      .compact()
      .value();
}

function sortBy(list, property){    
  //const { locale } = useNuxtApp().$i18n;
  const {t, locale }    = i18n.useI18n();  
  return list.sort((a ,b )=>{
      let valueA = a[property];
      let valueB = b[property];

      if(isLString(valueA)){
          valueA = lstring.lstring(valueA, locale.value);
          valueB = lstring.lstring(valueB, locale.value);
      }

      return valueA.localeCompare(valueB);

  })
}

exports.asArray = asArray;
exports.sortBy = sortBy;
//# sourceMappingURL=arrays.cjs.map
