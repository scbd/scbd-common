import { expect, test } from 'vitest'
import ThesaurusAPI from './thesaurus'


const myAPI = new ThesaurusAPI({});

test('get all domains', () => {  
    return myAPI.getDomains().then(data => {
      expect.soft(data).toEqual( // 1 
          expect.arrayContaining([ // 2 
            expect.objectContaining({ // 3 
              "domainId": expect.any(Number), // 4 
              "identifier": expect.any(String),
              "name": expect.any(String)
            }) 
          ]) 
      )     
    })
  });

test('get domain of countries', () => {  
  return myAPI.getDomain("countries").then(data=> {
      expect.objectContaining({
          "domainId": expect.any(Number),
          "identifier": expect.any(String),
          "name": expect.any(String)
        });     
  });
});


test('getdomain fuction: throw error on wrong params ', async () => {
  await expect(() => myAPI.getDomain()).rejects.toThrowError(/value/)
})


  








