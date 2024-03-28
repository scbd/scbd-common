<template>
   <div class="scbd-common km-language">
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
    
        <km-form-group name="otherLanguageOption" class="mt-2"    caption="Would like to submit this information in any other language(s)?">    
            <div class="form-check">
                <input  class="form-check-input" type="radio"  id="yes" :value="true" v-model="otherLanguageOption" />
                <label  class="form-check-label" for="yes">Yes</label>
            </div>
            <div class="form-check">
                <input  class="form-check-input" type="radio" id="no" :value="false" v-model="otherLanguageOption" />
                <label  class="form-check-label" for="no">No</label>
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
    </div>
</template>

<script setup >
    import  KmFormGroup  from '../../components/controls/km-form-group.vue'
    import  multiSelect  from '../../components/controls/multi-selector.vue'
    import { ref , computed, defineEmits, defineModel} from 'vue'
    import { sortBy } from '@/services/util'
    import { THESAURUS} from '../../services/util/constants';
    import { useI18n} from '../../services/composables/i18n';
    import { lstring } from '@/services/filters/lstring'    
    import { useThesaurus }    from '@/services/composables/thesaurus';  
    import { languages }            from '../../data/language'       
     
    //TODO:add i18m support 
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
    const model = defineModel({ type: Array,required: true, default: []});  
    const emit  = defineEmits(['update:modelValue']);    
    const {t, locale }              = useI18n();  
    const otherLanguageOption       = ref(false);  
    const thesaurusService          = useThesaurus();
      
    const selectedLanguages      = ref([])
    const otherSelectedLanguages = ref([])
   
    const formattedLanguages      = computed(()=> Object.entries(languages).map(([code, title]) => ({ code, title })));    
    const formattedOtherLanguages = computed(()=>{
        let otherLanguages = thesaurusService.getDomainTerms(THESAURUS.OTHER_LANGUAGES)||[]
        otherLanguages = otherLanguages
                            .filter(e=>!isUNLanguage(e.identifier.replace('lang-', '')))
                            .map(e=>{ 
                                return { code : e.identifier.replace('lang-', ''), title : lstring(e.title)}
                            });       
     
       return sortBy(otherLanguages, 'title');         
    }); 

    function onChange(code){
        const languages = [...selectedLanguages.value||[], ...otherSelectedLanguages.value||[]];
        emit('update:modelValue', languages);
    }

    function isUNLanguage(code){
        return formattedLanguages.value.find(un=>un.code == code)
    }

</script>

<style scoped>
</style>
