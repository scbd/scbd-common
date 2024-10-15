import ky from 'ky';
import { inject } from 'vue';

const defaultOptions = { 
   prefixUrl: 'https://api.cbddev.xyz', 
   timeout: 30 * 1000
}

// Use inject to override defaults if available in the current Vue app instance
const injectedPrefixUrl = inject('sitePrefixUrl');
if (injectedPrefixUrl) defaultOptions.prefixUrl = injectedPrefixUrl;

const injectedTimeout = inject('timeout');
if (injectedTimeout) defaultOptions.timeout = injectedTimeout;

const injectedToken = inject('token');
const injectedTokenType = inject('tokenType');

export default class ApiBase {
  constructor(options = {}) {
    // Create an extended ky instance with the injected options
    const http = ky.extend({
      prefixUrl: defaultOptions.prefixUrl,
      timeout: defaultOptions.timeout,
      hooks: {
        beforeRequest: [
          request => {
            request.headers.set('X-Requested-With', 'ky');
            if (injectedToken) {
              request.headers.set('Authorization', `${injectedTokenType} ${injectedToken}`);
            }
          }
        ],
        afterResponse: [
          async (request, options, response) => {
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(`API Error: ${errorData.message || 'An error occurred'}`);
            }
            // ToDo: Ky requires you to call the response.json() method to parse the response data to a JavaScript object
            const jsonResponse = await response.json(); // ToDo: Ky's afterResponse hook does not modify the return value of the ky call itself. 
            return jsonResponse; // Return the parsed JSON
          }
        ]
      },
      ...options, // Allow passing additional options
    });

    this.http = http;
  }
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