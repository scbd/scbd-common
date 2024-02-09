
import ApiBase, { tryCastToApiError ,toUrlParam, toUrlParams} from './api-base';

export default class ThesaurusAPI extends ApiBase
{
  
  constructor(options) {
    super(options);
  }

  async getDomains()  { 
    return this.http.get(`/api/v2013/thesaurus/domains/`)
      .then(res => res.data)
      .catch(tryCastToApiError);
  }
  
  async getDomain(domainIdentifier, { relations } = {})  { 
    const params= { };

    if([undefined, null].includes(domainIdentifier)) throw Error(`invalid value for domainIdentifier`);
   // if([undefined, null, 'all'].includes(relations)) throw Error(`invalid value for relations`);
    if(relations) params.relations = toUrlParam(relations);
 
    return this.http.get(`/api/v2013/thesaurus/domains/${encodeURIComponent(domainIdentifier)}`, { params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);            

  }

  async getTerms(termIdentifier)  {
    if([undefined, null].includes(termIdentifier)) throw Error("invalid value for termIdentifier");

    return this.http.get(`/api/v2013/thesaurus/domains/${encodeURIComponent(termIdentifier)}/terms`)
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
  
  async getTerm(termIdentifier, { relations } = {})  {
    const params= { };
 
    if([undefined, null].includes(termIdentifier)) throw Error(`invalid value for termIdentifier`);
    //if([undefined, null, 'all'].includes(relations)) throw Error(`invalid value for relations`);    

    if(relations) params.relations = toUrlParam(relations);

    return this.http.get(`/api/v2013/thesaurus/terms/${encodeURIComponent(termIdentifier)}`, { params })
                    .then(res => res.data)
                    .catch(tryCastToApiError); 
  }
 }
