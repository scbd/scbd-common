
import ApiBase, { tryCastToApiError , toUrlParam, toUrlParams, isValid} from './api-base';

export default class CountriesApi extends ApiBase
{
  constructor(options) {
    super(options);
  }

  async getCountries({q, f, s, sk, l , c, fo, ag }={})  {
    const params = toUrlParams( {q, f, s, sk, l , c, fo, ag });    

    return this.http.get(`/api/v2013/countries`,  { params } )
                    .then(res => { return res.data })
                    .catch(tryCastToApiError);
  }

  async getCountry(code)  {
    if(!isValid(code)) throw Error(`invalid value for code`); 

    return this.http.get(`/api/v2013/countries/${encodeURIComponent(code)}`)
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

}