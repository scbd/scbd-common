
import ApiBase, { tryCastToApiError, toUrlParam, toUrlParams, isValid, mapObjectId} from './api-base';

export default class ArticlesApi extends ApiBase
{
  constructor(options) {
    super(options);
  }
  
  async getArticleGroup(groupKey, {q, f, s, sk, l , c, fo, ag }={})  {    
    if(!isValid(groupKey)) throw Error(`invalid value for groupKey`); 
    const params = toUrlParams( {q, f, s, sk, l , c, fo, ag });

    return this.http.get(`api/v2017/articles/grouping/${encodeURIComponent(groupKey)}`,  { params } )
                     .then(res => res.data)
                     .catch(tryCastToApiError);
   }

  async getArticles({q, f, s, sk, l , c, fo, ag }={})  {
    const params = toUrlParams( {q, f, s, sk, l , c, fo, ag });

    return this.http.get(`api/v2017/articles`,  { params } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async getArticleById(id,{q, f, s, sk, l , c, fo, ag }={} )  { 
    
      if(!isValid(id)) throw Error(`invalid value for id`);

      const params=  toUrlParams({q, f, s, sk, l , c, fo, ag });
      if(id) params.id = toUrlParam({_id: mapObjectId(id)});



      return this.http.get(`api/v2017/articles`,  { params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);  
  }

  //TODO:need to test  
  async getArticlesByTag(tag,{q, f, s, sk, l , c, fo, ag }={})  {
    if(!isValid(tag)) throw Error(`invalid value for tag`);

    const params=  toUrlParams({q, f, s, sk, l , c, fo, ag });
    if(tag) params.tags = toUrlParam({tags: tag}); 

     return this.getArticles(  { params } ); 
   }

  async getArticleAdminTags({q, f, s, sk, l , c, fo, ag }={}){    
    const params = toUrlParams( {q, f, s, sk, l , c, fo, ag });

    const tags = await this.http.get(`api/v2021/article-admin-tags`,  { params } )
                                .then(res => res.data)
                                .catch(tryCastToApiError);

    return tags
  }
 }