import { expect, test } from 'vitest'
import CountriesApi from '../../../src/services/api/countries'


const myAPI = new CountriesApi({});

test('getCountries func: get all countries', () => {  
    return myAPI.getCountries().then(data => {
      expect.soft(data).toEqual( 
        expect.arrayContaining([ 
          expect.objectContaining({ 
            "_id":   expect.any(Number), 
            "code": expect.any(String),
            "treaties":       expect.any(String),
            "name":       expect.any(Object),
            "__v":  expect.any(Number),
            "code2" :expect.any(String),
            "code3" : expect.any(String),
          }) 
        ]) 
      )     
    })
  })