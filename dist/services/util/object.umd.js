(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ScbdCommonServicesUtilObject = {}));
})(this, function (exports) {
  'use strict';

  const isPlainObject = o => {
    var _o$constructor;
    return Object.prototype.toString.call(o) === '[object Object]' && (o === null || o === void 0 || (_o$constructor = o.constructor) === null || _o$constructor === void 0 ? void 0 : _o$constructor.name) === 'Object';
  };
  const isEmpty = o => {
    if (!o) return true;
    if (Array.isArray(o)) return !o.length;
    if (isPlainObject(o)) return !Object.keys(o).length;
    return false;
  };
  const deleteFalsyKey = obj => {
    if (Array.isArray(obj)) for (let index = 0; index < obj.length; index++) {
      if (isPlainObject(obj[index]) || Array.isArray(obj[index])) {
        if (isEmpty(obj)) obj.splice(index);else obj[index] = deleteFalsyKey(obj[index]);
      } else if (typeof obj[index] === 'undefined' || obj[index] === null || obj[index] === '') obj.splice(index);
    } else if (obj && isPlainObject(obj)) for (const key of Object.keys(obj)) if ((Array.isArray(obj[key]) || isPlainObject(obj[key])) && !isEmpty(obj)) deleteFalsyKey(obj[key]);else if (typeof obj[key] === 'undefined' || obj[key] === null || obj[key] === '') delete obj[key];
    return obj;
  };
  const unique = array => {
    return Array.from(new Set(array.map(el => {
      if (isPlainObject(el)) return JSON.stringify(el);else return el;
    }))).map(JSON.parse);
  };
  exports.deleteFalsyKey = deleteFalsyKey;
  exports.isEmpty = isEmpty;
  exports.isPlainObject = isPlainObject;
  exports.unique = unique;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
//# sourceMappingURL=object.umd.js.map
