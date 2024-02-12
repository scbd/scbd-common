
import ApiBase, { tryCastToApiError, toUrlParam, toUrlParams, isValid} from './api-base';

export default class ArticlesApi extends ApiBase
{
  constructor(options) {
    super(options);
  }
  
  async queryArticleGroup(groupKey, {q, f, s, sk, l , c, fo, ag })  {    
    if(!isValid(groupKey)) throw Error(`invalid value for groupKey`); 
    const params = toUrlParams( {q, f, s, sk, l , c, fo, ag });

    return this.http.get(`api/v2017/articles/grouping/${encodeURIComponent(groupKey)}`, { params })
                     .then(res => res.data)
                     .catch(tryCastToApiError);
   }

  async queryArticles({q, f, s, sk, l , c, fo, ag })  {
    const params = toUrlParams( {q, f, s, sk, l , c, fo, ag });

    return this.http.get(`api/v2017/articles`, { params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async getArticleById(id)  {
      if(!isValid(id)) throw Error(`invalid value for id`);
      const params= {
        q: toUrlParam( { _id: mapObjectId(id) })
      };

      return this.http.get(`api/v2017/articles`, { params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);  
  }

  async getArticlesByTag(tag, options={})  {
    if(!isValid(tag)) throw Error(`invalid value for tag`);

      
    const params= {
      q: toUrlParam(tag),
      fo: 1
    };

     return this.queryArticles( { params });
   }

  async getArticleAdminTags({q, f, s, sk, l , c, fo, ag }){    
    const params = toUrlParams( {q, f, s, sk, l , c, fo, ag });

    const tags = await this.http.get(`api/v2021/article-admin-tags`, { params })
                                .then(res => res.data)
                                .catch(tryCastToApiError);

    return tags
  }
}