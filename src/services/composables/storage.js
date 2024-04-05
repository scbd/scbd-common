
import { removeEmpty } from '../util/index';

export const useKmStorage = ()=>{
    return {
        cleanDocument
    }
    
}
export const useOnFileUpload = ({document, file, locale}) => {
    
    if(!document.value.additionalDocuments)
        document.value.additionalDocuments = [];

    const additionalDocuments = document.value.additionalDocuments;
    const tag = `hash:${file.hash}`;

    if(additionalDocuments.find(e=>e.tag == tag))
        return;
    additionalDocuments.push({
        url     : file.url,
        language: locale,
        name    : file.filename,
        tag     : tag
    });

}


const cleanDocument = (document)=>{

    return removeEmpty(document);    

}

