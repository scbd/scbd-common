import { test, expect } from 'vitest';
import 'axios';
import 'lodash';
import * as Vue from 'vue';

let sitePrefixUrl = 'https://api.cbd.int';

if(/\.cbd\.int$/i   .test(window?.location?.hostname || '')) sitePrefixUrl= 'https://api.cbd.int';
if(/\.cbddev\.xyz$/i.test(window?.location?.hostname || '')) sitePrefixUrl= 'https://api.cbddev.xyz';
if(/\localhost$/i   .test(window?.location?.hostname || '')) sitePrefixUrl= '/';

({ 
   prefixUrl:  sitePrefixUrl, 
   timeout  : 30 * 1000,
   token: Vue?.prototype?.$auth?.strategy?.token?.get()  
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

test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});

test('isObjectId Test:', () => {
   expect.soft(isObjectId(1)).toBe(false);
   expect.soft(isObjectId("aaaabbbbccccdddd00001111")).toBe(true);
});

test('mapObjectId Test:', () => {
    expect.soft(mapObjectId("aaaabbbbccccdddd00001111")).toEqual({$oid: "aaaabbbbccccdddd00001111" });
});

test('Params -> URL Param',() => {
  expect.soft(stringifyUrlParam("I am a string")).toEqual("I am a string");
  expect.soft(stringifyUrlParam(1)).toBe(1);
  expect.soft(stringifyUrlParam(new Date("2024-09-13T05:00:00.000+05:00"))).toBe("2024-09-13T00:00:00.000Z");
  expect.soft(stringifyUrlParam({name: "John", age: 30, city: "New York"})).toEqual('{"name":"John","age":30,"city":"New York"}');
}); 


test('Param list -> URL Params',() => {
  expect.soft(stringifyUrlParams({q:1, f:2, s:1, sk:0, l:0 , c:0, fo:1, ag:1})).toEqual({"q":1,"f":2,"s":1,"sk":0,"l":0,"c":0,"fo":1,"ag":1 });
  expect.soft(stringifyUrlParams({q:{firstName:"john",lastName:"smith"}, f:2, s:1, sk:0, l:0 , c:0, fo:1, ag:1})).toEqual({"q":'{"firstName":"john","lastName":"smith"}',"f":2,"s":1,"sk":0,"l":0,"c":0,"fo":1,"ag":1 });
});
//# sourceMappingURL=api-base.test.js.map
