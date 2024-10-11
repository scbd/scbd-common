import axios from 'axios';
import { isFunction } from 'lodash';
import * as Vue from 'vue';
import 'lodash/isNumber';
import 'lodash/isDate';

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

class SolrIndexAPI extends ApiBase {
  constructor(options) {
    super(options);
  }

  async query({ searchField, fieldQueries, query, sort, fields, start, rowsPerPage } = {}) {

    const params = stringifyUrlParams( { 
        df: searchField? searchField:'text_EN_txt',
        fq: fieldQueries,
        q: query,
        sort: this.localizeFields(sort),
        fl: this.localizeFields(fields),
        wt: 'json',   
        start: start? start : 0,
        rows: rowsPerPage? rowsPerPage: 25,
    });

    return this.http.get(`/api/v2013/index/select`, { params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);

  }

  localizeFields(fields, locale) {
    if (!fields)
      return;

    if (locale && locale != 'en') {
      return fields.replace(/_EN/ig, '_' + (locale || 'en').toUpperCase())
    }

    return fields;
  }

  solrEscape(value) {
    if (value === undefined) throw "Value is undefined";
    if (value === null) throw "Value is null";
    if (value === "") throw "Value is null";

    if (_.isNumber(value)) value = value.toString();
    if (_.isDate(value)) value = value.toISOString();

    //TODO: add more types

    value = value.toString();

    value = value.replace(/\\/g, '\\\\');
    value = value.replace(/\+/g, '\\+');
    value = value.replace(/\-/g, '\\-');
    value = value.replace(/\&\&/g, '\\&&');
    value = value.replace(/\|\|/g, '\\||');
    value = value.replace(/\!/g, '\\!');
    value = value.replace(/\(/g, '\\(');
    value = value.replace(/\)/g, '\\)');
    value = value.replace(/\{/g, '\\{');
    value = value.replace(/\}/g, '\\}');
    value = value.replace(/\[/g, '\\[');
    value = value.replace(/\]/g, '\\]');
    value = value.replace(/\^/g, '\\^');
    value = value.replace(/\"/g, '\\"');
    value = value.replace(/\~/g, '\\~');
    value = value.replace(/\*/g, '\\*');
    value = value.replace(/\?/g, '\\?');
    value = value.replace(/\:/g, '\\:');

    return value;
  }
}

export { SolrIndexAPI as default };
//# sourceMappingURL=solr-index.js.map
