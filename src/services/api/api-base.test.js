/**
 * @vitest-environment jsdom
 */

test('use jsdom in this test file', () => {
  const element = document.createElement('div')
  expect(element).not.toBeNull()
})

import { expect, test } from 'vitest'
import { mapObjectId, isObjectId, toUrlParam, toUrlParams } from './api-base'

test('isObjectId Test:', () => {
   expect(isObjectId(1)).toBe(false);
})

test('mapObjectId Test:', () => {
    expect(mapObjectId("aaaabbbbccccdddd00001111")).toEqual({$oid: "aaaabbbbccccdddd00001111" });
})

test('Params -> URL Param',() => {
  expect(toUrlParam("I am a string")).toEqual("I am a string");
  expect(toUrlParam(1)).toBe(1);
  expect(toUrlParam(new Date("2024-09-13T05:00:00.000+05:00"))).toBe("2024-09-13T00:00:00.000Z");
  expect(toUrlParam({name: "John", age: 30, city: "New York"})).toEqual('{"name":"John","age":30,"city":"New York"}');
}) 


test('Param list -> URL Params',() => {
  expect(toUrlParams({q:1, f:2, s:1, sk:0, l:0 , c:0, fo:1, ag:1})).toEqual({"q":1,"f":2,"s":1,"sk":0,"l":0,"c":0,"fo":1,"ag":1 });
  expect(toUrlParams({q:{firstName:"john",lastName:"smith"}, f:2, s:1, sk:0, l:0 , c:0, fo:1, ag:1})).toEqual({"q":'{"firstName":"john","lastName":"smith"}',"f":2,"s":1,"sk":0,"l":0,"c":0,"fo":1,"ag":1 });
}) 



 




