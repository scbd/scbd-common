
import ApiBase, { tryCastToApiError ,toUrlParam} from './api-base';

export default class ThesaurusAPI extends ApiBase
{
  
  constructor(options) {
    super(options);
  }

  async getDomains(domainIdentifier, {q, f, s, sk, l , c, fo, ag })  {
    const params= {
      q:  toUrlParam(q),
      f:  toUrlParam(f),
      s:  toUrlParam(s),
      sk: toUrlParam(sk),
      l:  toUrlParam(l),
      c:  toUrlParam(c),
      fo: toUrlParam(fo),
      ag: toUrlParam(ag)
    };

    const data  =  await useAPIFetch(`/api/v2013/thesaurus/domains/${encodeURIComponent(domainIdentifier)}`,  { method:'get', params })
                  
    return data;
  }

  async getDomainTerms(termIdentifier)  {
    const data  =  await useAPIFetch(`/api/v2013/thesaurus/domains/${encodeURIComponent(termIdentifier)}/terms`,  { method:'get' })
                  
    return data;
  }

  async getTerm(termIdentifier, {q, f, s, sk, l , c, fo, ag })  {
    const params= {
      q:  toUrlParam(q),
      f:  toUrlParam(f),
      s:  toUrlParam(s),
      sk: toUrlParam(sk),
      l:  toUrlParam(l),
      c:  toUrlParam(c),
      fo: toUrlParam(fo),
      ag: toUrlParam(ag)
    };

    const data  =  await useAPIFetch(`/api/v2013/thesaurus/terms/${encodeURIComponent(termIdentifier)}`,  { method:'get', params })
                  
    return data;
  }
}