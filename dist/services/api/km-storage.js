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
  documentQueryUrl      (){ return "/api/v2013/documents/" },
  documentUrl           (identifier){ return `/api/v2013/documents/${encodeURIComponent(identifier)}` },
  validateUrl           (){ return "/api/v2013/documents/x/validate" },
  draftUrl              (identifier){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/versions/draft` },
  attachmentUrl         (identifier, filename) { return `/api/v2013/documents/${encodeURIComponent(identifier)}/attachments/${encodeURIComponent(filename)}` },
  temporaryAttachmentUrl(                    ) { return `/api/v2015/temporary-files` },
  persistAttachmentUrl  (identifier, guid    ) { return `/api/v2013/documents/${encodeURIComponent(identifier)}/attachments/persist-temporary/${encodeURIComponent(guid)}` },
  securityUrl           (identifier, operation){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/securities/${encodeURIComponent(operation)}` },
  draftSecurityUrl      (identifier, operation){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/versions/draft/securities/${encodeURIComponent(operation)}` },
  draftLockUrl          (identifier, lockID)   { return `/api/v2013/documents/${encodeURIComponent(identifier)}/versions/draft/locks/${encodeURIComponent(lockID)}` },
  draftLockListUrl      (identifier)           { return `/api/v2013/documents/${encodeURIComponent(identifier)}/versions/draft/locks` },
  documentVersionUrl    (identifier)           { return `/api/v2013/documents/${encodeURIComponent(identifier)}/versions` },
};

class KmStorageApi extends ApiBase
{
  constructor({ realm, ...options }) {
    super(options);
    this.documents    = new KmDocumentsApi(options);
    this.drafts       = new KmDraftsApi(options);
    this.locks        = new KmLocksApi(options);
    this.attachments  = new KmAttachmentsApi(options);
  }
}

class KmDocumentsApi extends ApiBase
{
  #realm;

  constructor({ realm, ...options}) {

    this.#realm = realm;

    super(options);
    this.self = this;
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
    
    return this.http.get(serviceUrls.documentQueryUrl(), { headers, params } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async get(identifier, { realm=null}  ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 
        
    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm };

    return this.http.get(serviceUrls.documentUrl(identifier) ,{ headers } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async exists( identifier, realm=null ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm };

    return this.http.head(serviceUrls.documentUrl(identifier), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

 
 //TODO: confirm interface
 async put( identifier, body, realm=null){
  if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
  if(!isValid(body)) throw Error(`invalid value for body`);  

  //const params = stringifyUrlParams( {schema}); 

  const Realm = realm ? { Realm : realm } : {};  
  const ContentType = { 'Content-Type': 'application/json', };
  const headers =  { ...Realm , ...ContentType};
  
  return this.http.put(serviceUrls.draftUrl(identifier), body , { headers })
                  .then(res => res.data)
                  .catch(tryCastToApiError);
}


  async delete(identifier, realm=null){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm };

    return this.http.delete(serviceUrls.documentUrl(identifier), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

 
  async validate(body, {realm, schema, metadata }={}){
    if(!isValid(body)) throw Error(`invalid value for body`);  

    const params = stringifyUrlParams( { schema, metadata });

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm };
   
    return this.http.put(serviceUrls.validateUrl(), body, { headers, params } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }


   async canCreate(identifier, {realm=null, schema, metadata}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(schema)) throw Error(`invalid value for schema`);  

    const params = stringifyUrlParams({ schema, metadata });

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm };

    return this.http.get(serviceUrls.securityUrl(identifier, 'create'), { headers, params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }


  async canUpdate(identifier,  {realm=null, metadata }={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const params = stringifyUrlParams( {metadata });

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm };

    return this.http.get(serviceUrls.securityUrl(identifier, 'update'), { headers, params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
 
 
  async canDelete(identifier, realm=null ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 
    
    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm };
   
    return this.http.get(serviceUrls.securityUrl(identifier, 'delete'), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
}

class KmDraftsApi extends ApiBase
{
  constructor(options) {

    super(options);
    this.self = this;
    this.config.headers = {
      Realm:   DefaultValues.Realm,
      Accept : DefaultValues.Accept,
    };
  }

   async query({realm=null, q, s, l, sk }={}){  
    const params = stringifyUrlParams( {    
      $filter:q, 
      $orderby:s,
      $top:l,
      $skip:sk, 
      collection : "mydraft"  
    });

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm };

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

  async get(identifier,realm=null  ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    
    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm };

    const data =  this.http.get(serviceUrls.draftUrl(identifier), { headers })
                           .then(res => res.data)
                           .catch(tryCastToApiError);
    
    if(data.workingDocumentBody){
        data.body = data.workingDocumentBody;
    }

    return data;
  }


  async exists( identifier, realm=null){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm };

     return this.http.head(serviceUrls.draftUrl(identifier), { headers })
                     .then(res => res.data)
                     .catch(tryCastToApiError);
  }

  //TODO: confirm interface
  async put( identifier, body, realm=null){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(body)) throw Error(`invalid value for body`);  

    //const params = stringifyUrlParams( {schema}); 

    const Realm = realm ? { Realm : realm } : {};  
    const ContentType = { "Content-Type" : "application/json" };
    const headers =  { ...Realm , ...ContentType};

    return this.http.put(serviceUrls.draftUrl(identifier),  body , { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }


  async delete(identifier, realm=null){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm };

    return this.http.delete(serviceUrls.draftUrl(identifier), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
  
  async canCreate(identifier, {realm, schema, metadata }={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  


    const params = stringifyUrlParams( {schema, metadata }); 

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm };

    return this.http.get(serviceUrls.draftSecurityUrl(identifier, 'create'), { headers, params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async canUpdate(identifier, {realm, metadata}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm };

    const params = stringifyUrlParams( {metadata}); 
    return this.http.get(serviceUrls.draftSecurityUrl(identifier, 'update'), { headers, params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }


  async canDelete(identifier, realm=null){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm };

    return this.http.get(serviceUrls.draftSecurityUrl(identifier, 'delete'), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
}

class KmLocksApi extends ApiBase
{
  constructor(options) {
    super(options);
    this.config.headers = {
      Realm:   DefaultValues.Realm,
      Accept : DefaultValues.Accept,
    };
  }

  async query(identifier, realm=null){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm };
 
    return this.http.get(serviceUrls.draftLockListUrl(identifier), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }


   async get(identifier, lockID, realm=null ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(lockID)) throw Error(`invalid value for lockID`); 


    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm };

    return this.http.get(serviceUrls.draftLockUrl(identifier, lockID), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async exists(identifier,lockID, realm=null){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(lockID)) throw Error(`invalid value for lockID`); 

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm };

    return this.http.head(serviceUrls.draftLockUrl(identifier, lockID), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  
 
  async put(identifier,lockID, body, realm=null){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(lockID)) throw Error(`invalid value for lockID`); 
   
    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm };
    
    return this.http.put(serviceUrls.draftLockUrl(identifier,lockID), body, { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

 
  async delete(identifier,lockID, realm=null ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(lockID)) throw Error(`invalid value for lockID`); 

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm };

    return this.http.delete(serviceUrls.draftLockUrl(identifier,lockID), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
}

class KmAttachmentsApi extends ApiBase
{
  constructor(options) {
    super(options);
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
    const temporarySlot = this.http.put(serviceUrls.temporaryAttachmentUrl(),  tempSlotBody  )
                                   .then(res => res.data)
                                   .catch(tryCastToApiError);
    
    // upload the file to the temporary slot on S3    
    apiConfig.headers['Content-Type' ] = temporarySlot.contentType;
    //apiConfig.headers['Authorization'] = undefined;
    this.http.put(temporarySlot.url, file,  {  ...apiConfig} )
                                         .then(res => res.data)
                                         .catch(tryCastToApiError);

    //persists the file using the KM persists attachments endpoint
    const persistedAttachment =  this.http.post(serviceUrls.persistAttachmentUrl(identifier, temporarySlot.uid), fileName,  { params } )
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
            const data = this.http.put(serviceUrls.attachmentUrl(identifier, file.name), body=file,  { params } )
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
    const sMimeType = file.type || "application/octet-stream";     

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

  mimeTypeWhitelist(){
    return [
      "application/json","application/ogg","application/pdf","application/xml","application/zip",
      "application/x-zip","application/x-zip-compressed","audio/mpeg","audio/x-ms-wma","audio/x-wav",
      "image/gif","image/jpeg", "image/png","image/bmp",
      "image/tiff",
      "text/csv","text/html","text/plain","text/xml","video/mpeg","video/mp4","video/quicktime",
      "video/x-ms-wmv","video/x-msvideo","video/x-flv","application/vnd.oasis.opendocument.text",
      "application/vnd.oasis.opendocument.spreadsheet","application/vnd.oasis.opendocument.presentation","application/vnd.oasis.opendocument.graphics",
      "application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.ms-powerpoint","application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
  }
}

export { KmStorageApi as default };
//# sourceMappingURL=km-storage.js.map
