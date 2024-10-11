'use strict';

var vitest = require('vitest');
require('axios');
require('lodash');
var Vue = require('vue');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var Vue__namespace = /*#__PURE__*/_interopNamespace(Vue);

let sitePrefixUrl = 'https://api.cbd.int';

if(/\.cbd\.int$/i   .test(window?.location?.hostname || '')) sitePrefixUrl= 'https://api.cbd.int';
if(/\.cbddev\.xyz$/i.test(window?.location?.hostname || '')) sitePrefixUrl= 'https://api.cbddev.xyz';
if(/\localhost$/i   .test(window?.location?.hostname || '')) sitePrefixUrl= '/';

({ 
   prefixUrl:  sitePrefixUrl, 
   timeout  : 30 * 1000,
   token: Vue__namespace?.prototype?.$auth?.strategy?.token?.get()  
});

function stringifyUrlParam(value) {
  if (value instanceof(Date))   {return value.toISOString()}    
  if (value instanceof(Object)) {return JSON.stringify(value)}  
  return value; 
}

function stringifyUrlParams(valueObj) {
  const returnObj = {};

  for (const [key, value] of Object.entries(valueObj)) {
    if (isValid(value)){
      returnObj[key] = stringifyUrlParam(value);
    }
  }
  
  return returnObj;
}

function mapObjectId(id){  
  return isObjectId(id)? { $oid: id } : id
}

function isObjectId(id){
  return /^[a-f0-9]{24}/i.test(id);
}

function isValid(params){
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
    vitest.expect.soft(mapObjectId("aaaabbbbccccdddd00001111")).toEqual({$oid: "aaaabbbbccccdddd00001111" });
});

vitest.test('Params -> URL Param',() => {
  vitest.expect.soft(stringifyUrlParam("I am a string")).toEqual("I am a string");
  vitest.expect.soft(stringifyUrlParam(1)).toBe(1);
  vitest.expect.soft(stringifyUrlParam(new Date("2024-09-13T05:00:00.000+05:00"))).toBe("2024-09-13T00:00:00.000Z");
  vitest.expect.soft(stringifyUrlParam({name: "John", age: 30, city: "New York"})).toEqual('{"name":"John","age":30,"city":"New York"}');
}); 


vitest.test('Param list -> URL Params',() => {
  vitest.expect.soft(stringifyUrlParams({q:1, f:2, s:1, sk:0, l:0 , c:0, fo:1, ag:1})).toEqual({"q":1,"f":2,"s":1,"sk":0,"l":0,"c":0,"fo":1,"ag":1 });
  vitest.expect.soft(stringifyUrlParams({q:{firstName:"john",lastName:"smith"}, f:2, s:1, sk:0, l:0 , c:0, fo:1, ag:1})).toEqual({"q":'{"firstName":"john","lastName":"smith"}',"f":2,"s":1,"sk":0,"l":0,"c":0,"fo":1,"ag":1 });
});
//# sourceMappingURL=api-base.test.cjs.map
