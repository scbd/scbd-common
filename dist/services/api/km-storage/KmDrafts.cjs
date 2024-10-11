'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

function stringifyUrlParams(valueObj) {
  const returnObj = {};

  for (const [key, value] of Object.entries(valueObj)) {
    if (isValid(value)){
      returnObj[key] = stringifyUrlParam(value);
    }
  }
  
  return returnObj;
}

function isValid(params){
  return ![undefined, null].includes(params);
}

const  serviceUrls = { 
  documentQueryUrl      (                     ){ return "/api/v2013/documents" },
  draftUrl              (identifier           ){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/versions/draft` },
  draftSecurityUrl      (identifier, operation){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/versions/draft/securities/${encodeURIComponent(operation)}` },
  draftLockUrl          (identifier, lockID   ){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/versions/draft/locks/${encodeURIComponent(lockID)}` },
  draftLockListUrl      (identifier           ){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/versions/draft/locks` },
};

class KmDraftsApi extends ApiBase
{
  #realm;
  constructor(options) {    
    super(options);
    this.self = this;
    this.#realm = options.realm;
  }

  async query({realm, q, s, l, sk }={}){  
    const params = stringifyUrlParams( {    
      $filter:q, 
      $orderby:s,
      $top:l,
      $skip:sk, 
      collection : "mydraft"  
    });

    const headers =  { Realm : realm || this.#realm || undefined };

    const data =  this.http.get(serviceUrls.documentQueryUrl(), { headers, params} )
                           .then(res => res.data)
                           .catch(tryCastToApiError);
     
    if(data?.Items?.length){
      data.Items = data.Items.map(e=>{
            if(e.workingDocumentBody){
                e.body = e.workingDocumentBody;
            }
            return e;
      });
    }

    return data;
  }

  async get(identifier, {realm}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    
    const headers =  { Realm : realm || this.#realm || undefined };

    const data =  this.http.get(serviceUrls.draftUrl(identifier), { headers })
                           .then(res => res.data)
                           .catch(tryCastToApiError);
    
    if(data.workingDocumentBody){
        data.body = data.workingDocumentBody;
    }

    return data;
  }

  async exists( identifier, {realm}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const headers =  { Realm : realm || this.#realm || undefined };

     return this.http.head(serviceUrls.draftUrl(identifier), { headers })
                     .then(res => res.data)
                     .catch(tryCastToApiError);
  }

  async put( identifier, body, {realm, schema}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(body)) throw Error(`invalid value for body`);  

    const params = stringifyUrlParams( {schema}); 

    const Realm =  { Realm : realm || this.#realm || undefined };
    const ContentType = { 'Content-Type': 'application/json' };
    const headers =  { ...Realm , ...ContentType};

    return this.http.put(serviceUrls.draftUrl(identifier),  body , { headers, params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async delete(identifier, {realm}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const headers =  { Realm : realm || this.#realm || undefined };

    return this.http.delete(serviceUrls.draftUrl(identifier), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
  
  async canCreate(identifier, {realm, schema, metadata }={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const params = stringifyUrlParams( {schema, metadata }); 

    const headers =  { Realm : realm || this.#realm || undefined };

    return this.http.get(serviceUrls.draftSecurityUrl(identifier, 'create'), { headers, params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async canUpdate(identifier, {realm, metadata}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const headers =  { Realm : realm || this.#realm || undefined };

    const params = stringifyUrlParams( {metadata}); 
    return this.http.get(serviceUrls.draftSecurityUrl(identifier, 'update'), { headers, params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async canDelete(identifier, {realm}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const headers =  { Realm : realm || this.#realm || undefined };

    return this.http.get(serviceUrls.draftSecurityUrl(identifier, 'delete'), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
}


class KmLocksApi extends ApiBase
{
  #realm;
  constructor(options) {    
    super(options);
    this.self = this;
    this.#realm = options.realm;
  }

  async query(identifier, {realm}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const headers =  { Realm : realm || this.#realm || undefined };
 
    return this.http.get(serviceUrls.draftLockListUrl(identifier), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async get(identifier, lockID, {realm}={} ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(lockID)) throw Error(`invalid value for lockID`); 

    const headers =  { Realm : realm || this.#realm || undefined };

    return this.http.get(serviceUrls.draftLockUrl(identifier, lockID), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async exists(identifier,lockID, {realm}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(lockID)) throw Error(`invalid value for lockID`); 

    const headers =  { Realm : realm || this.#realm || undefined };

    return this.http.head(serviceUrls.draftLockUrl(identifier, lockID), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }  
 
  async put(identifier,lockID, body, {realm}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(lockID)) throw Error(`invalid value for lockID`); 

    const headers =  { Realm : realm || this.#realm || undefined };
    
    return this.http.put(serviceUrls.draftLockUrl(identifier,lockID), body, { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
 
  async delete(identifier,lockID, {realm}={} ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(lockID)) throw Error(`invalid value for lockID`); 

    const headers =  { Realm : realm || this.#realm || undefined };

    return this.http.delete(serviceUrls.draftLockUrl(identifier,lockID), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
}

exports.KmDraftsApi = KmDraftsApi;
exports.KmLocksApi = KmLocksApi;
//# sourceMappingURL=KmDrafts.cjs.map
