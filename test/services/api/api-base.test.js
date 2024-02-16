import { expect, test } from 'vitest'
import { mapObjectId, isObjectId, sanitizeUrlParam, stringifyUrlParams, isValid } from '../../../src/services/api/api-base'

test('isObjectId Test:', () => {
   expect.soft(isObjectId(1)).toBe(false);
   expect.soft(isObjectId("aaaabbbbccccdddd00001111")).toBe(true);
})

test('mapObjectId Test:', () => {  
     expect.soft(mapObjectId("aaaabbbbccccdddd00001111")).toEqual({"$oid": "aaaabbbbccccdddd00001111" });   
})

test('Params -> URL Param string',() => {
  expect.soft(sanitizeUrlParam("I am a string")).toEqual("I am a string");
  expect.soft(sanitizeUrlParam(1)).toBe(1);
  expect.soft(sanitizeUrlParam(new Date("2024-09-13T05:00:00.000+05:00"))).toBe("2024-09-13T00:00:00.000Z");
  expect.soft(sanitizeUrlParam({code:"AD"})).toEqual('{"code":"AD"}')
  expect.soft(sanitizeUrlParam({name: "John", age: 30, city: "New York"})).toEqual('{"name":"John","age":30,"city":"New York"}');
}) 


test('Param list -> URL Params string',() => {
 expect.soft(stringifyUrlParams({q:{code:"ad"} , s:1, sk:0, l:0 , c:0, fo:1, ag:1})).toEqual({q:'{"code":"ad"}',s:1,sk:0,l:0,c:0,fo:1,ag:1 });

}) 


test('isValid Test:', () => {
  expect.soft(isValid()).toBe(false);
  expect.soft(isValid("a string")).toBe(true);
  expect.soft(isValid(1)).toBe(true); 
})