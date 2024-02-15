import { expect, test } from 'vitest'
import   KmStorageApi  from '../../../src/services/api/km-storage'

const dotenv = require('dotenv');
dotenv.config();

const myAPI = new  KmStorageApi ({tokentype:"Bearer",   token: process.env.MyToken});



test('query',  async  () => {  
    console.log(process.env.Mytoken);
    const data = await myAPI.drafts.query();
    expect.soft(data).toEqual(
        expect.objectContaining({       
          "Items":  expect.any(Array),     
          "Count":   expect.any(Number),
        })
    ) 
})


test('get',  async  () => {  
    const data = await myAPI.drafts.get("57869e05-7dc3-4c86-b9c5-c35dc52643e7");  

    expect.soft(data).toEqual(
        expect.objectContaining({       
            "government":  expect.any(Object),     
            "isForCommercialUse": expect.any(Boolean),
            "forwardToOECD": expect.any(Boolean),
            "isForFoodSafety": expect.any(Boolean),
            "codexConducted": expect.any(Boolean),
            "forwardToFAO": expect.any(Boolean),
            "header":  expect.any(Object)  
        })
    ) 
})


//test('exists',  async  () => {  
    const data = await myAPI.drafts.exists("57869e05-7dc3-4c86-b9c5-c35dc52643e7");  

    // expect.soft(data).toEqual(

    // ) 
//})


// test('put',  async  () => {  
//     const data = await myAPI.drafts.put("identifier", "body");  

//     expect.soft(data).toEqual(
//         expect.objectContaining({       

//         })
//     ) 
// })


// test('delete',  async  () => {  
//     const data = await myAPI.drafts.delete("identifier");  

//     expect.soft(data).toEqual(
//         expect.objectContaining({       

//         })
//     ) 
// })


// test('validate',  async  () => {  
//     const data = await myAPI.drafts.validate("body");  

//     expect.soft(data).toEqual(
//         expect.objectContaining({       

//         })
//     ) 
// })


// test('canCreate',  async  () => {  
//     const data = await myAPI.drafts.canCreate("identifier");  

//     expect.soft(data).toEqual(
//         expect.objectContaining({       

//         })
//     ) 
// })


// test('canCreate',  async  () => {  
//     const data = await myAPI.drafts.canCreate("identifier");  

//     expect.soft(data).toEqual(
//         expect.objectContaining({       

//         })
//     ) 
// })


// test('canUpdate',  async  () => {  
//     const data = await myAPI.drafts.canUpdate("identifier");  

//     expect.soft(data).toEqual(
//         expect.objectContaining({       

//         })
//     ) 
// })


// test('canDelete',  async  () => {  
//     const data = await myAPI.drafts.canDelete("identifier");  

//     expect.soft(data).toEqual(
//         expect.objectContaining({       

//         })
//     ) 
// })













  
  
