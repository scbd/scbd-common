
import ApiBase, { tryCastToApiError, stringifyUrlParams } from './api-base';

export default class RealmConfigurationAPI extends ApiBase
{
  constructor(options) {
    super(options);
  }

  async queryRealmConfigurations({q, f, s, sk, l , c, fo, ag }={})  { 
    const params = stringifyUrlParams( {q, f, s, sk, l , c, fo, ag });

    return this.http.get(`/api/v2018/realm-configurations`,  { params } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async getRealmConfigurationByHost({host})  {
    if(!host){
      host = window.location.host || useRuntimeConfig().public.REALM_CONF_HOST
    }

    return this.http.get(`/api/v2018/realm-configurations/${encodeURIComponent(host)||''}`)
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

}