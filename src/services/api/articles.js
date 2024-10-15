
import ApiBase, { tryCastToApiError, stringifyUrlParam, stringifyUrlParams, isValid, mapObjectId} from './api-base';

export default class ArticlesApi extends ApiBase
{
  constructor(options) {
    super(options);
  }
  
  async getArticleGroup(groupKey, {q, f, s, sk, l , c, fo, ag }={})  {    
    if(!isValid(groupKey)) throw Error(`invalid value for groupKey`); 
    const params = stringifyUrlParams( {q, f, s, sk, l , c, fo, ag });

    return this.http.get(`api/v2017/articles/grouping/${encodeURIComponent(groupKey)}`,  { params } )
                    .then(res => res.json())
                    .catch(tryCastToApiError);
   }

  async getArticles({q, f, s, sk, l , c, fo, ag }={})  {
    const params = stringifyUrlParams( {q, f, s, sk, l , c, fo, ag });

    return this.http.get(`api/v2017/articles`,  { params } )
                    .then(res => res.json())
                    .catch(tryCastToApiError);
  }

  async getArticleById(id )  {
    if(!isValid(id)) throw Error(`invalid value for id`);

    return this.http.get(`api/v2017/articles/${id}`)
                      .then(res => res.json())
                      .catch(tryCastToApiError);  
  }


  async getArticlesByTag(tag, {q, f, s, sk, l , c, fo, ag }={})  {    
    if(!isValid(tag)) throw Error(`invalid value for tag`);

   const params=  stringifyUrlParams({q, f, s, sk, l , c, fo, ag });
   const query = q;   
   
   if (tag){
    params.q = stringifyUrlParam({...query, ...{tags: mapObjectId(tag)}});    
   } 

    return this.http.get(`api/v2017/articles`,  { params })
                    .then(res => res.json())
                    .catch(tryCastToApiError);  
 }

   

  async getArticleAdminTags({q, f, s, sk, l , c, fo, ag }={}){    
    const params = stringifyUrlParams( {q, f, s, sk, l , c, fo, ag });

    return this.http.get(`api/v2021/article-admin-tags`,  { params } )
                    .then(res => res.json())
                    .catch(tryCastToApiError);

  }
 }