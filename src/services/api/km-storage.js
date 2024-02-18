
import ApiBase, { tryCastToApiError, isValid, toUrlParams } from './api-base';

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
}

const DefaultValues = {
  Realm  : "CHM",
  Accept : "application/json"
}

export default class KmStorageApi extends ApiBase
{
  constructor(options) {
    super(options);
    
    this.documents    = new KmDocumentsApi(options);
    this.drafts       = new KmDraftsApi(options);
    this.locks        = new KmLocksApi(options);
    this.attachments  = new KmAttachmentsApi(options);
  }
}

class KmDocumentsApi extends ApiBase
{
  constructor(options) {
    super(options);
    this.self = this;
    this.config.headers = {
      Realm:   DefaultValues.Realm,
      Accept : DefaultValues.Accept,
    }
  }

  async query( realm=null, {q, s, l, sk }={}){

    const params = toUrlParams( { 
      $filter:q, 
      $orderby:s,
      $skip:sk, 
      $top:l,
      collection : "my"
    });

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm }
    
    return this.http.get(serviceUrls.documentQueryUrl(), { headers, params } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async get(identifier, realm=null ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 
        
    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm }

    return this.http.get(serviceUrls.documentUrl(identifier) ,{ headers } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async exists( identifier, realm=null ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm }

    return this.http.head(serviceUrls.documentUrl(identifier), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

 
 //TODO: confirm interface
 async put( identifier, body, realm=null){
  if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
  if(!isValid(body)) throw Error(`invalid value for body`);  

  //const params = toUrlParams( {schema}); 

  const Realm = realm ? { Realm : realm } : {};  
  const ContentType = { "Content-Type" : "application/json" };
  const headers =  { ...Realm , ...ContentType}

  return this.http.put(serviceUrls.draftUrl(identifier), body , { headers })
                  .then(res => res.data)
                  .catch(tryCastToApiError);
}


  async delete(identifier, realm=null){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm }

    return this.http.delete(serviceUrls.documentUrl(identifier), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

 
  async validate(body, {realm, schema, metadata }={}){
    if(!isValid(body)) throw Error(`invalid value for body`);  

    const params = toUrlParams( { schema, metadata });

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm }
   
    return this.http.put(serviceUrls.validateUrl(), body, { headers, params } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }


   async canCreate(identifier, realm=null, {schema, metadata}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(schema)) throw Error(`invalid value for schema`);  

    const params = toUrlParams({ schema, metadata });

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm }

    return this.http.get(serviceUrls.securityUrl(identifier, 'create'), { headers, params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }


  async canUpdate(identifier, realm=null, {metadata }={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const params = toUrlParams( {metadata });

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm }

    return this.http.get(serviceUrls.securityUrl(identifier, 'update'), { headers, params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
 
 
  async canDelete(identifier, realm=null ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 
    
    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm }
   
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
    }
  }

   async query(realm=null, {q, s, l, sk }={}){  
    const params = toUrlParams( {    
      $filter:q, 
      $orderby:s,
      $top:l,
      $skip:sk, 
      collection : "mydraft"  
    });

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm }

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
    const headers =  { ...Realm }

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
    const headers =  { ...Realm }

     return this.http.head(serviceUrls.draftUrl(identifier), { headers })
                     .then(res => res.data)
                     .catch(tryCastToApiError);
  }

  //TODO: confirm interface
  async put( identifier, body, realm=null){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(body)) throw Error(`invalid value for body`);  

    //const params = toUrlParams( {schema}); 

    const Realm = realm ? { Realm : realm } : {};  
    const ContentType = { "Content-Type" : "application/json" };
    const headers =  { ...Realm , ...ContentType}

    return this.http.put(serviceUrls.draftUrl(identifier),  body , { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }


  async delete(identifier, realm=null){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm }

    return this.http.delete(serviceUrls.draftUrl(identifier), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
  
  async canCreate(identifier, {realm, schema, metadata }={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  


    const params = toUrlParams( {schema, metadata }); 

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm }

    return this.http.get(serviceUrls.draftSecurityUrl(identifier, 'create'), { headers, params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async canUpdate(identifier, {realm, metadata}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm }

    const params = toUrlParams( {metadata}); 
    return this.http.get(serviceUrls.draftSecurityUrl(identifier, 'update'), { headers, params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }


  async canDelete(identifier, realm=null){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm }

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
    }
  }

  async query(identifier, realm=null){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm }
 
    return this.http.get(serviceUrls.draftLockListUrl(identifier), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }


   async get(identifier, lockID, realm=null ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(lockID)) throw Error(`invalid value for lockID`); 


    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm }

    return this.http.get(serviceUrls.draftLockUrl(identifier, lockID), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async exists(identifier,lockID, realm=null){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(lockID)) throw Error(`invalid value for lockID`); 

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm }

    return this.http.head(serviceUrls.draftLockUrl(identifier, lockID), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  
 
  async put(identifier,lockID, body, realm=null){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(lockID)) throw Error(`invalid value for lockID`); 
   
    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm }
    
    return this.http.put(serviceUrls.draftLockUrl(identifier,lockID), body, { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

 
  async delete(identifier,lockID, realm=null ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(lockID)) throw Error(`invalid value for lockID`); 

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm }

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
    }

    //find the content type and validate with whitelist
    if(file instanceof FormData){
        const tempFile = formData.get('file')
        if(tempFile){
            tempSlotBody.contentType = this.getMimeType(file);
        }
    }
    else if(file instanceof File){
        tempSlotBody.contentType = this.getMimeType(file)
    }
    else{
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
    apiConfig.headers['Authorization'] = undefined;
    const temporaryAttachment =  this.http.put(temporarySlot.url, file,  { key, ...apiConfig} )
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

  async upload(identifier, file, contentType=null, { q, f, s, sk, l , c, fo, ag }={}) {
        if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
        if(!isValid(file)) throw Error(`invalid value for file`);  

        params = {q, f, s, sk, l , c, fo, ag } || {};
        params.identifier = identifier;
        params.filename = file.name;

        var contentType = params.contentType || this.getMimeType(file);

        // params.contentType = undefined;
        params.headers = params.header || {};
        params.headers["Content-Type"] = contentType;

        ////TEMP////////////////
            //upload to temp url
            const data = this.http.put(serviceUrls.attachmentUrl(identifier, file.name), body=file,  { headers, params } )
                                  .then(res => res.data)
                                  .catch(tryCastToApiError);
            
            const config = useRuntimeConfig()
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

    const filename = file.name
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