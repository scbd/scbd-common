import { expect, test } from 'vitest'
import KmWorkflowsApi from '../../../src/services/api/km-workflows'

const dotenv = require('dotenv');
dotenv.config();

const myAPI = new  KmWorkflowsApi({tokentype:"Bearer", token: process.env.MyToken});


test('getWorkflowHistory',  async  () => {  
  const data = await myAPI.getWorkflowHistory({l:1});
  
  expect.soft(data).toEqual( 
    expect.arrayContaining([ 
      expect.objectContaining({ 
        "__v":             expect.any(Number),
        "_id":             expect.any(String), 
        "activities":      expect.any(Array),
        "createdBy":       expect.any(Number),
        "createdBy_info":  expect.any(Object),
        "createdOn":       expect.any(String), 
        "data":            expect.any(Object), 
        "execution":       expect.any(String),    
        "state":           expect.any(String), 
        "type":            expect.any(Object),
        "workflowAge":     expect.any(Object)   
      })
    ]) 
  ) 
})

  
test('getWorkflow',  async  () => {  
  const data = await myAPI.getWorkflow("65cbab00cc4858c70017279b");

  expect.soft(data).toEqual( 
    expect.objectContaining({ 
      "_id":         expect.any(String), 
      "type":        expect.any(Object),       
      "activities":  expect.any(Array),
      "workflowAge": expect.any(Object),
      "execution":   expect.any(String), 
      "createdOn":   expect.any(String), 
      "createdBy":   expect.any(Number),
      "data":        expect.any(Object),
      "state":       expect.any(String), 
      "__v":         expect.any(Number),
      "closedOn":    expect.any(String), 
      "result":      expect.any(Object)
    }) 
  ) 
})



// test('getBatchWorkflowDetails',  async  () => {  
//   const data = await myAPI.getBatchWorkflowDetails(batchid);

//   expect.soft(data).toEqual( 
//     expect.arrayContaining([ 
//       expect.objectContaining({ 
//         "__v":      expect.any(Number),
//         "_id":      expect.any(String), 
//         "code":     expect.any(String),
//         "code2":    expect.any(String),
//         "code3":    expect.any(String),
//         "name":     expect.any(Object),  
//         "treaties": expect.any(Object),
//       }) 
//     ]) 
//   ) 
// })


// test('updateActivity',  async  () => {  
//   const data = await myAPI.updateActivity(id, activityName, body);

//   expect.soft(data).toEqual( 
//     expect.arrayContaining([ 
//       expect.objectContaining({ 
  
//       }) 
//     ]) 
//   ) 
// })


// test('updateBatchActivity',  async  () => {  
//   const data = await myAPI.updateBatchActivity(id, activityName, body);

//   expect.soft(data).toEqual( 
//     expect.arrayContaining([ 
//       expect.objectContaining({ 

//       }) 
//     ]) 
//   ) 
// })


// test('cancelWorkflow',  async  () => {  
//   const data = await myAPI.cancelWorkflow(id);

//   expect.soft(data).toEqual( 
//     expect.arrayContaining([ 
//       expect.objectContaining({ 

//       }) 
//     ]) 
//   ) 
// })

// test('cancelBatch',  async  () => {  
//   const data = await myAPI.cancelBatch(batchId);

//   expect.soft(data).toEqual( 
//     expect.arrayContaining([ 
//       expect.objectContaining({ 

//       }) 
//     ]) 
//   ) 
// })

