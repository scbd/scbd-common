'use strict';

var Vue = require('vue');
var _ = require('lodash');
require('@ckeditor/ckeditor5-vue/dist/ckeditor.js');
var CKEditor = require('@ckeditor/ckeditor5-vue');
var ClassicEditor = require('@scbd/ckeditor5-build-inline-full/build/ckeditor.js');
require('@scbd/ckeditor5-build-inline-full/build/ckeditor.css');
require('@/services/composables/i18n');
require('@/services/filters/lstring');
var axios = require('axios');
var thesaurus = require('@/services/composables/thesaurus');
var index = require('@/services/util/index');

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

var Vue__namespace = /*#__PURE__*/_interopNamespace(Vue);
var ___default = /*#__PURE__*/_interopDefaultLegacy(_);
var CKEditor__default = /*#__PURE__*/_interopDefaultLegacy(CKEditor);
var ClassicEditor__default = /*#__PURE__*/_interopDefaultLegacy(ClassicEditor);
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

const  useI18n = ()=>{
    return {
        t       : (key)=>key,
        locale  : 'en'
    }
};

const removeEmpty = (obj)=> {
    return function remove(current) {
      ___default["default"].forOwn(current, function (value, key) {
        if (___default["default"].isUndefined(value) || ___default["default"].isNull(value) || ___default["default"].isNaN(value) ||
          (___default["default"].isString(value) && ___default["default"].isEmpty(value)) ||
          (___default["default"].isObject(value) && ___default["default"].isEmpty(remove(value)))) {
  
          delete current[key];
        }
      });

      if (___default["default"].isArray(current)) ___default["default"].pull(current, undefined);
  
      return current;
  
    }(___default["default"].cloneDeep(obj));
};

const useLogger = ()=>{
    return {
        error
    }
};



function error(appError, userMessage){

    if(![404, 401, 403].includes(appError?.status)){

        try{
            console.error(appError);
            
            const { ACCOUNTS_HOST_URL, TAG, COMMIT } = useRuntimeConfig().public;
            const realmConfStore  = useRealmConfStore();
            const realmConf = realmConfStore.realmConf; 
            //TODO: send error to server
            const errorLog = {
                stack : JSON.stringify(appError, Object.getOwnPropertyNames(appError)), 
                message: JSON.stringify(userMessage || appError?.message || 'unknown'),
                url      : window.location.href,
                userAgent: window.navigator.userAgent,
                ver      : TAG||COMMIT,
                timestamp: new Date(),
                realm : realmConf.realm
            }; 

            useAPIFetch('/error-logs', {method:'POST', body: errorLog});
        }
        catch(err){
            console.error(err, 'error sending error log to server.');
        }
    }
        
    if(userMessage){
        const $toast = useToast();
        $toast.error(userMessage, {position:'top-right'}); 
    }
}

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

    if(_.isFunction(options)) options = { token : options };

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

const  serviceUrls$1 = { 
  documentQueryUrl      (                     ){ return "/api/v2013/documents" },
  documentUrl           (identifier           ){ return `/api/v2013/documents/${encodeURIComponent(identifier)}` },
  documentInfoUrl       (identifier           ){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/info` }, 
  validateUrl           (                     ){ return "/api/v2013/documents/x/validate" },
  attachmentUrl         (identifier, filename ){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/attachments/${encodeURIComponent(filename)}` },
  temporaryAttachmentUrl(                     ){ return `/api/v2015/temporary-files` },
  persistAttachmentUrl  (identifier, guid     ){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/attachments/persist-temporary/${encodeURIComponent(guid)}` },
  securityUrl           (identifier, operation){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/securities/${encodeURIComponent(operation)}` },
  documentVersionListUrl(identifier           ){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/versions` },
  documentVersionUrl    (identifier           ){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/versions/:revision` },
  documentVersionInfoUrl(identifier           ){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/versions/:revision/info` } 
};


class KmDocumentsApi extends ApiBase
{
  #realm;
  constructor(options) {  
    super(options );
    this.self = this;
    this.#realm = options.realm;
  }

  async query( {realm, q, s, l, sk }={}){
    const params = stringifyUrlParams( { 
      $filter:q, 
      $orderby:s,
      $skip:sk, 
      $top:l,
      collection : "my"
    });

    const headers =  { Realm : realm || this.#realm || undefined };
    
    return this.http.get(serviceUrls$1.documentQueryUrl(), { headers, params } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async get(identifier, {realm}={} ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 
        
    const headers =  { Realm : realm || this.#realm || undefined };

    return this.http.get(serviceUrls$1.documentUrl(identifier) ,{ headers } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }


  async getInfo(identifier, {realm}={} ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 
        
    const headers =  { Realm : realm || this.#realm || undefined };

    return this.http.get(serviceUrls$1.documentInfoUrl(identifier) ,{ headers } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async exists( identifier, {realm}={} ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 

    const headers =  { Realm : realm || this.#realm || undefined };

    return this.http.head(serviceUrls$1.documentUrl(identifier), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async put( identifier, body, {realm}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(body)) throw Error(`invalid value for body`);  
  
    const Realm =  { Realm : realm || this.#realm || undefined };  
    const ContentType = { 'Content-Type': 'application/json' };
    const headers =  { ...Realm , ...ContentType};
    
    return this.http.put(serviceUrls$1.documentUrl(identifier), body , { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async delete(identifier, {realm}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const headers =  { Realm : realm || this.#realm || undefined };  

    return this.http.delete(serviceUrls$1.documentUrl(identifier), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
   
  async validate(body, {realm, schema, metadata }={}){
    if(!isValid(body)) throw Error(`invalid value for body`);  

    const params = stringifyUrlParams( { schema, metadata });

    const headers =  { Realm : realm || this.#realm || undefined };  
   
    return this.http.put(serviceUrls$1.validateUrl(), body, { headers, params } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async canCreate(identifier, {realm, schema, metadata}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(schema)) throw Error(`invalid value for schema`);  

    const params = stringifyUrlParams({ schema, metadata });

    const headers =  { Realm : realm || this.#realm || undefined };  

    return this.http.get(serviceUrls$1.securityUrl(identifier, 'create'), { headers, params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async canUpdate(identifier,  {realm, metadata }={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const params = stringifyUrlParams( {metadata });

    const headers =  { Realm : realm || this.#realm || undefined };  

    return this.http.get(serviceUrls$1.securityUrl(identifier, 'update'), { headers, params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  } 
 
  async canDelete(identifier, {realm}={} ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 
    
    const headers =  { Realm : realm || this.#realm || undefined };  
   
    return this.http.get(serviceUrls$1.securityUrl(identifier, 'delete'), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
}

class KmDocumentsVersionApi extends ApiBase
{
  #realm;
  constructor(options) {    
    super(options);
    this.self = this;
    this.#realm = options.realm;
  }
  

  async query(identifier, {realm}={}){

    const headers =  { Realm : realm || this.#realm || undefined };  
    
    return this.http.get(serviceUrls$1. documentVersionListUrl(identifier) , { headers, params } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async get(identifier, {realm}={} ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 
        
    const headers =  { Realm : realm || this.#realm || undefined };  

    return this.http.get(serviceUrls$1.documentVersionUrl(identifier) ,{ headers } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }


  async getInfo(identifier, {realm}={} ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 
        
    const headers =  { Realm : realm || this.#realm || undefined };  

    return this.http.get(serviceUrls$1.documentVersionInfoUrl(identifier) ,{ headers } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async exists( identifier, {realm}={} ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 

    const headers =  { Realm : realm || this.#realm || undefined };  

    return this.http.head(serviceUrls$1.documentVersionUrl(identifier), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

}

class KmAttachmentsApi extends ApiBase
{
  #realm;
  constructor(options) {    
    super(options);
    this.self = this;
    this.#realm = options.realm;
  }

  async uploadTempFile(identifier, file, fileName, options)  {
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(file))       throw Error(`invalid value for file`);  
    if(!isValid(fileName))   throw Error(`invalid value for fileName`);  
    if(!isValid(options))    throw Error(`invalid value for options`);  
    
    
    const { timeout, onUploadProgress, onDownloadProgress }= { ...(options||{}) };

    const apiConfig = {
      headers: {},
      timeout: timeout || 60 * 60 * 1000,
      onUploadProgress, 
      onDownloadProgress
    };
    
    const tempSlotBody = {
        filename    : fileName,
    };

    //find the content type and validate with whitelist
    if(file instanceof FormData){
        const tempFile = formData.get('file');
        if(tempFile){
            tempSlotBody.contentType = this.getMimeType(file);
        }
    }
    else if(file instanceof File){
        tempSlotBody.contentType = this.getMimeType(file);
    }
    else {
        throw new Error('Unable to read file information.')
    }
    
    if (this.mimeTypeWhitelist().indexOf(tempSlotBody.contentType) < 0) {
        throw new Error("File type not supported: " + mimeType + "(" + file.name + ")");
    }

    //const key = S4();
    // get a temporary slot from S3 to upload the file
    const temporarySlot = this.http.put(serviceUrls$1.temporaryAttachmentUrl(),  tempSlotBody  )
                                   .then(res => res.data)
                                   .catch(tryCastToApiError);
    
    // upload the file to the temporary slot on S3    
    apiConfig.headers['Content-Type' ] = temporarySlot.contentType;
    //apiConfig.headers['Authorization'] = undefined;
    this.http.put(temporarySlot.url, file,  {  ...apiConfig} )
                                         .then(res => res.data)
                                         .catch(tryCastToApiError);

    //persists the file using the KM persists attachments endpoint
    const persistedAttachment =  this.http.post(serviceUrls$1.persistAttachmentUrl(identifier, temporarySlot.uid), fileName,  { params } )
                                          .then(res => res.data)
                                          .catch(tryCastToApiError);
    
    const config = useRuntimeConfig();
    return {
        ...persistedAttachment,
        url     : config.public.API_URL+persistedAttachment.url        
    };
  }

  async upload(identifier, file,  {contentType, headers  }={}) {
        if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
        if(!isValid(file)) throw Error(`invalid value for file`);  

        params = {contentType, identifier, filename } || {};
        params.identifier = identifier;
        params.filename = file.name;

        var contentType = params.contentType || this.getMimeType(file);

        // params.contentType = undefined;
        params.headers = params.header || {};
        params.headers["Content-Type"] = contentType;

        ////TEMP////////////////
            //upload to temp url
            const data = this.http.put(serviceUrls$1.attachmentUrl(identifier, file.name), body=file,  { params } )
                                  .then(res => res.data)
                                  .catch(tryCastToApiError);
            
            const config = useRuntimeConfig();
            data.url = config.public.API_URL+data.url;
            data.urls = {//required by ckeditor
                "default": data.url 
            };
            
            return data;
        ///////TEMP////////////////

      //TODO : use s3
      //1 request for temp file from s3
      //upload file 
      //return s3 location
      //persist temp file location in api
  }
  getMimeType(file) {
    if(!isValid(file)) throw Error(`invalid value for file`);  

    const filename = file.name;
    let  sMimeType = file.type || "application/octet-stream";     

    if (filename && sMimeType == "application/octet-stream") {
        var sExt = "";
        var iIndex = filename.lastIndexOf(".");

        if (iIndex >= 0)
            sExt = filename.substring(iIndex).toLowerCase();

        if (sExt == ".json") sMimeType = "application/json";
        if (sExt == ".geojson") sMimeType = "application/json";
        if (sExt == ".xml") sMimeType = "application/xml";
    }

    return sMimeType;
  }
  
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

class KmStorageApi extends ApiBase 
{
  constructor(options) {
    super(options);
    
    this.documents           = new KmDocumentsApi(options);
    this.documentsVersion    = new KmDocumentsVersionApi(options);
    this.drafts              = new KmDraftsApi(options);
    this.locks               = new KmLocksApi(options);
    this.attachments         = new KmAttachmentsApi(options);    
  }
}

const _hoisted_1$1 = {
  key: 0,
  style: {"border":"1px solid #eee"},
  class: "vld-parent"
};
const _hoisted_2$1 = { style: {"border":"1px solid #eee","border-top":"none"} };
const _hoisted_3$1 = {
  class: "float-end",
  id: "wordCountSec",
  style: {"padding-right":"5px"}
};
const _hoisted_4$1 = {
  key: 1,
  style: {"border":"1px solid #eee","border-top":"none"}
};
const _hoisted_5$1 = {
  class: "alert alert-danger",
  role: "alert"
};

    //   import OverlayLoading from 'vue3-loading-overlay';
    //   import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
    //   import KmSpinner from '../KmSpinner.vue';
    
    
var script$1 = {
  __name: 'ck-editor',
  props: /*#__PURE__*/Vue.mergeModels({     
        tagName  : { type: String, required: false,default: 'div'},     
        uploadUrl: { type: String, required: false},
        config   : { type: Object, required: true},
        identifier: { type: String, required: true}  
    }, {
    "modelValue": {type:String, required:true, default:''},
    "modelModifiers": {},
  }),
  emits: /*#__PURE__*/Vue.mergeModels(['update:modelValue', 'onFileUpload', 'onEditorDestroy'], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
 
    const model    = Vue.useModel(__props, "modelValue");

    const props = __props;    

 
    const emit     = __emit;

    const api          = new KmStorageApi({});
    const ckeditor     = CKEditor__default["default"].component;
    const editor       = ClassicEditor__default["default"];
    const uploadErrors = [];

    const {t, locale }    = useI18n();
    const wordCount       = Vue.ref(0);
    const isUploadingFile = Vue.ref(false);

    const  binding  = Vue.computed({       
        get()      {  return model.value;  },        
        set(value) {  emit('update:modelValue', value);  }
    });      
  
     
    const onEditorReady=(ed)  =>{    
        class UploadAdapter {
          constructor(loader) {
            this.loader = loader;
          }
          upload() {
            const loader = this.loader;
            return this.loader.file.then(function(file){
              
              isUploadingFile.value = true;  
              return api.attachments.uploadTempFile(props.identifier, file, file.name)   
                  .then(function(success) {                 
                      success.urls = { "default": success.url };
                      loader.uploaded = success;
                      return success;
                  })
                  .catch(function(error) {                   
                      uploadErrors.push({file:file.name });  
                      useLogger().error(error);                     
                      throw error;
                  })
                  .finally(()=>{
                      isUploadingFile.value = false;  
                  });
            })
          }
          abort() {
          }
        }
        ed.plugins.get('FileRepository').createUploadAdapter = function(loader){
            const uploadAdapter = new UploadAdapter(loader);
            uploadAdapter.loader.on('change:uploaded' , onEditorImageUploaded);
            return uploadAdapter;
        };
  
        ed.editing.view.document.on('paste', function (eventInfo, data) {
          // console.debug('paste', eventInfo, data)
        });
  
        ed.editing.view.document.on('drop', async function (eventInfo, data) {
          if(data.dataTransfer){
              isUploadingFile.value = true;   
  
              const fileUploads = data.dataTransfer.files.map(function(file, i){
                  const formData = new FormData();
                  const fileType = file.type.substring( 0, 5 );
                  const mimeType = api.attachments.getMimeType(file);   
  
                  if(fileType == "image")
                      return;
                  if (api.attachments.mimeTypeWhitelist().indexOf(mimeType) < 0) {   
                      alert("File type not supported: " + mimeType + "(" + file.name + ")");
                      return;
                  }
  
                  formData.append('file', file);
                  return api.attachments.uploadTempFile(props.identifier, file, file.name)   
                      .then(function(success) {
                          const viewFragment = ed.data.processor.toView('<span class="me-2">&nbsp;<a rel="noopener noreferrer" target="_blank" href="'+success.url+'">'+success.filename+ '</a>&nbsp;</span>' );
                          const modelFragment = ed.data.toModel(viewFragment);
                          ed.model.insertContent( modelFragment);
                          onFileUpload({file:success});   
                      })
                      .catch(e=>{
                          uploadErrors.push({file:file.name });   
                          useLogger().error(e);
                      })
              });
  
              try{
                  await Promise.all(fileUploads);
              }
              catch(e){
                  useLogger().error(e);
                }
              finally{
                  isUploadingFile.value = false;   
                }            }
        });
  
        ed.model.document.on('change:data', function (eventInfo, data) {
          // console.debug('change', eventInfo, data)
        });
  
        function onEditorImageUploaded(eventInfo, name, value, oldValue){
          // console.log((eventInfo, name, value, oldValue))
          //TODO: check why url is not in event args
            if(value.url){
                onFileUpload({file:value});    
            }
        }  
        emit('onEditorReady', ed);      
    };
     
    const onEditorFocus=( event, editor )=> {
        // console.debug( 'Editor focused.', { event, editor } );
        emit('onEditorFocus', event, editor);
    };

    const onEditorBlur=( event, editor ) =>{
        // console.debug( 'Editor blurred.', { event, editor } );
        emit('onEditorBlur', event, editor);
    };

    const onEditorInput=( data, event, editor )=> {       
        emit('onEditorInput', event, editor);     
    };
    
    const  onEditorDestroy=( editor )=> {
        // console.debug( 'Editor destroyed.', { editor } );
        emit('onEditorDestroy', editor);
    };
    
    const onFileUpload=(params)=>{
        emit('onFileUpload', params);
    };

    const editorConfig = Vue.computed(()=>{     
          return {
            ...props.config,  
            language: { ui: locale, content: locale },
            wordCount: {
                onUpdate: function (stats) {
                    wordCount.value = stats.words;
                },
            }
        }          
    });
 
  
  
return (_ctx, _cache) => {
  return (Vue.openBlock(), Vue.createElementBlock("div", null, [
    (editorConfig.value)
      ? (Vue.openBlock(), Vue.createElementBlock("div", _hoisted_1$1, [
          Vue.createCommentVNode(" <overlay-loading :active=\"isUploadingFile\" \r\n          :can-cancel=\"false\" background-color=\"rgb(9 9 9)\"\r\n          :is-full-page=\"false\">\r\n          <km-spinner size=\"lg\" \r\n              :message=\"t('uploadingFile')\"></km-spinner>\r\n      </overlay-loading>\r\n   "),
          Vue.createVNode(Vue.unref(ckeditor), {
            modelValue: binding.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((binding).value = $event)),
            editor: Vue.unref(editor),
            config: editorConfig.value,
            tagName: __props.tagName,
            disabled: _ctx.$attrs.disabled,
            onReady: onEditorReady,
            onFocus: onEditorFocus,
            onBlur: onEditorBlur,
            onInput: onEditorInput,
            onDestroy: onEditorDestroy
          }, null, 8 /* PROPS */, ["modelValue", "editor", "config", "tagName", "disabled"])
        ]))
      : Vue.createCommentVNode("v-if", true),
    Vue.createElementVNode("p", _hoisted_2$1, [
      Vue.createTextVNode(Vue.toDisplayString(Vue.unref(t)('attachmentMessage')) + " ", 1 /* TEXT */),
      Vue.createElementVNode("span", _hoisted_3$1, [
        Vue.createElementVNode("strong", null, Vue.toDisplayString(Vue.unref(t)('wordCount')) + ": " + Vue.toDisplayString(wordCount.value), 1 /* TEXT */)
      ])
    ]),
    (uploadErrors.length)
      ? (Vue.openBlock(), Vue.createElementBlock("p", _hoisted_4$1, [
          Vue.createElementVNode("div", _hoisted_5$1, [
            Vue.createTextVNode(Vue.toDisplayString(Vue.unref(t)('uploadError')) + " ", 1 /* TEXT */),
            Vue.createElementVNode("ul", null, [
              (Vue.openBlock(), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(uploadErrors, (error) => {
                return Vue.createElementVNode("li", { key: error }, Vue.toDisplayString(error.file), 1 /* TEXT */)
              }), 64 /* STABLE_FRAGMENT */))
            ])
          ])
        ]))
      : Vue.createCommentVNode("v-if", true)
  ]))
}
}

};

script$1.__file = "src/components/inputs/ck-editor/ck-editor.vue";

function lstring(ltext, locale) {
  
    if(Number.isInteger(ltext)) //is number to handle generic implementation of NR
      return ltext;
  
    if (!ltext)
      return "";
    if (typeof(ltext) == 'string')
      return ltext;
    let sText="";
    if (!sText && locale)
      sText = ltext[locale];
    if (!sText)
      sText = ltext.en;
    if (!sText) {
      var normalized = normalizeText(ltext);
      if(normalized[locale])
        return normalized[locale];

      for (var key in ltext) {
        sText = ltext[key];
        if (sText)
          break;
      }
    }
    return sText || "";
}


function normalizeText(text) {
  if(!text) return null;

  var entry = { ar: text.ar, en: text.en, es: text.es, fr: text.fr, ru: text.ru, zh: text.zh };

  if(!entry.en) entry.en = entry.fr;
  if(!entry.en) entry.en = entry.es;
  if(!entry.en) entry.en = entry.ru;
  if(!entry.en) entry.en = entry.ar;
  if(!entry.en) entry.en = entry.zh;

  if(!entry.fr) entry.fr = entry.en;
  if(!entry.es) entry.es = entry.en;
  if(!entry.ru) entry.ru = entry.en;
  if(!entry.ar) entry.ar = entry.en;
  if(!entry.zh) entry.zh = entry.en;
  return entry;
}

const allPluginsConfig= {  
     toolbar: {
            items: ['heading', 'fontSize', 'fontColor', '|', 'bold', 'italic', 'link', '|',
            'indent', 'outdent', 'alignment', '|', 'bulletedList', 'numberedList', 'blockQuote', '|',
            'highlight', 'insertTable', '|', 'imageInsert', 'mediaEmbed', '|', 'horizontalLine', '|',
            'removeFormat', 'undo', 'redo', '|', 'pageBreak'],
            shouldNotGroupWhenFull: true
        },
        alignment: { options: ['left', 'right', 'center', 'justify'] },
        fontColor: {
            colors: [
            { color: 'hsl(0, 0%, 0%)', label: 'Black' },
            { color: 'hsl(0, 0%, 30%)', label: 'Dim grey' },
            { color: 'hsl(0, 0%, 60%)', label: 'Grey' },
            { color: 'hsl(0, 0%, 90%)', label: 'Light grey' },
            { color: 'hsl(0, 0%, 100%)', label: 'White', hasBorder: true }
            ],
        },
        list: { properties: { styles: true, startIndex: true, reversed: true } },
        image: {
            styles: ['alignCenter', 'alignLeft', 'alignRight'],
            resizeOptions: [
                            { name: 'imageResize:original', label: 'Original', value: null },
                            { name: 'imageResize:25', label: '25%', value: '25' },
                            { name: 'imageResize:50', label: '50%', value: '50' },
                            { name: 'imageResize:75', label: '75%', value: '75' },
                            ],
            toolbar: ['imageTextAlternative', 'toggleImageCaption', '|',
                    'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText',
                    'imageStyle:side', '|', 'resizeImage'],
            insert: { integrations: ['insertImageViaUrl'] },
        },
        heading: {
            options: [{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                      { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                      { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                      { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }],
        },
        fontSize: {
            options: [8, 10, 12, 14, 'default', 18, 20, 22],
            supportAllValues: true,
        },
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties', 'toggleTableCaption']
        },
        link: {
            addTargetToExternalLinks: false,
            defaultProtocol: 'https://',
            decorators: [
            { mode: 'manual', label: 'Downloadable', attributes: { download: 'download', }, },
            { mode: 'manual', label: 'Open in a new tab', attributes: { target: '_blank', rel: 'noopener noreferrer', }, },
            ],
        },
        mediaEmbed: {
            previewsInData: false,
            removeProviders: ['youtube'],
            extraProviders: [
            {
                name: 'youtubePlaylist',
                url: [/^youtube\.com\/embed\/videoseries\?list=([\w-]+)/],
                html: (match) => {
                const id = match[1];
    
                return (
                    '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' +
                    `<iframe src="https://www.youtube.com/embed/videoseries?list=${id}" ` +
                    'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
                    'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
                    '</iframe>' +
                    '</div>'
                )
                },
            },
            {
                name: 'youtube',
                url: [
                /^(?:m\.)?youtube\.com\/watch\?v=([\w-]+)/,
                /^(?:m\.)?youtube\.com\/v\/([\w-]+)/,
                /^youtube\.com\/embed\/([\w-]+)/,
                /^youtu\.be\/([\w-]+)/,
                ],
                html: (match) => {
                const id = match[1];
    
                return (
                    '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' +
                    `<iframe src="https://www.youtube.com/embed/${id}" ` +
                    'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
                    'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
                    '</iframe>' +
                    '</div>'
                )
                },
            },
            {
                name: 'customEmbed',
                url: [
                /cdn\.knightlab\.com\/libs\/timeline3\/.*/,
                /uploads\.knightlab\.com\/storymapjs\/.*/,
                /cdn\.knightlab\.com\/libs\/juxtapose\/.*/,
                /uploads\.knightlab\.com\/scenevr\/.*/,
                /cdn\.knightlab\.com\/libs\/storyline\/.*/,
                /theydrawit\.mucollective\.co\/vis\/.*/,
                /youtube\.com\/embed\/videoseries.*/,
                ],
                html: function (id) {
                return (
                    '<figure class="media">' + '	<oembed url="' + id.input + '">' +
                    '<a href="' + id.input + '">' + id.input + '</a>' + '	</oembed>' + '</figure>'
                )
                },
            },
            ],
        }      
};

const _hoisted_1 = { class: "scbd-common km-input-rich-lstring" };
const _hoisted_2 = ["id"];
const _hoisted_3 = { class: "nav nav-tabs" };
const _hoisted_4 = ["id"];
const _hoisted_5 = ["onClick"];
const _hoisted_6 = ["aria-labelledby", "id"];
  
  
    
var script = {
  __name: 'km-input-rich-lstring',
  props: /*#__PURE__*/Vue.mergeModels({
        locales:    { type: Array,    required: true  }, 
        disabled:   { type: Boolean,  required: false },
        identifier: { type: String,   required: true  }
    }, {
    "modelValue": { type: Object, required: false, default:{}},
    "modelModifiers": {},
  }),
  emits: /*#__PURE__*/Vue.mergeModels(['update:modelValue', 'onFileUpload', 'onLanguageFocus'], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {

    const model = Vue.useModel(__props, "modelValue");
  
    const props = __props;

    const emit = __emit;

    const activeLocale = Vue.ref('');
    const uid = index.makeSmallUid();  

    Vue.watch(props.locales,  (newVal, oldVal) => {
        const deleted = _.without(oldVal, ...newVal);
        if(deleted?.length){      
            deleted.forEach(e=>{
                binding.value[e] = undefined;
            });
            onChange();
        }
        if(!newVal.includes(activeLocale.value)){        
        onTabChange(newVal[0]);
        }
        loadLanguages();
    });     

    const  binding  = Vue.computed(()=>{
        return model.value||{};
    });
     
    const selectedLocale  = Vue.computed(()=>{           
        return activeLocale.value;
    });

    const onChange=(value)=>{
        const clean = removeEmpty({...binding.value}); 
        emit('update:modelValue', clean);
    };

    const onFileUpload=({file})=>{
        emit('onFileUpload', {file, locale : activeLocale.value});
    };

    const loadLanguages=()=>{   
        const thesaurusService  = thesaurus.useThesaurus();
        props.locales?.forEach(e=>{
            thesaurusService.loadDomainTerms (`lang-${e}`);
        });   
    };

    const  getTerm=(term)=>{     
        const thesaurusService  = thesaurus.useThesaurus();
        return thesaurusService.getDomainTerms(`lang-${term}`)||{};
    };

    const  onTabChange=(locale)=>{
        activeLocale.value = locale;
        emit('onLanguageFocus', locale);
   }; 

    Vue.onMounted(() => {
        activeLocale.value =props.locales[0];        
        if(model.value){
            binding.value = {...model.value||{}};
        }
        loadLanguages();
    }); 

return (_ctx, _cache) => {
  return (Vue.openBlock(), Vue.createElementBlock("div", _hoisted_1, [
    Vue.createElementVNode("div", {
      id: `km-rich-lstring-${Vue.unref(uid)}`
    }, [
      Vue.createElementVNode("ul", _hoisted_3, [
        (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(props.locales, (locale) => {
          return (Vue.openBlock(), Vue.createElementBlock("li", {
            class: "nav-item",
            key: locale,
            id: `lstringTab-${Vue.unref(uid)}`
          }, [
            Vue.createElementVNode("a", {
              class: Vue.normalizeClass(["nav-link", {'active': selectedLocale.value === locale}]),
              "aria-current": "page",
              href: "javascript:void(0);",
              onClick: $event => (onTabChange(locale))
            }, Vue.toDisplayString(Vue.unref(lstring)(getTerm(locale).title||locale)), 11 /* TEXT, CLASS, PROPS */, _hoisted_5)
          ], 8 /* PROPS */, _hoisted_4))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(__props.locales, (locale) => {
        return (Vue.openBlock(), Vue.createElementBlock("div", {
          class: Vue.normalizeClass(["mt-2", {'d-none': selectedLocale.value != locale}]),
          "aria-labelledby": `tabContent-${locale}-${Vue.unref(uid)}`,
          key: locale,
          id: `lstringTabContent-${Vue.unref(uid)}`
        }, [
          (selectedLocale.value==locale)
            ? (Vue.openBlock(), Vue.createBlock(script$1, {
                key: 0,
                modelValue: binding.value[selectedLocale.value],
                "onUpdate:modelValue": [
                  _cache[0] || (_cache[0] = $event => ((binding.value[selectedLocale.value]) = $event)),
                  onChange
                ],
                identifier: __props.identifier,
                locale: selectedLocale.value,
                config: Vue.unref(allPluginsConfig),
                onOnFileUpload: onFileUpload
              }, null, 8 /* PROPS */, ["modelValue", "identifier", "locale", "config"]))
            : Vue.createCommentVNode("v-if", true)
        ], 10 /* CLASS, PROPS */, _hoisted_6))
      }), 128 /* KEYED_FRAGMENT */))
    ], 8 /* PROPS */, _hoisted_2)
  ]))
}
}

};

script.__file = "src/components/controls/km/km-input-rich-lstring.vue";

module.exports = script;
//# sourceMappingURL=km-input-rich-lstring.cjs.map
