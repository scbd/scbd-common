import { expect, test } from 'vitest'
import   KmStorageApi  from '../../../src/services/api/km-storage'

const dotenv = require('dotenv');
dotenv.config();

const myAPI = new  KmStorageApi ({tokentype:"Bearer", token: process.env.MyToken});



   
//test('uploadTempFile',  async  () => {  
    //const data = await myAPI.attachement.uploadTempFile(identifier, file, fileName, options) ;  

    // expect.soft(data).toEqual(

    // ) 
//})

//test('exists',  async  () => {  
    //const data = await myAPI.attachement.upload(identifier, file);  

    // expect.soft(data).toEqual(

    // ) 
//})