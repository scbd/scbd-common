import { expect, test } from 'vitest'
import ThesaurusAPI from './thesaurus'

const myAPI = new ThesaurusAPI({});

test('getDomains func: get all domains', () => {  
    return myAPI.getDomains().then(data => {
      expect.soft(data).toEqual( 
          expect.arrayContaining([ 
            expect.objectContaining({ 
              "domainId":   expect.any(Number), 
              "identifier": expect.any(String),
              "name":       expect.any(String)
            }) 
        ]) 
      )     
    })
})

test('getDomain func: throw error on wrong params ', async () => {
  await expect(() => myAPI.getDomain()).rejects.toThrowError(/invalid value for domainIdentifier/)
})

test('getDomain func: get domans of countries', () => {  
  return myAPI.getDomain("countries").then(data=> {
      expect.objectContaining({
          "domainId":   expect.any(Number),
          "identifier": expect.any(String),
          "name":       expect.any(String)
      })    
  })
})

test('getDomain func: get domain of countries, relation = "domain"', () => {  
  return myAPI.getDomain("countries",{relations:"domain"}).then(data=> {
      expect.objectContaining({
          "domainId":   expect.any(Number),
          "identifier": expect.any(String),
          "name":       expect.any(String)
      })     
  })
})

test('getDomain func: get domain of countries, relation = "all"', () => {  
  return myAPI.getDomain("countries",{relations:"all"}).then(data=> {
      expect.objectContaining({
          "domainId":   expect.any(Number),
          "identifier": expect.any(String),
          "name":       expect.any(String)
      })     
  })
})

test('getTerms func: throw error on wrong params ', async () => {
  await expect(() => myAPI.getTerms()).rejects.toThrowError(/invalid value for termIdentifier/)
})

test('getTerms func: get terms of countries', () => {  
  return myAPI.getTerms("countries").then(data=> {
    expect.soft(data).toEqual( 
      expect.arrayContaining([ 
        expect.objectContaining({
            "termId":           expect.any(Number),
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
      )
  }) 
})

test('getTerm func: throw error on wrong params ', async () => {
  await expect(() => myAPI.getTerm()).rejects.toThrowError(/invalid value for termIdentifier/)  
})

test('getTerm func: terms of ad', () => {  
  return myAPI.getTerm("ad").then(data=> {
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
      })   
  })
})

test('getTerm func: throw error on wrong params ', async () => {
  await expect(() => myAPI.getTerm()).rejects.toThrowError(/invalid value for termIdentifier/)
  //await expect(() => myAPI.getTermRelation("ad")).rejects.toThrowError(/invalid value for relations/)
})

test('getTerm func:  term of ad, relations=all', () => {  
  return myAPI.getTerm("ad",{relations:"all"}).then(data=> {
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
      })    
  })
})

test('getTerm func:  term of ad', () => {  
  return myAPI.getTerm("ad").then(data=> {
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
      })    
  })
})

test('getTerm func:  term of ad, relations=domain', () => {  
  return myAPI.getTerm("ad", {relations:"domain"}).then(data=> {
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
      })    
  })
})




  








