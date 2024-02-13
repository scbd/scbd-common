import { expect, test } from 'vitest'
import  KmStorageApi from '../../../src/services/api/km-storage'

const myAPI = new  KmStorageApi({});

test('query',  async  () => {  
    const data = await myAPI.query();
  
    expect.soft(data).toEqual(
        expect.objectContaining({       
          "Items":  expect.any(Array),     
          "Count":   expect.any(Number),
        })
    ) 
})


// test('get',  async  () => {  
//     const data = await myAPI.get("identifier");  

//     expect.soft(data).toEqual(
//         expect.objectContaining({       

//         })
//     ) 
// })


// test('exists',  async  () => {  
//     const data = await myAPI.exists("identifier");  

//     expect.soft(data).toEqual(
//         expect.objectContaining({       

//         })
//     ) 
// })


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













  
  
