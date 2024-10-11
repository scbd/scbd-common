'use strict';

var vitest = require('vitest');
var axios = require('axios');
var lodash = require('lodash');
var Vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

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

var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
var Vue__namespace = /*#__PURE__*/_interopNamespace(Vue);

let sitePrefixUrl = 'https://api.cbd.int';

if(/\.cbd\.int$/i   .test(window?.location?.hostname || '')) sitePrefixUrl= 'https://api.cbd.int';
if(/\.cbddev\.xyz$/i.test(window?.location?.hostname || '')) sitePrefixUrl= 'https://api.cbddev.xyz';
if(/\localhost$/i   .test(window?.location?.hostname || '')) sitePrefixUrl= '/';

const defaultOptions = { 
   prefixUrl:  sitePrefixUrl, 
   timeout  : 30 * 1000,
   token: Vue__namespace?.prototype?.$auth?.strategy?.token?.get()  
};

class ApiBase
{
  constructor(options) {
    options = options || {};

    if(lodash.isFunction(options)) options = { token : options };

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

  return axios__default["default"].create({ ...config, headers } );

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

vitest.test('getDomains func: get all domains', () => {  
    return myAPI.getDomains().then(data => {
      vitest.expect.soft(data).toEqual( 
          vitest.expect.arrayContaining([ 
            vitest.expect.objectContaining({ 
              "domainId":   vitest.expect.any(Number), 
              "identifier": vitest.expect.any(String),
              "name":       vitest.expect.any(String)
            }) 
        ]) 
      );     
    })
});

vitest.test('getDomain func: throw error on wrong params ', async () => {
  await vitest.expect(() => myAPI.getDomain()).rejects.toThrowError(/invalid value for domainIdentifier/);
});

vitest.test('getDomain func: get domans of countries', () => {  
  return myAPI.getDomain("countries").then(data=> {
      vitest.expect.objectContaining({
          "domainId":   vitest.expect.any(Number),
          "identifier": vitest.expect.any(String),
          "name":       vitest.expect.any(String)
      });    
  })
});

vitest.test('getDomain func: get domain of countries, relation = "domain"', () => {  
  return myAPI.getDomain("countries",{relations:"domain"}).then(data=> {
      vitest.expect.objectContaining({
          "domainId":   vitest.expect.any(Number),
          "identifier": vitest.expect.any(String),
          "name":       vitest.expect.any(String)
      });     
  })
});

vitest.test('getDomain func: get domain of countries, relation = "all"', () => {  
  return myAPI.getDomain("countries",{relations:"all"}).then(data=> {
      vitest.expect.objectContaining({
          "domainId":   vitest.expect.any(Number),
          "identifier": vitest.expect.any(String),
          "name":       vitest.expect.any(String)
      });     
  })
});

vitest.test('getTerms func: throw error on wrong params ', async () => {
  await vitest.expect(() => myAPI.getTerms()).rejects.toThrowError(/invalid value for termIdentifier/);
});

vitest.test('getTerms func: get terms of countries', () => {  
  return myAPI.getTerms("countries").then(data=> {
    vitest.expect.soft(data).toEqual( 
      vitest.expect.arrayContaining([ 
        vitest.expect.objectContaining({
            "termId":           vitest.expect.any(Number),
            "identifier":      vitest.expect.any(String),
            "name":            vitest.expect.any(String),
            "title":           vitest.expect.any(Object),   
            "shortTitle":      vitest.expect.any(Object),
            "description":     vitest.expect.any(String),
            "longDescription": vitest.expect.any(Object),
            "source":          vitest.expect.any(String),
            "broaderTerms":    vitest.expect.any(Array),
            "narrowerTerms":   vitest.expect.any(Array),
            "relatedTerms":    vitest.expect.any(Array),
            "nonPreferedTerms":vitest.expect.any(Array),
          })   
        ])
      );
  }) 
});

vitest.test('getTerm func: throw error on wrong params ', async () => {
  await vitest.expect(() => myAPI.getTerm()).rejects.toThrowError(/invalid value for termIdentifier/);  
});

vitest.test('getTerm func: terms of ad', () => {  
  return myAPI.getTerm("ad").then(data=> {
      vitest.expect.objectContaining({
          "termId":           vitest.expect.any(Number),
          "identifier":       vitest.expect.any(String),
          "name":             vitest.expect.any(String),
          "title":            vitest.expect.any(Object),   
          "shortTitle":       vitest.expect.any(Object),
          "description":      vitest.expect.any(String),
          "longDescription":  vitest.expect.any(Object),
          "source":           vitest.expect.any(String),
          "broaderTerms":     vitest.expect.any(Array),
          "narrowerTerms":    vitest.expect.any(Array),
          "relatedTerms":     vitest.expect.any(Array),
          "nonPreferedTerms": vitest.expect.any(Array),
      });   
  })
});

vitest.test('getTerm func: throw error on wrong params ', async () => {
  await vitest.expect(() => myAPI.getTerm()).rejects.toThrowError(/invalid value for termIdentifier/);
  //await expect(() => myAPI.getTermRelation("ad")).rejects.toThrowError(/invalid value for relations/)
});

vitest.test('getTerm func:  term of ad, relations=all', () => {  
  return myAPI.getTerm("ad",{relations:"all"}).then(data=> {
      vitest.expect.objectContaining({
          "termId":           vitest.expect.any(Number),
          "identifier":       vitest.expect.any(String),
          "name":             vitest.expect.any(String),
          "title":            vitest.expect.any(Object),   
          "shortTitle":       vitest.expect.any(Object),
          "description":      vitest.expect.any(String),
          "longDescription":  vitest.expect.any(Object),
          "source":           vitest.expect.any(String),
          "broaderTerms":     vitest.expect.any(Array),
          "narrowerTerms":    vitest.expect.any(Array),
          "relatedTerms":     vitest.expect.any(Array),
          "nonPreferedTerms": vitest.expect.any(Array),
      });    
  })
});

vitest.test('getTerm func:  term of ad', () => {  
  return myAPI.getTerm("ad").then(data=> {
      vitest.expect.objectContaining({
        "termId":           vitest.expect.any(Number),
        "identifier":       vitest.expect.any(String),
        "name":             vitest.expect.any(String),
        "title":            vitest.expect.any(Object),   
        "shortTitle":       vitest.expect.any(Object),
        "description":      vitest.expect.any(String),
        "longDescription":  vitest.expect.any(Object),
        "source":           vitest.expect.any(String),
        "broaderTerms":     vitest.expect.any(Array),
        "narrowerTerms":    vitest.expect.any(Array),
        "relatedTerms":     vitest.expect.any(Array),
        "nonPreferedTerms": vitest.expect.any(Array),
      });    
  })
});

vitest.test('getTerm func:  term of ad, relations=domain', () => {  
  return myAPI.getTerm("ad", {relations:"domain"}).then(data=> {
      vitest.expect.objectContaining({
        "termId":           vitest.expect.any(Number),
        "identifier":       vitest.expect.any(String),
        "name":             vitest.expect.any(String),
        "title":            vitest.expect.any(Object),   
        "shortTitle":       vitest.expect.any(Object),
        "description":      vitest.expect.any(String),
        "longDescription":  vitest.expect.any(Object),
        "source":           vitest.expect.any(String),
        "broaderTerms":     vitest.expect.any(Array),
        "narrowerTerms":    vitest.expect.any(Array),
        "relatedTerms":     vitest.expect.any(Array),
        "nonPreferedTerms": vitest.expect.any(Array),
      });    
  })
});
//# sourceMappingURL=thesaurus.test.cjs.map
