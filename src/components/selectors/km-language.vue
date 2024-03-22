<template>
    <multi-select
        v-model="selectedLanguages"
        label="title"
        track-by="code"
        value-key="code"
        :options="formattedLanguages"  
        :multiple="true"
        :allow-empty="false"     
        :placeholder="t('languageOfRecord')"
        @update:modelValue="onChange">
    </multi-select>   

 
    <km-form-group name="otherLanguageOption" class="mt-2"  caption="Would like to submit this information in any other language(s)?">                                    
    
        <div class="form-check">
            <input type="radio" id="yes" :value="true" v-model="otherLanguageOption" />
            <label for="yes">Yes</label>

            <input type="radio" id="no" :value="false" v-model="otherLanguageOption" />
            <label for="no">No</label>
        </div>
    </km-form-group>


    <km-form-group name="otherLanguages" class="mt-2"  :caption="t('otherLanguage')" v-if = "otherLanguageOption" >
        <multi-select
            v-model="otherSelectedLanguages"
            label="title"
            track-by="code"
            value-key="code"
            :options="formattedOtherLanguages"
            :multiple="true"
            :close-on-select="false"    
            :placeholder="t('otherLanguageOfRecord')"
            @update:modelValue="onChange">
        </multi-select>
      
    </km-form-group>
</template>

<!-- <i18n src="@/i18n/dist/components/controls/edit/KmLanguages.json"></i18n> -->

<script setup >
    // import  KmFormCheckGroup from '../../components/controls/km-form-check-group.vue'
    import  KmFormGroup  from '../../components/controls/km-form-group.vue'
    // import  KmFormCheckItem  from '../../components/controls/km-form-check-item.vue'
    import  multiSelect  from '../../components/controls/multi-selector.vue'
    import { ref , computed} from 'vue'
    import { sortBy } from '../../services/util'
    import { useSecurity} from '../../composables/security'
    import { lstring } from '@/services/filters/lstring'

    // import { useThesaurusStore }    from '@/stores/thesaurus';
    // import { useUserPreferencesStore }    from '@/stores/userPreferences';
    import { languages }            from '../../data/language'       

    const THESAURUS = {  
        OTHER_LANGUAGES:'ISO639-2'  
    }

    const translations = {
        en: {
        "languageOfRecord": "Language(s) of record",
        "minOneLanguage": "Minimum of one language is mandatory, please select another language to remove the default language.",
        "otherLanguageOfRecord": "Other language(s) of record",
        "otherLanguageInfo":"Would like to submit this information in any other language(s)?",
        "otherLanguage":"Other language(s)?",
        "yes":"Yes",
        "no":"No"
        }
    }

    const props = defineProps({
        modelValue: {
            type    : [ Object ],
            required: true,
            default() {
                return [];
            },
        }
    });
    const emit  = defineEmits(['update:modelValue']);

    //const security                  = useSecurity();
    // const thesaurusStore            = useThesaurusStore ();
    // const userPreferencesStore      = useUserPreferencesStore();
    // const {t, locale }              = useI18n();
    const locale = 'en'
    //const t = (val)=>val;
    const t = ( key ) => translations.en[key] || key
    const thesaurusStore          = { getDomainTerms : (item)=>{return []}, loadDomainTerms : (item)=>{return []}}  
    const userPreferencesStore     = { setPreferredEditLanguages : (va)=>{}}  
   
    const selectedLanguages         = ref([]);
    const otherSelectedLanguages    = ref([]);

    const otherLanguageOption       = ref(false);
    

    const internalSelectedLanguages = ref([]); //all lanagues
  
    // const selectedLanguages      = computed(()=> internalSelectedLanguages.value.filter(l =>  isUNLanguage(l)))
    // const otherSelectedLanguages = computed(()=> internalSelectedLanguages.value.filter(l => !isUNLanguage(l)))
   
    //const formattedLanguages      = computed(()=>[languages].map(e=>{ return { code : e[0], title : e[1]}}));
    const formattedLanguages      = computed(()=> Object.entries(languages).map(([code, title]) => ({ code, title })));
    
    const formattedOtherLanguages = computed(()=>{
        let otherLanguages = thesaurusStore.getDomainTerms(THESAURUS.OTHER_LANGUAGES)||[]
        otherLanguages = otherLanguages
                            .filter(e=>!isUNLanguage(e.identifier.replace('lang-', '')))
                            .map(e=>{ 
                                return { code : e.identifier.replace('lang-', ''), title : lstring(e.title)}
                            });
       // return sortBy(otherLanguages, 'title')
       return otherLanguages;
    });

    const onMounted=()=>{
        let editLanguages = props.modelValue;
  
         
        selectedLanguages.value = editLanguages?.filter(e=>isUNLanguage(e));
        otherSelectedLanguages.value = editLanguages?.filter(e=>!isUNLanguage(e));
    
        if(otherSelectedLanguages.value?.length){
            otherLanguageOption.value = true;
            onOtherLanguage()
        }        
    }

    function onChange(code){
        const languages = [...selectedLanguages.value||[], ...otherSelectedLanguages.value||[]];
        emit('update:modelValue', languages);
        userPreferencesStore.setPreferredEditLanguages(languages);
    }

    function onOtherLanguage(){
        if(!otherLanguageOption.value){
            otherSelectedLanguages.value = [];
            onChange('');
        }
        return thesaurusStore.loadDomainTerms(THESAURUS.OTHER_LANGUAGES)
    }

    function isUNLanguage(code){
        return formattedLanguages.value.find(un=>un.code == code)
    }


    // test
    const options= [
        { code: 'Vue.js', title: 'JavaScript' },
        { code: 'Rails', title: 'Ruby' },
        { code: 'Sinatra', title: 'Ruby' },
        { code: 'Laravel', title: 'PHP', $isDisabled: true },
        { code: 'Phoenix', title: 'Elixir' }
    ];



</script>

<style scoped>

</style>