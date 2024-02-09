
import ApiBase, { tryCastToApiError ,toUrlParam, toUrlParams, isValid} from './api-base';

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
  
  async getDomain(identifier, { relations } = {})  { 
    const params= { };
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);
    if(relations) params.relations = toUrlParam(relations);
 
    return this.http.get(`/api/v2013/thesaurus/domains/${encodeURIComponent(identifier)}`, { params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);   
  }

  async getDomainTerms(identifier, { relations } = {})  {
    const params= { };
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);
    if(relations) params.relations = toUrlParam(relations);

    return this.http.get(`/api/v2013/thesaurus/domains/${encodeURIComponent(identifier)}/terms`, { params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
  
  async getTerm(identifier, { relations } = {})  {
    const params= { }; 
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(relations) params.relations = toUrlParam(relations);

    return this.http.get(`/api/v2013/thesaurus/terms/${encodeURIComponent(identifier)}`, { params })
                    .then(res => res.data)
                    .catch(tryCastToApiError); 
  }
 }
