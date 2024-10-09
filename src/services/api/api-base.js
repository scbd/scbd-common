import ky from 'ky';
import * as Vue from 'vue';
import { inject } from 'vue';


const defaultOptions = { 
   prefixUrl: 'https://api.cbddev.xyz', 
   timeout  : 30 * 1000
}

// Use inject to override defaults if available in the current Vue app instance
const injectedPrefixUrl = inject('sitePrefixUrl');
if (injectedPrefixUrl) defaultOptions.prefixUrl = injectedPrefixUrl;

const injectedTimeout = inject('timeout');
if (injectedTimeout) defaultOptions.timeout = injectedTimeout;

const injectedToken = inject('token');
if (injectedToken) defaultOptions.token = injectedToken;

const injectedTokenType = inject('tokenType');
if (injectedTokenType) defaultOptions.tokenType = injectedTokenType;

export default class ApiBase {
  constructor(options = {}) { // Use empty object if no options are passed
    const { token, prefixUrl, timeout, tokenType } = { ...defaultOptions, ...options }; // Merge options with defaults

    this.config = {
      baseURL: prefixUrl,
      timeout,
      tokenType,
      token,
    };

    this.http = async (...args) => {
      return (await loadAsyncHeaders(this.config))(...args);
    };

    this.http.get = async (...args) => (await loadAsyncHeaders(this.config)).get(...args).json();
    this.http.head = async (...args) => (await loadAsyncHeaders(this.config)).head(...args).json();
    this.http.post = async (...args) => (await loadAsyncHeaders(this.config)).post(...args).json();
    this.http.put = async (...args) => (await loadAsyncHeaders(this.config)).put(...args).json();
    this.http.patch = async (...args) => (await loadAsyncHeaders(this.config)).patch(...args).json();
    this.http.delete = async (...args) => (await loadAsyncHeaders(this.config)).delete(...args).json();
    this.http.options = async (...args) => (await loadAsyncHeaders(this.config)).options(...args).json();
    this.http.request = async (...args) => (await loadAsyncHeaders(this.config)).request(...args).json();
  }
}

// Async function to load headers and create `ky` instance
async function loadAsyncHeaders(baseConfig) {
  console.log("baseConfig: ", baseConfig);
  
  const { token, tokenType, ...config } = baseConfig || {};
  const headers = { ...(config.headers || {}) };

  if (token) {
    headers.Authorization = `${tokenType || 'Bearer'} ${token}`;
  }
  const api = ky.create({prefixUrl: config.baseURL});
  return api.extend({ prefixUrl: config.baseURL, headers });
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

export function stringifyUrlParam(value) {
  if (value instanceof(Date))   {return value.toISOString()}    
  if (value instanceof(Object)) {return JSON.stringify(value)}  
  return value; 
}

export function stringifyUrlParams(valueObj) {
  const returnObj = {};

  for (const [key, value] of Object.entries(valueObj)) {
    if (isValid(value)){
      returnObj[key] = stringifyUrlParam(value);
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