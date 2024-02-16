import { expect, test } from 'vitest'
import ThesaurusApi from '../../../src/services/api/thesaurus'


const myAPI = new ThesaurusApi({});

test('getDomains func: get all domains', async () => {  
  const data = await myAPI.getDomains();

  expect.soft(data).toEqual( 
    expect.arrayContaining([ 
      expect.objectContaining({ 
        "domainId":   expect.any(Number), 
        "identifier": expect.any(String),
        "name":       expect.any(String)
      }) 
    ]) 
  ) ;    
  
})

test('getDomain func: throw error on wrong params ', async () => {
  await expect(() => myAPI.getDomain()).rejects.toThrowError(/invalid value for identifier/)
})

test('getDomain func: get domans of countries', async () => {  
  const data = await  myAPI.getDomain("countries");

  expect.objectContaining({
      "domainId":   expect.any(Number),
      "identifier": expect.any(String),
      "name":       expect.any(String)
  });    
  
})

test('getDomainTerms func: throw error on wrong params ', async () => {
  await expect(() => myAPI.getDomainTerms()).rejects.toThrowError(/invalid value for identifier/)
})

test('getDomainTerms func: get terms of countries', async () => {  
  const data = await myAPI.getDomainTerms("regions");

  expect.soft(data).toEqual( 
    expect.arrayContaining([ 
      expect.objectContaining({
        "termId":          expect.any(Number),
        "identifier":      expect.any(String),
        "name":            expect.any(String),
        "title":           expect.any(Object),   
        "shortTitle":      expect.any(Object),
        "description":     expect.any(String),
        "longDescription": expect.any(Object),
        "source":          expect.any(String),
        "broaderTerms":    expect.any(Array),
        "narrowerTerms":   expect.any(Array),
        "relatedTerms":    expect.any(Array),
        "nonPreferedTerms":expect.any(Array),
      })   
    ])
  );  
})

test('getDomainTerms func: get terms of countries', async () => {  
  const data = await myAPI.getDomainTerms("regions",{ relations:"domain" });

  expect.soft(data).toEqual( 
    expect.arrayContaining([ 
      expect.objectContaining({
          "termId":          expect.any(Number),
          "identifier":      expect.any(String),
          "name":            expect.any(String),
          "title":           expect.any(Object),   
          "shortTitle":      expect.any(Object),
          "description":     expect.any(String),
          "longDescription": expect.any(Object),
          "source":          expect.any(String),
          "broaderTerms":    expect.any(Array),
          "narrowerTerms":   expect.any(Array),
          "relatedTerms":    expect.any(Array),
          "nonPreferedTerms":expect.any(Array),
      })   
    ])
  );  
})

test('getTerm func: throw error on wrong params ', async () => {
  await expect(() => myAPI.getTerm()).rejects.toThrowError(/invalid value for identifier/)  
})

test('getTerm func: terms="ad"', async () => {  
  const data = await myAPI.getTerm("ad");

  expect.objectContaining({
    "termId":           expect.any(Number),
    "identifier":       expect.any(String),
    "name":             expect.any(String),
    "title":            expect.any(Object),   
    "shortTitle":       expect.any(Object),
    "description":      expect.any(String),
    "longDescription":  expect.any(Object),
    "source":           expect.any(String),
    "broaderTerms":     expect.any(Array),
    "narrowerTerms":    expect.any(Array),
    "relatedTerms":     expect.any(Array),
    "nonPreferedTerms": expect.any(Array),
  });   
  
})

test('getTerm func: throw error on wrong params ', async () => {
  await expect(() => myAPI.getTerm()).rejects.toThrowError(/invalid value for identifier/) 
})

test('getTerm func: term="ad", relations="all"', async () => {  
  const data = await myAPI.getTerm("ad",{relations:"all"});

  expect.objectContaining({
    "termId":           expect.any(Number),
    "identifier":       expect.any(String),
    "name":             expect.any(String),
    "title":            expect.any(Object),   
    "shortTitle":       expect.any(Object),
    "description":      expect.any(String),
    "longDescription":  expect.any(Object),
    "source":           expect.any(String),
    "broaderTerms":     expect.any(Array),
    "narrowerTerms":    expect.any(Array),
    "relatedTerms":     expect.any(Array),
    "nonPreferedTerms": expect.any(Array),
  });    
  
})

test('getTerm func: term="ad"', async () => {  
  const data = await myAPI.getTerm("ad");

  expect.objectContaining({
    "termId":           expect.any(Number),
    "identifier":       expect.any(String),
    "name":             expect.any(String),
    "title":            expect.any(Object),   
    "shortTitle":       expect.any(Object),
    "description":      expect.any(String),
    "longDescription":  expect.any(Object),
    "source":           expect.any(String),
    "broaderTerms":     expect.any(Array),
    "narrowerTerms":    expect.any(Array),
    "relatedTerms":     expect.any(Array),
    "nonPreferedTerms": expect.any(Array),
  });   
})

test('getTerm func: term="ad", relations="domain"', async () => {  
  const data = await myAPI.getTerm("ad", {relations:"domain"});

  expect.objectContaining({
    "termId":           expect.any(Number),
    "identifier":       expect.any(String),
    "name":             expect.any(String),
    "title":            expect.any(Object),   
    "shortTitle":       expect.any(Object),
    "description":      expect.any(String),
    "longDescription":  expect.any(Object),
    "source":           expect.any(String),
    "broaderTerms":     expect.any(Array),
    "narrowerTerms":    expect.any(Array),
    "relatedTerms":     expect.any(Array),
    "nonPreferedTerms": expect.any(Array),
  });  
})




  








