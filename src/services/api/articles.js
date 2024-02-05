
import ApiBase, { tryCastToApiError, toUrlParam } from './api-base';

export default class ArticlesApi extends ApiBase
{
  constructor(options) {
    super(options);
  }
  
  async queryArticleGroup(groupKey, {q, f, s, sk, l , c, fo, ag })  {
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
     return this.http.get(`api/v2017/articles/grouping/${encodeURIComponent(groupKey)}`, { params })
                     .then(res => res.data)
                     .catch(tryCastToApiError);
   }

  async queryArticles({q, f, s, sk, l , c, fo, ag })  {
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
    return this.http.get(`api/v2017/articles`, { params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async getArticleById(id,)  {
      const params= {
        q: toUrlParam( { _id: mapObjectId(id) })
      };

      return this.http.get(`api/v2017/articles`, { params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);  
  }

  async getArticlesByTag(tag, options={})  {

    const params= {
      q: toUrlParam(tag),
      fo: 1
    };

     return this.queryArticles( { params });
   }

  async getArticleAdminTags({q, f, s, sk, l , c, fo, ag }){    
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

    const tags = await this.http.get(`api/v2021/article-admin-tags`, { params })
                              .then(res => res.data)
                              .catch(tryCastToApiError);

    return tags
  }
}