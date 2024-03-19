import ApiBase, { tryCastToApiError, isValid, stringifyUrlParams } from '../api-base';

const  serviceUrls = { 
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
}


export class KmDocumentsApi extends ApiBase
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
    
    return this.http.get(serviceUrls.documentQueryUrl(), { headers, params } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async get(identifier, {realm}={} ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 
        
    const headers =  { Realm : realm || this.#realm || undefined };

    return this.http.get(serviceUrls.documentUrl(identifier) ,{ headers } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }


  async getInfo(identifier, {realm}={} ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 
        
    const headers =  { Realm : realm || this.#realm || undefined };

    return this.http.get(serviceUrls.documentInfoUrl(identifier) ,{ headers } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async exists( identifier, {realm}={} ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 

    const headers =  { Realm : realm || this.#realm || undefined };

    return this.http.head(serviceUrls.documentUrl(identifier), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async put( identifier, body, {realm}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(body)) throw Error(`invalid value for body`);  
  
    const Realm =  { Realm : realm || this.#realm || undefined };  
    const ContentType = { 'Content-Type': 'application/json' };
    const headers =  { ...Realm , ...ContentType}
    
    return this.http.put(serviceUrls.documentUrl(identifier), body , { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async delete(identifier, {realm}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const headers =  { Realm : realm || this.#realm || undefined };  

    return this.http.delete(serviceUrls.documentUrl(identifier), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
   
  async validate(body, {realm, schema, metadata }={}){
    if(!isValid(body)) throw Error(`invalid value for body`);  

    const params = stringifyUrlParams( { schema, metadata });

    const headers =  { Realm : realm || this.#realm || undefined };  
   
    return this.http.put(serviceUrls.validateUrl(), body, { headers, params } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async canCreate(identifier, {realm, schema, metadata}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(schema)) throw Error(`invalid value for schema`);  

    const params = stringifyUrlParams({ schema, metadata });

    const headers =  { Realm : realm || this.#realm || undefined };  

    return this.http.get(serviceUrls.securityUrl(identifier, 'create'), { headers, params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async canUpdate(identifier,  {realm, metadata }={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const params = stringifyUrlParams( {metadata });

    const headers =  { Realm : realm || this.#realm || undefined };  

    return this.http.get(serviceUrls.securityUrl(identifier, 'update'), { headers, params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  } 
 
  async canDelete(identifier, {realm}={} ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 
    
    const headers =  { Realm : realm || this.#realm || undefined };  
   
    return this.http.get(serviceUrls.securityUrl(identifier, 'delete'), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
}

export class KmDocumentsVersionApi extends ApiBase
{
  #realm;
  constructor(options) {    
    super(options);
    this.self = this;
    this.#realm = options.realm;
  }
  

  async query(identifier, {realm}={}){

    const headers =  { Realm : realm || this.#realm || undefined };  
    
    return this.http.get(serviceUrls. documentVersionListUrl(identifier) , { headers, params } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async get(identifier, {realm}={} ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 
        
    const headers =  { Realm : realm || this.#realm || undefined };  

    return this.http.get(serviceUrls.documentVersionUrl(identifier) ,{ headers } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }


  async getInfo(identifier, {realm}={} ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 
        
    const headers =  { Realm : realm || this.#realm || undefined };  

    return this.http.get(serviceUrls.documentVersionInfoUrl(identifier) ,{ headers } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async exists( identifier, {realm}={} ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 

    const headers =  { Realm : realm || this.#realm || undefined };  

    return this.http.head(serviceUrls.documentVersionUrl(identifier), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

}

export class KmAttachmentsApi extends ApiBase
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
    //apiConfig.headers['Authorization'] = undefined;
    const temporaryAttachment =  this.http.put(temporarySlot.url, file,  {  ...apiConfig} )
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
  
}

export const mimeTypeWhitelist =
   [
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
