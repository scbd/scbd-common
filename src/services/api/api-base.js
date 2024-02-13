import axios from 'axios'
import { isFunction } from 'lodash'
import Vue from 'vue'

let sitePrefixUrl = 'https://api.cbd.int';

if(/\.cbd\.int$/i   .test(window?.location?.hostname || '')) sitePrefixUrl= 'https://api.cbd.int';
if(/\.cbddev\.xyz$/i.test(window?.location?.hostname || '')) sitePrefixUrl= 'https://api.cbddev.xyz';
// if(/\localhost$/i   .test(window?.location?.hostname || '')) sitePrefixUrl= '/';

const defaultOptions = { 
   prefixUrl:  sitePrefixUrl, 
   timeout  : 30 * 1000,
   token: Vue?.prototype?.$auth?.strategy?.token?.get()  
}

export default class ApiBase
{
  constructor(options) {
    options = options || {};

    if(isFunction(options)) options = { token : options }

    const { token, prefixUrl, timeout, tokenType } = { ...defaultOptions, ...options }


    const baseConfig = {
      baseURL : prefixUrl,
      timeout,
      tokenType,
      token
    }

    const http = async function (...args) {
      console.log(args)
      return (await loadAsyncHeaders(baseConfig))(...args);
    }

    http.get     = async (...args)=> (await loadAsyncHeaders(baseConfig)).get    (...args);
    http.head    = async (...args)=> (await loadAsyncHeaders(baseConfig)).head   (...args);
    http.post    = async (...args)=> (await loadAsyncHeaders(baseConfig)).post   (...args);
    http.put     = async (...args)=> (await loadAsyncHeaders(baseConfig)).put    (...args);
    http.patch   = async (...args)=> (await loadAsyncHeaders(baseConfig)).patch  (...args);
    http.delete  = async (...args)=> (await loadAsyncHeaders(baseConfig)).delete (...args);
    http.options = async (...args)=> (await loadAsyncHeaders(baseConfig)).options(...args);
    http.request = async (...args)=> (await loadAsyncHeaders(baseConfig)).request(...args);

    this.http = http;
  }
}

async function loadAsyncHeaders(baseConfig) {

  const { token, tokenType, ...config } = baseConfig || {}

  const headers = { ...(config.headers || {}) };

  if(token) {
      headers.Authorization = `${tokenType||'Bearer'} ${token}`;
  }

  return axios.create({ ...config, headers } );
}

//////////////////////////
// Helpers
////////////////////////

export function tryCastToApiError(error) {

  if(error && error.response && error.response.data && error.response.data.code) {
      const apiError = error.response.data
      throw error.response.data;
  }

  throw error
}

export function toUrlParam(value) {  
  if (value instanceof(Date))  return value.toISOString();
  if (value instanceof(Object)) return JSON.stringify(value);  
  return value; 
}

export function toUrlParams(valueObj) {
  const returnObj = {};

  for (const [key, value] of Object.entries(valueObj)) {
    if (value !== undefined){
      returnObj[key] = toUrlParam(value);
    }
  }
  
  return returnObj;
}

export function mapObjectId(id){  
  return isObjectId(id)? { $oid: id } : id
}

export function isObjectId(id){
  return /^[a-f0-9]{24}/i.test(id);
}

export function isValid(params){
  return ![undefined, null].includes(params);
}