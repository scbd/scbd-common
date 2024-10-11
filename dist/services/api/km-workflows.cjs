'use strict';

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

class KmWorkflowsApi extends ApiBase
{
    constructor(options) {
        super(options);
    }    
    
    async getWorkflowHistory({q, f, s, sk, l , c, fo, ag }={})  {
        const params = stringifyUrlParams( {q, f, s, sk, l , c, fo, ag });

        return this.http.get(`/api/v2013/workflows`,  { params })
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }

    async getWorkflow(workflowId)  {
        if(!isValid(workflowId)) throw Error(`invalid value for workflowId`);
      
        return this.http.get(`/api/v2013/workflows/${encodeURIComponent(workflowId)}`)
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }

    async getBatchWorkflowDetails(batchId){ //:Promise<EKmDocumentsBatchWorkflow>  {
        if(!isValid(batchId)) throw Error(`invalid value for batchId`);

        return this.http.get(`/api/v2013/workflows/batches/${encodeURIComponent(batchId)}`)
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }

    async updateActivity(id, activityName, body) {  
        if(!isValid(id))            throw Error(`invalid value for id`);
        if(!isValid(activityName))  throw Error(`invalid value for activityName`);
        if(!isValid(body))          throw Error(`invalid value for body`);

        return this.http.put(`/api/v2013/workflows/${id}/activities/${activityName}`, body)
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }

    async updateBatchActivity(id, activityName, body) {
        if(!isValid(id))           throw Error(`invalid value for id`);
        if(!isValid(activityName)) throw Error(`invalid value for activityName`);
        if(!isValid(body))         throw Error(`invalid value for body`);

        return this.http.put(`/api/v2013/workflows/batches/${id}/activities/${activityName}` , body)
                        .then(res => res.data)
                        .catch(tryCastToApiError);    
    }

    async cancelWorkflow(id) {        
        if(!isValid(id)) throw Error(`invalid value for id`);
        const params  = { 'action': 'cancel' };

        return this.http.delete(`/api/v2013/workflows/${id}`,{ params })
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }

    async cancelBatch(batchId) {
        if(!isValid(batchId)) throw Error(`invalid value for batchId`);
        
        const params = { 'action': 'cancel' };

        return this.http.delete(`/api/v2013/workflows/batches/${batchId}`,{ params })
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }
}

module.exports = KmWorkflowsApi;
//# sourceMappingURL=km-workflows.cjs.map
