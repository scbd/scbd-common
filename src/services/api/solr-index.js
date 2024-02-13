
import ApiBase, { tryCastToApiError, toUrlParams} from './api-base';

export default class SolrIndexAPI extends ApiBase
{
  constructor(options) {
    super(options);
  }

  async query({fq, q, sort, fl, df='text_EN_txt', start=0, rows=25, wt='json'}={})  {

  const params = toUrlParams( {fq, q, sort, fl, df, start, rows, wt});

  return this.http.get(`/api/v2013/index/select`,  { params })
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