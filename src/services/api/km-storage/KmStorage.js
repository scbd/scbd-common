import ApiBase from '../api-base';
import { KmDocumentsApi, KmDocumentsVersionApi, KmAttachmentsApi } from './KmDocuments'
import { KmDraftsApi, KmLocksApi } from './KmDrafts' 

export default class KmStorageApi extends ApiBase 
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

