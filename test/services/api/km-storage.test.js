import { expect, test } from 'vitest'
import   KmStorageApi  from '../../../src/services/api/km-storage'

const dotenv = require('dotenv');
dotenv.config();
const myAPI = new  KmStorageApi ({tokentype:"Bearer", token: process.env.MyToken});

test('document-query--default',  async  () => {  
    const data = await myAPI.documents.query();
    expect.soft(data).toEqual(
        expect.objectContaining({       
          "Items":  expect.any(Array),     
          "Count":   expect.any(Number),
        })
    ) 
})

test('document-query--ABS-DEV',  async  () => {  
    const data = await myAPI.documents.query("ABS-DEV");
    expect.soft(data).toEqual(
        expect.objectContaining({       
          "Items":  expect.any(Array),     
          "Count":   expect.any(Number),
        })
    ) 
})

test('document-get--ABS-DEV',  async  () => {  
    const data = await myAPI.documents.get("C44FCD4E-548C-EB88-77F7-CB3E1C7CC737","ABS-DEV");  

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


test('document-exists--ABS-DEV',  async  () => {  
    const data = await myAPI.documents.exists("C44FCD4E-548C-EB88-77F7-CB3E1C7CC737","ABS-DEV");  
    expect.soft(data).toEqual(
        expect.objectContaining({   
        })
    ) 
})


test('document-put',  async  () => {
    const body = {   
        "type": "resource",
        "owner": "country:va",
        "revision": 1,
        "size": 1237,
        "charset": "utf-8",
        "title": {
            "en": "Mr"
        },
        "summary": {
            "en": "THis is just a test, iorem, etc etc"
        },
        "realm": "ABS-DEV",
        "latestRevision": 1,
        "isRequest": false
    };  
    const data = await myAPI.documents.put( "C44FCD4E-548C-EB88-77F7-CB3E1C7C9790", body, "ABS-DEV");
    expect.soft(data).toEqual(
        expect.objectContaining({       

        })
    ) 
})

test('document-delete',  async  () => {  
    const data = await myAPI.documents.delete("C44FCD4E-548C-EB88-77F7-CB3E1C7C9790");  

    expect.soft(data).toEqual(
        expect.objectContaining({       

        })
    ) 
})


test('document-validate',  async  () => {  
    const body = {   
        "header": {
            "identifier": "C44FCD4E-548C-EB88-77F7-CB3E1C7CC737",
            "schema": "resource",
            "languages": [
                "en"
            ]
        },
        "title": {
            "en": "Mr"
        },
        "authors": {
            "en": "Julian-as-a-VLR-contributor-Jackson"
        },
        "publisher": {
            "en": "Testing  House Pulishing PLC, Test Road, TEst town"
        },
        "source": {
            "en": "original doc"
        },
        "publicationDate": "2014-01",
        "rights": {
            "en": "Creative commons sharey likey"
        },
        "resourceLinks": [
            {
                "url": "http://www.gov.uk",
                "name": "UK Gov website"
            }
        ],
        "summary": {
            "en": "THis is just a test, iorem, etc etc"
        },
        "countryRegions": [
            {
                "identifier": "eu"
            },
            {
                "identifier": "gb"
            }
        ],
        "nagoya": {},
        "relevantInformation": {
            "en": "none at this time</br><strong>Migrated information</strong></br><b>Resource Access</b>: internets\r\n<div style=\"border-bottom: 1px solid #eee;\"><b>Languages</b></div>\r\nEnglish\r\n<div style=\"border-bottom: 1px solid #eee;\"><b>keywords</b></div>\r\n#tasting #testy #testes"
        },
        "notes": "this is simply a test",
        "libraries": [
            {
                "identifier": "cbdLibrary:abs-ch"
            }
        ]
    };  
    const data = await myAPI.documents.validate(body, {schema:"authority",metadata:{ "government" : "ca" }});  

    expect.soft(data).toEqual(
        expect.objectContaining({       

        })
    ) 
})

test('document-canCreate--ABS',  async  () => {  
    const data = await myAPI.documents.canCreate("C44FCD4E-548C-EB88-77F7-CB3E1C7C9790","ABS",{ schema: "authority", metadata:{ government : "ca" }});  

    expect.soft(data).toEqual(
        expect.objectContaining({       
            isAllowed: expect.any(Boolean),   
        })
    ) 
})

test('document-canUpdate-CHM',  async  () => {  
    const data = await myAPI.documents.canUpdate("C44FCD4E-548C-EB88-77F7-CB3E1C7CC737","CHM",{ schema: "authority", metadata:{ government : "ca" }});  

    expect.soft(data).toEqual(
        expect.objectContaining({       
            isAllowed: expect.any(Boolean),   
        })
    ) 
 })

test('document-canDelete-CHM',  async  () => {  
    const data = await myAPI.documents.canDelete("3BAA2053-A614-DD7C-40F8-F77F2471D2A5","CHM");  

    expect.soft(data).toEqual(
        expect.objectContaining({       
            isAllowed: expect.any(Boolean),   
        })
    ) 
})

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
    const data = await myAPI.drafts.get("0B3D2BB0-4446-522C-3440-DD0C791D71BB","ABS-DEV");  

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
    const data = await myAPI.drafts.exists("0B3D2BB0-4446-522C-3440-DD0C791D71BB","ABS-DEV");  
    expect.soft(data).toEqual(
        expect.objectContaining({   
        })
    ) 
})

test('drafts-put',  async  () => {  
    const data = await myAPI.drafts.put("0B3D2BB0-4446-522C-3440-DD0C791D71B9", "body","ABS");  

    expect.soft(data).toEqual(
        expect.objectContaining({       

        })
    ) 
})

test('drafts-delete',  async  () => {  
    const data = await myAPI.drafts.delete("0B3D2BB0-4446-522C-3440-DD0C791D71B9","ABS");  

    expect.soft(data).toEqual(
        expect.objectContaining({       

        })
    ) 
})

test('drafts-canCreate--CHM',  async  () => {  
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
    const data = await myAPI.drafts.canDelete("4E3A68B3-8609-9E39-3270-FF546ABD66E7","CHM");  
    
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
    const data = await myAPI.locks.put("57869e05-7dc3-4c86-b9c5-c35dc52643e7","a1234567890");  

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















  
  
