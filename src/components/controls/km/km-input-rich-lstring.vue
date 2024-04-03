<template>
    <div :id="`km-rich-lstring-${uid}`"> 
      <CNav variant="tabs" role="tablist">
        <CNavItem v-for="locale in locales" :key="locale" :id="`lstringTab-${uid}`">
          <CNavLink
            href="javascript:void(0);" :active="selectedLocale === locale" @click="onTabChange(locale)">      
              {{lstring(getTerm(locale).title||locale)}}
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" :aria-labelledby="`tabContent-${locale}-${uid}`" v-for="locale in locales" :key="locale" 
          :visible="selectedLocale === locale" :id="`lstringTabContent-${uid}`">       
          <ck-editor v-if="selectedLocale==locale" v-model="binding[selectedLocale]" :identifier="identifier"
              :locale="selectedLocale" @update:modelValue="onChange" @onFileUpload="onFileUpload"></ck-editor>     
        </CTabPane>
      </CTabContent>
    </div>
  </template>


  
<script setup>
    //import $ from 'jquery';
    //TODO: replace coure-ui controls with boostrap controls
    //TODO: remove code releated to userPreferencesStore and instead raise event for the parent to handle the userPreferencesStore -->
    import { makeUid } from '@coreui/utils/src'
    import {without} from 'lodash';
    import ckEditor from './ck-editor.vue'
    import { useThesaurusStore }    from '@/stores/thesaurus';
    import { useUserPreferencesStore }    from '@/stores/userPreferences'; 

    const model = defineModel({ type: Object, required: false, default:{}});
  
    const props = defineProps({
        locales: { type: Array,  required: true,  }, 
        disabled: { type: Boolean,  required: false,  },
        identifier: { type: String,   required: true, }
    });

    const emit = defineEmits(['update:modelValue', 'onFileUpload']);

    const activeLocale = '';
    const uid = makeUid();
    const tabPaneActiveKey =1;
    const userPreferencesStore = useUserPreferencesStore();


    watch(locales,  (newVal, oldVal) => {
        const deleted = without(oldVal, ...newVal)
          if(deleted?.length){      
              deleted.forEach(e=>{
                  binding[e] = undefined;
              })
              onChange();
          }
          if(!newVal.includes(this.activeLocale)){        
            onTabChange(newVal[0]);
          }
          loadLanguages()
    })
         
    let userLocales = computed(()=>{
        return props.locales;
    });   

    let  binding  = computed(()=>{
        return model.value||{};
    })
     
    const selectedLocale  = computed(()=>{
        if(locales.includes(userPreferencesStore.editorActiveLanguageTab )){
            return userPreferencesStore.editorActiveLanguageTab ;
        }
        else {
            return activeLocale;
        }             
        
    })

    const onChange=(value)=>{
        const clean = useKmStorage().cleanDocument({...binding});
        emit('update:modelValue', clean);
    }
    const onFileUpload=({file})=>{
        emit('onFileUpload', {file, locale : this.activeLocale});
    }
    const loadLanguages=()=>{
        const thesaurusStore    = useThesaurusStore ();
        locales?.forEach(e=>{
              thesaurusStore.loadTerm(`lang-${e}`);
        });   
    }
    const  getTerm=(term)=>{
        const thesaurusStore  = useThesaurusStore ();
        return thesaurusStore.getTerm(`lang-${term}`)||{};
    }
    const  onTabChange=(locale)=>{
        activeLocale = locale;
        userPreferencesStore.setEditorActiveLanguageTab(locale);
   } 

    onMounted(() => {
        activeLocale =locales[0];        
        if(model.value){
            binding = {...model.value||{}};
        }
        loadLanguages();
    })
 
  </script>
  