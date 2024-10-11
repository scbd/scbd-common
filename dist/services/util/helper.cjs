'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _ = require('lodash');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ___default = /*#__PURE__*/_interopDefaultLegacy(_);

const makeSmallUid = () => {
    const key = (S4() + S4()).toUpperCase();
    return 'uid-' + key;
};

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

const removeEmpty = (obj)=> {
    return function remove(current) {
      ___default["default"].forOwn(current, function (value, key) {
        if (___default["default"].isUndefined(value) || ___default["default"].isNull(value) || ___default["default"].isNaN(value) ||
          (___default["default"].isString(value) && ___default["default"].isEmpty(value)) ||
          (___default["default"].isObject(value) && ___default["default"].isEmpty(remove(value)))) {
  
          delete current[key];
        }
      });

      if (___default["default"].isArray(current)) ___default["default"].pull(current, undefined);
  
      return current;
  
    }(___default["default"].cloneDeep(obj));
};

exports.S4 = S4;
exports.makeSmallUid = makeSmallUid;
exports.removeEmpty = removeEmpty;
//# sourceMappingURL=helper.cjs.map
