import { expect, test } from 'vitest'
import RealmConfigurationAPI from '../../../src/services/api/realm-configuration'


const myAPI = new  RealmConfigurationAPI({});



test('queryRealmConfigurations',  async  () => {  
  const data = await myAPI.queryRealmConfigurations();

  expect.soft(data).toEqual( 
    expect.arrayContaining([ 
      expect.objectContaining({ 
        "_id":                         expect.any(String), 
        "hosts":                       expect.any(Array),
        "protocol":                    expect.any(String), 
        "protocolShortName":           expect.any(String), 
        "uIdPrefix":                   expect.any(String), 
        "realm":                       expect.any(String), 
        "displayName":                 expect.any(String), 
        "email":                       expect.any(String), 
        "adminRoles":                  expect.any(Array),
        "nfpRoles":                    expect.any(Array),
        "notificationTemplateFolder":  expect.any(String), 
        "baseURL":                     expect.any(String), 
        "roles":                       expect.any(Object),
        "schemas":                     expect.any(Object),
        "pdf":                         expect.any(Object),
        "externalNotification":        expect.any(Object),
      }) 
    ]) 
  )  
})



  
test('getRealmConfigurationByHost',  async  () => {  
  const data = await myAPI.getRealmConfigurationByHost("bch.cbd.int");

  expect.soft(data).toEqual( 
    expect.arrayContaining([ 
      expect.objectContaining({ 
        "_id":                         expect.any(String), 
        "hosts":                       expect.any(Array),
        "protocol":                    expect.any(String), 
        "protocolShortName":           expect.any(String), 
        "uIdPrefix":                   expect.any(String), 
        "realm":                       expect.any(String), 
        "displayName":                 expect.any(String), 
        "email":                       expect.any(String), 
        "adminRoles":                  expect.any(Array),
        "nfpRoles":                    expect.any(Array),
        "notificationTemplateFolder":  expect.any(String), 
        "baseURL":                     expect.any(String), 
        "roles":                       expect.any(Object),
        "schemas":                     expect.any(Object),
        "pdf":                         expect.any(Object),
        "externalNotification":        expect.any(Object),
      }) 
    ]) 
  )   
})


  








  // async getRealmConfigurationByHost(host)  {
  //   if(!host){
  //     host = window.location.host || useRuntimeConfig().public.REALM_CONF_HOST
  //   }

  //   return this.http.get(`/api/v2018/realm-configurations/${encodeURIComponent(host)||''}`)
  //                   .then(res => res.data)
  //                   .catch(tryCastToApiError);
  // }

