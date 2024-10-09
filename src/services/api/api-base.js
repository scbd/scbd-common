import ky from 'ky';
import { isFunction } from 'lodash'; // Todo remove
import * as Vue from 'vue';
// import { inject } from 'vue';


// console.log("inject('sitePrefixUrl'),", inject('sitePrefixUrl'))

//TODO: get prefixUrl, and token from external
// convert to TS

let sitePrefixUrl = 'https://api.cbd.int';

if(/\.cbd\.int$/i   .test(window?.location?.hostname || '')) sitePrefixUrl= 'https://api.cbd.int';
if(/\.cbddev\.xyz$/i.test(window?.location?.hostname || '')) sitePrefixUrl= 'https://api.cbddev.xyz';
if(/\localhost$/i   .test(window?.location?.hostname || '')) sitePrefixUrl= '/';

const defaultOptions = { 
   prefixUrl:  'https://api.cbddev.xyz',  // this will be changed to dynamically
   timeout  : 30 * 1000,
   token: Vue?.prototype?.$auth?.strategy?.token?.get() // we will pass after login
}
// if(inject('sitePrefixUrl'))
// {
//   defaultOptions.prefixUrl = inject('sitePrefixUrl');
// }
// if(inject('timeout'))
// {
//   defaultOptions.timeout = inject('timeout');
// }
// if(inject('token'))
// {
//   defaultOptions.token = inject('token');
// }
// if(inject('tokenType'))
// {
//   defaultOptions.tokenType = inject('tokenType');
// }

export default class ApiBase
{
  constructor(options) {
    options = options || {};

    if(isFunction(options)) options = { token : options } // ??? remove/ correct

    const { token, prefixUrl, timeout, tokenType } = { ...defaultOptions, ...options }
    // need to correct
    this.config = {
      baseURL : prefixUrl,
      timeout,
      tokenType,
      token,
    }

    const http = async function (...args) {   
      // ToDo: to handle the existing code we can use .data like :
      // return data.(await loadAsyncHeaders(this.config))(...args).json();
      return (await loadAsyncHeaders(this.config))(...args);
    }
    // ky
    // const response = await ky.get('https://example.com/api/users');
    // const data = await response.json();
    // console.log(data);
    http.get     = async (...args)=> (await loadAsyncHeaders(this.config)).get    (...args).json();
    http.head    = async (...args)=> (await loadAsyncHeaders(this.config)).head   (...args).json();
    http.post    = async (...args)=> (await loadAsyncHeaders(this.config)).post   (...args).json();
    http.put     = async (...args)=> (await loadAsyncHeaders(this.config)).put    (...args).json();
    http.patch   = async (...args)=> (await loadAsyncHeaders(this.config)).patch  (...args).json();
    http.delete  = async (...args)=> (await loadAsyncHeaders(this.config)).delete (...args).json();
    http.options = async (...args)=> (await loadAsyncHeaders(this.config)).options(...args).json();
    http.request = async (...args)=> (await loadAsyncHeaders(this.config)).request(...args).json();

    this.http = http;
  }
}

async function loadAsyncHeaders(baseConfig) {
  
  const { token, tokenType, ...config } = baseConfig || {}

  const headers = { ...(config.headers || {}) };

  if(token) {
    // headers: { Authorization: `${config.tokenType} ${config.token}`,  }
      headers.Authorization = `${tokenType||'Bearer'} ${token}`;
  }

  // return axios.create({ ...config, headers } );
   return ky.extend({prefixUrl: config.baseURL,  headers });

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