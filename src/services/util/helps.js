export function sortBy(list, property){
    
    const { locale } = useNuxtApp().$i18n;
    return list.sort((a ,b )=>{
        let valueA = a[property];
        let valueB = b[property];

        if(isLString(valueA)){
            valueA = lstring(valueA, locale.value)
            valueB = lstring(valueB, locale.value)
        }

        return valueA.localeCompare(valueB);

    })
}

//function for UI releted ID assignment, due to one in 10^15 probability of duplication
export function makeUid(){
    const key = Math.random().toString(36).substr(2)
    return 'uid-' + key
  }
  