import { expect, test } from 'vitest'
import   KmStorageApi  from '../../../../src/services/api/km-storage/KmStorage'

const dotenv = require('dotenv');
dotenv.config();
const myAPI = new  KmStorageApi ({tokentype:"Bearer", token: process.env.MyToken, realm:"CHM", Accept:"application/json"});

test('document-query--default',  async  () => {  
    const data = await myAPI.documents.query();
    expect.soft(data).toEqual(
        expect.objectContaining({       
          "Items":  expect.any(Array),     
          "Count":   expect.any(Number),
        })
    ) 
})

test('document-query--default',  async  () => {  
    const data = await myAPI.documents.query({l:1});
    expect.soft(data).toEqual(
        expect.objectContaining({       
          "Items":  expect.any(Array),     
          "Count":   expect.any(Number),
        })
    ) 
})

test('document-query--ABS-DEV',  async  () => {  
    const data = await myAPI.documents.query({realm:"ABS-DEV"});
    expect.soft(data).toEqual(
        expect.objectContaining({       
          "Items":  expect.any(Array),     
          "Count":   expect.any(Number),
        })
    ) 
})

test('document-get--ABS-DEV',  async  () => {  
    const data = await myAPI.documents.get("C44FCD4E-548C-EB88-77F7-CB3E1C7CC737",{realm:"ABS-DEV"});  

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


test('document-getinfo--ABS-DEV',  async  () => {  
    const data = await myAPI.documents.getInfo("C44FCD4E-548C-EB88-77F7-CB3E1C7CC737",{realm :"ABS-DEV"});  

    expect.soft(data).toEqual(
        expect.objectContaining({      
            // "metadata":             expect.any(Object),            
            // "body":                 expect.any(Object),     
            // "Realm":                expect.any(String),  
            // "Identifier":           expect.any(String),     
            // "documentID":           expect.any(Number),  
            // "createdOn":            expect.any(Date),     
            // "createdBy":            expect.any(Object),  
            // "updatedOn":            expect.any(Date),     
            // "updatedBy":            expect.any(Object),  
            // "submittedOn":          expect.any(Date),  
            // "submittedBy":          expect.any(Object),     
            // "type":                 expect.any(String),  
            // "owner":                expect.any(String),    
            
            
         
           
        })
    ) 
})

test('document-exists--ABS-DEV',  async  () => {  
    const data = await myAPI.documents.exists("C44FCD4E-548C-EB88-77F7-CB3E1C7CC737",{realm:"ABS-DEV"});  
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
    const data = await myAPI.documents.put( "C44FCD4E-548C-EB88-77F7-CB3E1C7C9790", body, {realm:"ABS-DEV"});
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
    const data = await myAPI.documents.canCreate("C44FCD4E-548C-EB88-77F7-CB3E1C7C9790",{ realm : "ABS",schema: "authority", metadata:{ government : "ca" }});  

    expect.soft(data).toEqual(
        expect.objectContaining({       
            isAllowed: expect.any(Boolean),   
        })
    ) 
})

test('document-canUpdate-CHM',  async  () => {  
    const data = await myAPI.documents.canUpdate("C44FCD4E-548C-EB88-77F7-CB3E1C7CC737",{ realm: "CHM", schema: "authority", metadata:{ government : "ca" }});  

    expect.soft(data).toEqual(
        expect.objectContaining({       
            isAllowed: expect.any(Boolean),   
        })
    ) 
 })

test('document-canDelete-CHM',  async  () => {  
    const data = await myAPI.documents.canDelete("3BAA2053-A614-DD7C-40F8-F77F2471D2A5",{realm:"CHM"});  

    expect.soft(data).toEqual(
        expect.objectContaining({       
            isAllowed: expect.any(Boolean),   
        })
    ) 
})













  
  
