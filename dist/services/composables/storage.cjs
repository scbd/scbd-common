'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _ = require('lodash');
require('@/services/composables/i18n');
require('@/services/filters/lstring');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ___default = /*#__PURE__*/_interopDefaultLegacy(_);

const removeEmpty = (obj)=> {
    return function remove(current) {
      ___default["default"].forOwn(current, function (value, key) {
        if (___default["default"].isUndefined(value) || ___default["default"].isNull(value) || ___default["default"].isNaN(value) ||
          (___default["default"].isString(value) && ___default["default"].isEmpty(value)) ||
          (___default["default"].isObject(value) && ___default["default"].isEmpty(remove(value)))) {
  
          delete current[key];
        }
      });

      if (___default["default"].isArray(current)) ___default["default"].pull(current, undefined);
  
      return current;
  
    }(___default["default"].cloneDeep(obj));
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

exports.useKmStorage = useKmStorage;
exports.useOnFileUpload = useOnFileUpload;
//# sourceMappingURL=storage.cjs.map
