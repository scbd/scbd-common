import { expect, test } from 'vitest'
import SolrIndexAPI  from '../../../src/services/api/solr-index'


const myAPI = new  SolrIndexAPI ({});


test('SolrIndex query ',  async  () => {  
  const data = await myAPI.query({q:"schema_s:notification AND realm_ss:CHM", rows:1, start:1});  

  expect.soft(data).toEqual( 
    expect.objectContaining({ 
        "response":           expect.any(Object),
        "nonSupportedParams": expect.any(Array),
    }) 
  );
})