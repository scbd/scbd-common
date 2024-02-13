import { expect, test } from 'vitest'
import KmWorkflowsApi from '../../../src/services/api/KmWorkflowsApi'

const myAPI = new KmWorkflowsApi({});


test('getWorkflowHistory',  async  () => {  
    const data = await myAPI.getWorkflowHistory();
  
    expect.soft(data).toEqual( 
      expect.arrayContaining([ 
        expect.objectContaining({ 
          "__v":      expect.any(Number),
          "_id":      expect.any(String), 
          "code":     expect.any(String),
          "code2":    expect.any(String),
          "code3":    expect.any(String),
          "name":     expect.any(Object),  
          "treaties": expect.any(Object),
          }) 
        ]) 
      ) 
    })



    // async getWorkflowHistory({q, f, s, sk, l , c, fo, ag })  {
    //     const params = toUrlParams( {q, f, s, sk, l , c, fo, ag });

    //     return this.http.get(`/api/v2013/workflows`,{ params })
    //                     .then(res => res.data)
    //                     .catch(tryCastToApiError);
    // }