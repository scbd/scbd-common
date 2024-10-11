(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('vitest'), require('axios'), require('lodash'), require('vue')) : typeof define === 'function' && define.amd ? define(['vitest', 'axios', 'lodash', 'vue'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.vitest, null, null, global.Vue));
})(this, function (vitest, axios, lodash, Vue) {
  'use strict';

  var _window, _window2, _window3, _Vue__namespace$proto;
  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () {
              return e[k];
            }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }
  var Vue__namespace = /*#__PURE__*/_interopNamespace(Vue);
  let sitePrefixUrl = 'https://api.cbd.int';
  if (/\.cbd\.int$/i.test(((_window = window) === null || _window === void 0 || (_window = _window.location) === null || _window === void 0 ? void 0 : _window.hostname) || '')) sitePrefixUrl = 'https://api.cbd.int';
  if (/\.cbddev\.xyz$/i.test(((_window2 = window) === null || _window2 === void 0 || (_window2 = _window2.location) === null || _window2 === void 0 ? void 0 : _window2.hostname) || '')) sitePrefixUrl = 'https://api.cbddev.xyz';
  if (/\localhost$/i.test(((_window3 = window) === null || _window3 === void 0 || (_window3 = _window3.location) === null || _window3 === void 0 ? void 0 : _window3.hostname) || '')) sitePrefixUrl = '/';
  ({
    prefixUrl: sitePrefixUrl,
    timeout: 30 * 1000,
    token: Vue__namespace === null || Vue__namespace === void 0 || (_Vue__namespace$proto = Vue__namespace.prototype) === null || _Vue__namespace$proto === void 0 || (_Vue__namespace$proto = _Vue__namespace$proto.$auth) === null || _Vue__namespace$proto === void 0 || (_Vue__namespace$proto = _Vue__namespace$proto.strategy) === null || _Vue__namespace$proto === void 0 || (_Vue__namespace$proto = _Vue__namespace$proto.token) === null || _Vue__namespace$proto === void 0 ? void 0 : _Vue__namespace$proto.get()
  });
  function stringifyUrlParam(value) {
    if (value instanceof Date) {
      return value.toISOString();
    }
    if (value instanceof Object) {
      return JSON.stringify(value);
    }
    return value;
  }
  function stringifyUrlParams(valueObj) {
    const returnObj = {};
    for (const [key, value] of Object.entries(valueObj)) {
      if (isValid(value)) {
        returnObj[key] = stringifyUrlParam(value);
      }
    }
    return returnObj;
  }
  function mapObjectId(id) {
    return isObjectId(id) ? {
      $oid: id
    } : id;
  }
  function isObjectId(id) {
    return /^[a-f0-9]{24}/i.test(id);
  }
  function isValid(params) {
    return ![undefined, null].includes(params);
  }

  /**
   * @vitest-environment jsdom
   */

  vitest.test('use jsdom in this test file', () => {
    const element = document.createElement('div');
    vitest.expect(element).not.toBeNull();
  });
  vitest.test('isObjectId Test:', () => {
    vitest.expect.soft(isObjectId(1)).toBe(false);
    vitest.expect.soft(isObjectId("aaaabbbbccccdddd00001111")).toBe(true);
  });
  vitest.test('mapObjectId Test:', () => {
    vitest.expect.soft(mapObjectId("aaaabbbbccccdddd00001111")).toEqual({
      $oid: "aaaabbbbccccdddd00001111"
    });
  });
  vitest.test('Params -> URL Param', () => {
    vitest.expect.soft(stringifyUrlParam("I am a string")).toEqual("I am a string");
    vitest.expect.soft(stringifyUrlParam(1)).toBe(1);
    vitest.expect.soft(stringifyUrlParam(new Date("2024-09-13T05:00:00.000+05:00"))).toBe("2024-09-13T00:00:00.000Z");
    vitest.expect.soft(stringifyUrlParam({
      name: "John",
      age: 30,
      city: "New York"
    })).toEqual('{"name":"John","age":30,"city":"New York"}');
  });
  vitest.test('Param list -> URL Params', () => {
    vitest.expect.soft(stringifyUrlParams({
      q: 1,
      f: 2,
      s: 1,
      sk: 0,
      l: 0,
      c: 0,
      fo: 1,
      ag: 1
    })).toEqual({
      "q": 1,
      "f": 2,
      "s": 1,
      "sk": 0,
      "l": 0,
      "c": 0,
      "fo": 1,
      "ag": 1
    });
    vitest.expect.soft(stringifyUrlParams({
      q: {
        firstName: "john",
        lastName: "smith"
      },
      f: 2,
      s: 1,
      sk: 0,
      l: 0,
      c: 0,
      fo: 1,
      ag: 1
    })).toEqual({
      "q": '{"firstName":"john","lastName":"smith"}',
      "f": 2,
      "s": 1,
      "sk": 0,
      "l": 0,
      "c": 0,
      "fo": 1,
      "ag": 1
    });
  });
});
//# sourceMappingURL=api-base.test.umd.js.map
