import { expect, test } from 'vitest'
import SolrIndexAPI  from '../../../src/services/api/solr-index'


const myAPI = new   SolrIndexAPI ({});


test('query',  async  () => {  
    const data = await myAPI.query();
  
    expect.soft(data).toEqual( 
      expect.arrayContaining([ 
        expect.objectContaining({ 

          }) 
        ]) 
      )    
      
    })