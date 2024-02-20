import { expect, test } from 'vitest'
import { mapObjectId, isObjectId, stringifyUrlParam, stringifyUrlParams, isValid } from '../../../src/services/api/api-base'

test('isObjectId Test:', () => {
   expect.soft(isObjectId(1)).toBe(false);
   expect.soft(isObjectId("aaaabbbbccccdddd00001111")).toBe(true);
})

test('mapObjectId Test:', () => {  
     expect.soft(mapObjectId("aaaabbbbccccdddd00001111")).toEqual({"$oid": "aaaabbbbccccdddd00001111" });   
})

test('Params -> URL Param',() => {
  expect.soft(stringifyUrlParam("I am a string")).toBe("I am a string");
  expect.soft(stringifyUrlParam(1)).toBe(1);
  expect.soft(stringifyUrlParam(new Date("2024-09-13T05:00:00.000+05:00"))).toBe("2024-09-13T00:00:00.000Z");
  expect.soft(stringifyUrlParam({code:"AD"})).toEqual('{"code":"AD"}')
  expect.soft(stringifyUrlParam({name: "John", age: 30, city: "New York"})).toEqual('{"name":"John","age":30,"city":"New York"}');
}) 


test('Param list -> URL Params',() => {
  expect.soft(stringifyUrlParams({q:{code:"ad"} ,f:2, s:1, sk:0, l:0 , c:0, fo:1, ag:1})).toEqual({q:'{"code":"ad"}',f:2,s:1,sk:0,l:0,c:0,fo:1,ag:1 });
 }) 


test('isValid Test:', () => {
  expect.soft(isValid()).toBe(false);
  expect.soft(isValid("a string")).toBe(true);
  expect.soft(isValid(1)).toBe(true); 
})



 




