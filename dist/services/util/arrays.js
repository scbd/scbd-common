import _ from 'lodash';
import { useI18n } from '@/services/composables/i18n';
import { lstring } from '@/services/filters/lstring';

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
          valueA = lstring(valueA, locale.value);
          valueB = lstring(valueB, locale.value);
      }

      return valueA.localeCompare(valueB);

  })
}

export { asArray, sortBy };
//# sourceMappingURL=arrays.js.map
