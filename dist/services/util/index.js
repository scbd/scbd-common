import _ from 'lodash';
import { useI18n } from '@/services/composables/i18n';
import { lstring as lstring$1 } from '@/services/filters/lstring';

const isPlainObject = (o) => {
  return Object.prototype.toString.call(o) === '[object Object]' && o?.constructor?.name === 'Object';
};

const isEmpty = (o) =>{
  if(!o) return true
  if(Array.isArray(o)) return !o.length
  if(isPlainObject(o)) return !Object.keys(o).length

  return false
};

const deleteFalsyKey = (obj) => {

  if(Array.isArray(obj))
    for (let index = 0; index < obj.length; index++) {
      if(isPlainObject(obj[index]) || Array.isArray(obj[index])) 
        if(isEmpty(obj)) obj.splice(index);
        else
          obj[index] = deleteFalsyKey(obj[index]);
      else if(typeof obj[index] === 'undefined' || obj[index] === null || obj[index] === '')
        obj.splice(index);
    }
  else if(obj && isPlainObject(obj))
    for (const key of Object.keys(obj))
      if((Array.isArray(obj[key]) || isPlainObject(obj[key])) && !isEmpty(obj)) deleteFalsyKey(obj[key]);
      else if((typeof obj[key] === 'undefined' || obj[key] === null || obj[key] === '') ) delete obj[key];

  return obj
};

const unique = (array) => {
  return Array.from(new Set(array.map((el)=>{ if(isPlainObject(el)) return JSON.stringify(el); else return el}))).map(JSON.parse)
};

// https://raw.githubusercontent.com/mathiasbynens/CSS.escape/master/css.escape.js
	
const cssEscape = function(value) {
    if (arguments.length == 0) {
        throw new TypeError('`CSS.escape` requires an argument.');
    }
    var string = String(value);
    var length = string.length;
    var index = -1;
    var codeUnit;
    var result = '';
    var firstCodeUnit = string.charCodeAt(0);

    if (
        // If the character is the first character and is a `-` (U+002D), and
        // there is no second character, […]
        length == 1 &&
        firstCodeUnit == 0x002D
    ) {
        return '\\' + string;
    }

    while (++index < length) {
        codeUnit = string.charCodeAt(index);
        // Note: there’s no need to special-case astral symbols, surrogate
        // pairs, or lone surrogates.

        // If the character is NULL (U+0000), then the REPLACEMENT CHARACTER
        // (U+FFFD).
        if (codeUnit == 0x0000) {
            result += '\uFFFD';
            continue;
        }

        if (
            // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
            // U+007F, […]
            (codeUnit >= 0x0001 && codeUnit <= 0x001F) || codeUnit == 0x007F ||
            // If the character is the first character and is in the range [0-9]
            // (U+0030 to U+0039), […]
            (index == 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
            // If the character is the second character and is in the range [0-9]
            // (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
            (
                index == 1 &&
                codeUnit >= 0x0030 && codeUnit <= 0x0039 &&
                firstCodeUnit == 0x002D
            )
        ) {
            // https://drafts.csswg.org/cssom/#escape-a-character-as-code-point
            result += '\\' + codeUnit.toString(16) + ' ';
            continue;
        }

        // If the character is not handled by one of the above rules and is
        // greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
        // is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
        // U+005A), or [a-z] (U+0061 to U+007A), […]
        if (
            codeUnit >= 0x0080 ||
            codeUnit == 0x002D ||
            codeUnit == 0x005F ||
            codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
            codeUnit >= 0x0041 && codeUnit <= 0x005A ||
            codeUnit >= 0x0061 && codeUnit <= 0x007A
        ) {
            // the character itself
            result += string.charAt(index);
            continue;
        }

        // Otherwise, the escaped character.
        // https://drafts.csswg.org/cssom/#escape-a-character
        result += '\\' + string.charAt(index);
    }
    return result;
};

function asArray(data) {
    return _([ data ])
      .flatten()
      .compact()
      .value();
}

function sortBy(list, property){    
  //const { locale } = useNuxtApp().$i18n;
  const {t, locale }    = useI18n();  
  return list.sort((a ,b )=>{
      let valueA = a[property];
      let valueB = b[property];

      if(isLString(valueA)){
          valueA = lstring$1(valueA, locale.value);
          valueB = lstring$1(valueB, locale.value);
      }

      return valueA.localeCompare(valueB);

  })
}

function lstring(ltext, locale) {
  if (Number.isInteger(ltext))
    //is number to handle generic implementation of NR
    return ltext;

  if (!ltext) return "";

  if (typeof ltext === "string") return ltext;

  locale = locale || lstringLocale(ltext, locale);
  let sText = "";
  if (!sText && locale) sText = ltext[locale];
  if (!sText) sText = ltext.en;
  if (!sText) {
    var normalized = normalizeText(ltext);
    if (normalized[locale]) return normalized[locale];

    for (var key in ltext) {
      sText = ltext[key];
      if (sText) break;
    }
  }
  return sText || "";
}

const lstringLocale = (ltext, locale) => {
  // TODO: use thesaraus API

  // TODO: use thesaraus API, there was an OR case to get value from thesaraus API
  if (!ltext) return locale;

  if (typeof ltext == "string") return locale;

  if (ltext[locale]) return locale;

  // TODO: use thesaraus API, there was a conditional check to get value from 'defaultLocale.value'

  if (ltext.en) return "en";

  if (ltext.fr) return "fr";
  if (ltext.es) return "es";
  if (ltext.ru) return "ru";
  if (ltext.ar) return "ar";
  if (ltext.zh) return "zh";

  for (var key in ltext) {
    if (ltext[key]) return key;
  }

  return locale;
};

const direction = (text, locale) => {
  locale = lstringLocale(text, locale);

  return localeDirection(locale);
};

const localeDirection = (locale) => {
  // TODO: use thesaraus API
  return locale == "ar" ? "rtl" : "ltr";
};

function normalizeText(text) {
  if (!text) return null;

  var entry = {
    ar: text.ar,
    en: text.en,
    es: text.es,
    fr: text.fr,
    ru: text.ru,
    zh: text.zh,
  };

  if (!entry.en) entry.en = entry.fr;
  if (!entry.en) entry.en = entry.es;
  if (!entry.en) entry.en = entry.ru;
  if (!entry.en) entry.en = entry.ar;
  if (!entry.en) entry.en = entry.zh;

  if (!entry.fr) entry.fr = entry.en;
  if (!entry.es) entry.es = entry.en;
  if (!entry.ru) entry.ru = entry.en;
  if (!entry.ar) entry.ar = entry.en;
  if (!entry.zh) entry.zh = entry.en;
  return entry;
}

const makeSmallUid = () => {
    const key = (S4() + S4()).toUpperCase();
    return 'uid-' + key;
};

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

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

const useLogger = ()=>{
    return {
        error
    }
};



function error(appError, userMessage){

    if(![404, 401, 403].includes(appError?.status)){

        try{
            console.error(appError);
            
            const { ACCOUNTS_HOST_URL, TAG, COMMIT } = useRuntimeConfig().public;
            const realmConfStore  = useRealmConfStore();
            const realmConf = realmConfStore.realmConf; 
            //TODO: send error to server
            const errorLog = {
                stack : JSON.stringify(appError, Object.getOwnPropertyNames(appError)), 
                message: JSON.stringify(userMessage || appError?.message || 'unknown'),
                url      : window.location.href,
                userAgent: window.navigator.userAgent,
                ver      : TAG||COMMIT,
                timestamp: new Date(),
                realm : realmConf.realm
            }; 

            useAPIFetch('/error-logs', {method:'POST', body: errorLog});
        }
        catch(err){
            console.error(err, 'error sending error log to server.');
        }
    }
        
    if(userMessage){
        const $toast = useToast();
        $toast.error(userMessage, {position:'top-right'}); 
    }
}

export { asArray, cssEscape, deleteFalsyKey, direction, isEmpty, isPlainObject, lstring, lstringLocale, makeSmallUid, removeEmpty, sortBy, unique, useLogger };
//# sourceMappingURL=index.js.map
