import { expect, test } from 'vitest'
import   KmStorageApi  from '../../../src/services/api/km-storage'

const dotenv = require('dotenv');
dotenv.config();

const myAPI = new  KmStorageApi ({tokentype:"Bearer", token: process.env.MyToken});

// parmas doesn't working
test('query',  async  () => {  
    const data = await myAPI.documents.query();
    expect.soft(data).toEqual(
        expect.objectContaining({       
          "Items":  expect.any(Array),     
          "Count":   expect.any(Number),
        })
    ) 
})


test('get',  async  () => {  
    const data = await myAPI.documents.get("C44FCD4E-548C-EB88-77F7-CB3E1C7CC737");  

    expect.soft(data).toEqual(
        expect.objectContaining({       
            "header":               expect.any(Object),     
            "title":                expect.any(Object),   
            "authors":              expect.any(Object),     
            "publisher":            expect.any(Object),  
            "source":               expect.any(Object),     
            "publicationDate":      expect.any(String),  
            "rights":               expect.any(Object),     
            "resourceLinks":        expect.any(Array),  
            "summary":              expect.any(Object),  
            "countryRegions":       expect.any(Array),     
            "nagoya":               expect.any(Object),  
            "relevantInformation":  expect.any(Object),     
            "notes":                expect.any(String),  
            "libraries":            expect.any(Array), 
        })
    ) 
})


test('exists',  async  () => {  
    const data = await myAPI.documents.exists("C44FCD4E-548C-EB88-77F7-CB3E1C7CC737");  
    expect.soft(data).toEqual(
        expect.objectContaining({     

        })
    ) 
})


// test('put',  async  () => {  
//     const data = await myAPI.put("identifier", "body");  

//     expect.soft(data).toEqual(
//         expect.objectContaining({       

//         })
//     ) 
// })


// test('delete',  async  () => {  
//     const data = await myAPI.delete("identifier");  

//     expect.soft(data).toEqual(
//         expect.objectContaining({       

//         })
//     ) 
// })


// test('validate',  async  () => {  
//     const data = await myAPI.validate("body");  

//     expect.soft(data).toEqual(
//         expect.objectContaining({       

//         })
//     ) 
// })


// test('canCreate',  async  () => {  
//     const data = await myAPI.canCreate("identifier");  

//     expect.soft(data).toEqual(
//         expect.objectContaining({       

//         })
//     ) 
// })


// test('canCreate',  async  () => {  
//     const data = await myAPI.canCreate("identifier");  

//     expect.soft(data).toEqual(
//         expect.objectContaining({       

//         })
//     ) 
// })


// test('canUpdate',  async  () => {  
//     const data = await myAPI.canUpdate("identifier");  

//     expect.soft(data).toEqual(
//         expect.objectContaining({       

//         })
//     ) 
// })


// test('canDelete',  async  () => {  
//     const data = await myAPI.canDelete("identifier");  

//     expect.soft(data).toEqual(
//         expect.objectContaining({       

//         })
//     ) 
// })













  
  
