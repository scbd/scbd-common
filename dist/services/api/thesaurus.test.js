import { test, expect } from 'vitest';
import axios from 'axios';
import { isFunction } from 'lodash';
import * as Vue from 'vue';

let sitePrefixUrl = 'https://api.cbd.int';

if(/\.cbd\.int$/i   .test(window?.location?.hostname || '')) sitePrefixUrl= 'https://api.cbd.int';
if(/\.cbddev\.xyz$/i.test(window?.location?.hostname || '')) sitePrefixUrl= 'https://api.cbddev.xyz';
if(/\localhost$/i   .test(window?.location?.hostname || '')) sitePrefixUrl= '/';

const defaultOptions = { 
   prefixUrl:  sitePrefixUrl, 
   timeout  : 30 * 1000,
   token: Vue?.prototype?.$auth?.strategy?.token?.get()  
};

class ApiBase
{
  constructor(options) {
    options = options || {};

    if(isFunction(options)) options = { token : options };

    const { token, prefixUrl, timeout, tokenType } = { ...defaultOptions, ...options };

    this.config = {
      baseURL : prefixUrl,
      timeout,
      tokenType,
      token,
    };

    const http = async function (...args) {   
      return (await loadAsyncHeaders(this.config))(...args);
    };

    http.get     = async (...args)=> (await loadAsyncHeaders(this.config)).get    (...args);
    http.head    = async (...args)=> (await loadAsyncHeaders(this.config)).head   (...args);
    http.post    = async (...args)=> (await loadAsyncHeaders(this.config)).post   (...args);
    http.put     = async (...args)=> (await loadAsyncHeaders(this.config)).put    (...args);
    http.patch   = async (...args)=> (await loadAsyncHeaders(this.config)).patch  (...args);
    http.delete  = async (...args)=> (await loadAsyncHeaders(this.config)).delete (...args);
    http.options = async (...args)=> (await loadAsyncHeaders(this.config)).options(...args);
    http.request = async (...args)=> (await loadAsyncHeaders(this.config)).request(...args);

    this.http = http;
  }
}

async function loadAsyncHeaders(baseConfig) {

  const { token, tokenType, ...config } = baseConfig || {};

  const headers = { ...(config.headers || {}) };

  if(token) {
      headers.Authorization = `${tokenType||'Bearer'} ${token}`;
  }

  return axios.create({ ...config, headers } );

}

//////////////////////////
// Helpers
////////////////////////

function tryCastToApiError(error) {

  if(error && error.response && error.response.data && error.response.data.code) {
      error.response.data;
      throw error.response.data;
  }

  throw error
}

function stringifyUrlParam(value) {
  if (value instanceof(Date))   {return value.toISOString()}    
  if (value instanceof(Object)) {return JSON.stringify(value)}  
  return value; 
}

function isValid(params){
  return ![undefined, null].includes(params);
}

class ThesaurusApi extends ApiBase
{
  
  constructor(options) {
    super(options);
  }

  async getDomains()  { 
    return this.http.get(`/api/v2013/thesaurus/domains`)
      .then(res => res.data)
      .catch(tryCastToApiError);
  }
  
  async getDomain(identifier)  {     
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);

    return this.http.get(`/api/v2013/thesaurus/domains/${encodeURIComponent(identifier)}` )
                    .then(res => res.data)
                    .catch(tryCastToApiError);   
  }

  async getDomainTerms(identifier, { relations } = {})  {    
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);

    const params= { };
    if(relations) params.relations = stringifyUrlParam(relations);

    return this.http.get(`/api/v2013/thesaurus/domains/${encodeURIComponent(identifier)}/terms`, { params } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
  
  async getTerm(identifier, { relations } = {})  {    
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const params= { }; 
    if(relations) params.relations = stringifyUrlParam(relations);

    return this.http.get(`/api/v2013/thesaurus/terms/${encodeURIComponent(identifier)}`,  { params } )
                    .then(res => res.data)
                    .catch(tryCastToApiError); 
  }
 }

const myAPI = new ThesaurusApi({});

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
      );     
    })
});

test('getDomain func: throw error on wrong params ', async () => {
  await expect(() => myAPI.getDomain()).rejects.toThrowError(/invalid value for domainIdentifier/);
});

test('getDomain func: get domans of countries', () => {  
  return myAPI.getDomain("countries").then(data=> {
      expect.objectContaining({
          "domainId":   expect.any(Number),
          "identifier": expect.any(String),
          "name":       expect.any(String)
      });    
  })
});

test('getDomain func: get domain of countries, relation = "domain"', () => {  
  return myAPI.getDomain("countries",{relations:"domain"}).then(data=> {
      expect.objectContaining({
          "domainId":   expect.any(Number),
          "identifier": expect.any(String),
          "name":       expect.any(String)
      });     
  })
});

test('getDomain func: get domain of countries, relation = "all"', () => {  
  return myAPI.getDomain("countries",{relations:"all"}).then(data=> {
      expect.objectContaining({
          "domainId":   expect.any(Number),
          "identifier": expect.any(String),
          "name":       expect.any(String)
      });     
  })
});

test('getTerms func: throw error on wrong params ', async () => {
  await expect(() => myAPI.getTerms()).rejects.toThrowError(/invalid value for termIdentifier/);
});

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
      );
  }) 
});

test('getTerm func: throw error on wrong params ', async () => {
  await expect(() => myAPI.getTerm()).rejects.toThrowError(/invalid value for termIdentifier/);  
});

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
      });   
  })
});

test('getTerm func: throw error on wrong params ', async () => {
  await expect(() => myAPI.getTerm()).rejects.toThrowError(/invalid value for termIdentifier/);
  //await expect(() => myAPI.getTermRelation("ad")).rejects.toThrowError(/invalid value for relations/)
});

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
      });    
  })
});

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
      });    
  })
});

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
      });    
  })
});
//# sourceMappingURL=thesaurus.test.js.map
