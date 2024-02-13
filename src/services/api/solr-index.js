
import ApiBase, { tryCastToApiError } from './api-base';

export default class SolrIndexAPI extends ApiBase
{
  constructor(options) {
    super(options);
  }

  async query({fieldQueries, query, sort, fields, rowsPerPage})  {
   
    const defaults = {
      searchField : 'text_EN_txt',
      start : 0, rowsPerPage:25
    }
    params = {...defaults, ...{fieldQueries, query, sort, fields, rowsPerPage} };

    var queryListParameters = {
      df    : params.searchField,
      fq    : params.fieldQueries,
      q     : params.query,
      sort  : this.localizeFields(params.sort),
      fl    : this.localizeFields(params.fields),
      wt    : 'json',
      start : params.start,
      rows  : params.rowsPerPage,
      // 'debug.explain.structured':true,
      // "debugQuery":"on"
  };

  return this.http.get(`/api/v2013/index/select`, toUrlParams(queryListParameters))
                  .then(res => res.data)
                  .catch(tryCastToApiError);

  }

  localizeFields(fields, locale){
      if(!fields)
          return;
          
      if(locale && locale!='en'){
          return fields.replace(/_EN/ig, '_'+(locale||'en').toUpperCase())
      }

      return fields;
  }

}