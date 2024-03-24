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