import ApiBase, { tryCastToApiError, isValid, stringifyUrlParams } from '../api-base';

const  serviceUrls = { 
  draftUrl              (identifier           ){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/versions/draft` },
  draftSecurityUrl      (identifier, operation){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/versions/draft/securities/${encodeURIComponent(operation)}` },
  draftLockUrl          (identifier, lockID   ){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/versions/draft/locks/${encodeURIComponent(lockID)}` },
  draftLockListUrl      (identifier           ){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/versions/draft/locks` },
}

const DefaultValues = {
  Realm  : "CHM",
  Accept : "application/json"
}

export class KmDraftsApi extends ApiBase
{
  constructor(options) {

    super(options);
    this.self = this;
    this.config.headers = {
      Realm:   DefaultValues.Realm,
      Accept : DefaultValues.Accept,
    }
  }

  async query({realm, q, s, l, sk }={}){  
    const params = stringifyUrlParams( {    
      $filter:q, 
      $orderby:s,
      $top:l,
      $skip:sk, 
      collection : "mydraft"  
    });

    const Realm = realm ? { Realm : realm } : {};  
    const headers =  { ...Realm }

    const data =  this.http.get(serviceUrls.draftUrl(), { headers, params} )
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

  async put( identifier, body, {realm, schema}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(body)) throw Error(`invalid value for body`);  

    const params = stringifyUrlParams( {schema}); 

    const Realm = realm ? { Realm : realm } : {};  
    const ContentType = { 'Content-Type': 'application/json' };
    const headers =  { ...Realm , ...ContentType}

    return this.http.put(serviceUrls.draftUrl(identifier),  body , { headers, params })
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

    const params = stringifyUrlParams( {schema, metadata }); 

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

    const params = stringifyUrlParams( {metadata}); 
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


export class KmLocksApi extends ApiBase
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
