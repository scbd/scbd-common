import _ from 'lodash';
import '@/services/composables/i18n';
import '@/services/filters/lstring';

const removeEmpty = (obj)=> {
    return function remove(current) {
      _.forOwn(current, function (value, key) {
        if (_.isUndefined(value) || _.isNull(value) || _.isNaN(value) ||
          (_.isString(value) && _.isEmpty(value)) ||
          (_.isObject(value) && _.isEmpty(remove(value)))) {
  
          delete current[key];
        }
      });

      if (_.isArray(current)) _.pull(current, undefined);
  
      return current;
  
    }(_.cloneDeep(obj));
};

const useKmStorage = ()=>{
    return {
        cleanDocument
    }
    
};
const useOnFileUpload = ({document, file, locale}) => {
    
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

};


const cleanDocument = (document)=>{

    return removeEmpty(document);    

};

export { useKmStorage, useOnFileUpload };
//# sourceMappingURL=storage.js.map
