import { expect, test } from 'vitest'
import CountriesApi from '../../../src/services/api/countries'

const myAPI = new CountriesApi({});

test('getCountries func: get all countries when set params list as empty',  async  () => {  
  const data = await myAPI.getCountries();

  expect.soft(data).toEqual( 
    expect.arrayContaining([ 
      expect.objectContaining({ 
       // "__v":      expect.any(Number),
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


test('getCountries func:  q  ', async  () => {  
  const data = await myAPI.getCountries({q:{code:"CA"} })

  expect.soft(data).toEqual( 
    expect.arrayContaining([ 
      expect.objectContaining({ 
       // "__v":      expect.any(Number),
        "_id":      expect.any(String), 
        "code":     expect.stringContaining("CA"),
        "code2":    expect.any(String),
        "code3":    expect.any(String),
        "name":     expect.any(Object),  
        "treaties": expect.any(Object),
      }) 
    ]) 
  );
  
  expect.soft(data).toHaveLength(1);
})



test('getCountries func:  get specfic field  ', async  () => {  
  const data = await myAPI.getCountries({f:{code:1} })

  expect.soft(data).toEqual( 
    expect.arrayContaining([ 
      expect.objectContaining({     
        "_id":      expect.any(String), 
        "code":     expect.any(String),
      }) 
    ]) 
  );    
})


test('getCountries func: specfic field/limit records  ', async () => {  
  const data = await myAPI.getCountries({f:{code:1} ,l:3 });

  expect.soft(data).toEqual( 
    expect.arrayContaining([ 
      expect.objectContaining({     
        "_id":      expect.any(String), 
        "code":     expect.any(String),
      }) 
    ]) 
  ); 

  expect.soft(data).toHaveLength(3);
})


test('getCountries func: query one country with specific field  ', async  () => {  
  const data = await myAPI.getCountries({q:{code:"AD"}, f:{code:1},fo:1 });

  expect.soft(data).toEqual(   
      expect.objectContaining({    
        "_id":      expect.any(String), 
        "code":     expect.stringContaining("AD")   
      })      
  );
})

test('getCountr func: get one country-ad', async  () => {  
  const data = await myAPI.getCountry("AD");

  expect.soft(data).toEqual(        
      expect.objectContaining({ 
       // "__v":      expect.any(Number),
        "_id":      expect.any(String), 
        "code":     expect.stringContaining("AD"),
        "code2":    expect.any(String),
        "code3":    expect.any(String),
        "name":     expect.any(Object),  
        "treaties": expect.any(Object),   
      }) 
  );   
})