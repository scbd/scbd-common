import { expect, test } from 'vitest'
import   KmStorageApi  from '../../../../src/services/api/km-storage/KmStorage'

const dotenv = require('dotenv');
dotenv.config();
const myAPI = new  KmStorageApi ({tokentype:"Bearer", token: process.env.MyToken, realm:"CHM", Accept:"application/json"});


test('drafts-query - default',  async  () => {  
    console.log(process.env.Mytoken);
    const data = await myAPI.drafts.query();
    expect.soft(data).toEqual(
        expect.objectContaining({       
          "Items":  expect.any(Array),     
          "Count":   expect.any(Number),
        })
    ) 
})

test('drafts-query - ABS',  async  () => {  
    console.log(process.env.Mytoken);
    const data = await myAPI.drafts.query("ABS");
    expect.soft(data).toEqual(
        expect.objectContaining({       
          "Items":  expect.any(Array),     
          "Count":   expect.any(Number),
        })
    ) 
})

test('drafts-get-default',  async  () => {  
    const data = await myAPI.drafts.get("4E3A68B3-8609-9E39-3270-FF546ABD66E7");  

    expect.soft(data).toEqual(
        expect.objectContaining({ 
            "header":  expect.any(Object)  ,
            "government":  expect.any(Object),     
            "reportType":  expect.any(Object)  ,
            "title":  expect.any(Object),                  
        })
    ) 
})

test('drafts-get - ABS-DEV',  async  () => {  
    const data = await myAPI.drafts.get("0B3D2BB0-4446-522C-3440-DD0C791D71BB",{realm:"ABS-DEV"});  

    expect.soft(data).toEqual(
        expect.objectContaining({       
            "absSubjects":     expect.any(Array),             
            "authors":         expect.any(Object),                    
            "header":          expect.any(Object),                     
            "languages":       expect.any(Array),                 
            "libraries":       expect.any(Array),                  
            "publicationYear": expect.any(Number),   
            "regions":         expect.any(Array),                 
            "resourceLinks":   expect.any(Array),                  
            "resourceTypes":   expect.any(Array),                    
            "summary":         expect.any(Object),                    
            "title":           expect.any(Object),                
        })
    ) 
})

test('drafts-exists--ABS-DEV',  async  () => {  
    const data = await myAPI.drafts.exists("0B3D2BB0-4446-522C-3440-DD0C791D71BB",{realm:"ABS-DEV"});  
    expect.soft(data).toEqual(
        expect.objectContaining({   
        })
    ) 
})

test('drafts-put',  async  () => {  
    const data = await myAPI.drafts.put("0B3D2BB0-4446-522C-3440-DD0C791D71B9", "body",{realm:"ABS"});  

    expect.soft(data).toEqual(
        expect.objectContaining({       

        })
    ) 
})

test('drafts-delete',  async  () => {  
    const data = await myAPI.drafts.delete("0B3D2BB0-4446-522C-3440-DD0C791D71B9",{realm:"ABS"});  

    expect.soft(data).toEqual(
        expect.objectContaining({       

        })
    ) 
})

test('drafts-canCreate--ABS',  async  () => {  
    const data = await myAPI.drafts.canCreate("0B3D2BB0-4446-522C-3440-DD0C791D71B9", { realm: "ABS", schema: "authority", metadata:{ government : "ca" }});  

    expect.soft(data).toEqual(
        expect.objectContaining({       
            isAllowed: expect.any(Boolean),   
        })
    ) 
})

test('drafts-canUpdate',  async  () => {  
    const data = await myAPI.drafts.canUpdate("4E3A68B3-8609-9E39-3270-FF546ABD66E7",  { metadata:{ government : "ca" }});  
 
    expect.soft(data).toEqual(
        expect.objectContaining({       
            isAllowed: expect.any(Boolean),   
        })
    ) 
 })

test('drafts-canDelete',  async  () => {  
    const data = await myAPI.drafts.canDelete("4E3A68B3-8609-9E39-3270-FF546ABD66E7");  
    
    expect.soft(data).toEqual(
        expect.objectContaining({       
            isAllowed: expect.any(Boolean),   
        })
    ) 
})

test('drafts-canDelete',  async  () => {  
    const data = await myAPI.drafts.canDelete("4E3A68B3-8609-9E39-3270-FF546ABD66E7",{realm:"CHM"});  
    
    expect.soft(data).toEqual(
        expect.objectContaining({       
            isAllowed: expect.any(Boolean),   
        })
    ) 
})

test('lock-query-default',  async  () => {   
    const data = await myAPI.locks.query("4E3A68B3-8609-9E39-3270-FF546ABD66E7");
    expect.soft(data).toEqual(
        expect.arrayContaining([ 
        ])
    ) 
})

test('lock-get',  async  () => {  
    const data = await myAPI.locks.get("4E3A68B3-8609-9E39-3270-FF546ABD66E7","1");  

    expect.soft(data).toEqual(
        expect.objectContaining({    
            "lockID":   expect.any(String),   
            "lockOn":   expect.any(Date),  
            "lockedBy": expect.any(Object)
        })
    ) 
})

test('lock exists',  async  () => {  
    const data = await myAPI.locks.exists("57869e05-7dc3-4c86-b9c5-c35dc52643e7","1");  

    expect.soft(data).toEqual(
    ) 
})

test('lock-put',  async  () => {      
    const body = {};
    const data = await myAPI.locks.put("57869e05-7dc3-4c86-b9c5-c35dc52643e7","a1234567890", {realm:"CHM"});  

    expect.soft(data).toEqual(
        expect.objectContaining({       
            "lockID":   expect.any(String),   
            "lockOn":   expect.any(Date),  
            "lockedBy": expect.any(Object)
        })
    ) 
})

test('lock-delete',  async  () => {  
    const data = await myAPI.locks.delete("57869e05-7dc3-4c86-b9c5-c35dc52643e7","a1234567890");  
    expect.soft(data).toEqual(
        expect.objectContaining({  
        })
    ) 
})

