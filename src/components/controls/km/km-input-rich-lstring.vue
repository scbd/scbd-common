<template>


    <div :id="`km-rich-lstring-${uid}`"> 
      <!-- <CNav variant="tabs" role="tablist">
        <CNavItem v-for="locale in locales" :key="locale" :id="`lstringTab-${uid}`">
          <CNavLink
            href="javascript:void(0);" :active="selectedLocale === locale" @click="onTabChange(locale)">      
              {{lstring(getTerm(locale).title||locale)}}
          </CNavLink>
        </CNavItem>
      </CNav> -->

       <!-- <CTabContent>
        <CTabPane role="tabpanel" :aria-labelledby="`tabContent-${locale}-${uid}`" v-for="locale in locales" :key="locale" 
          :visible="selectedLocale === locale" :id="`lstringTabContent-${uid}`">       
          <ck-editor v-if="selectedLocale==locale" v-model="binding[selectedLocale]" :identifier="identifier"
              :locale="selectedLocale" @update:modelValue="onChange" @onFileUpload="onFileUpload"></ck-editor>     
        </CTabPane>
      </CTabContent> -->

      <ul class="nav nav-tabs">      
         <li class="nav-item"  v-for="locale in props.locales" :key="locale" :id="`lstringTab-${uid}`">           
            <a class="nav-link " aria-current="page"  href="javascript:void(0);" :active="selectedLocale === locale" @click="onTabChange(locale)">      
            {{lstring(getTerm(locale).title||locale)}}
            </a>
        </li>        
      </ul>
      <br/>


      <div :aria-labelledby="`tabContent-${locale}-${uid}`" v-for="locale in locales" :key="locale"  :visible="selectedLocale === locale" :id="`lstringTabContent-${uid}`">       
            <ck-editor v-if="selectedLocale==locale" v-model="binding[selectedLocale]" :identifier="identifier"
                       :locale="selectedLocale" @update:modelValue="onChange" @onFileUpload="onFileUpload">
            </ck-editor>     
        </div> 
    </div>

  </template>

  
<script setup>
    //import $ from 'jquery';
    //TODO: replace coure-ui controls with boostrap controls
    //TODO: remove code releated to userPreferencesStore and instead raise event for the parent to handle the userPreferencesStore -->
    //import { makeUid } from '@coreui/utils/src'

    import { ref, watch, onMounted, computed} from 'vue';
    import {without} from 'lodash';
    import ckEditor from '../km-ck-editor.vue';
    import { useThesaurus }    from '@/services/composables/thesaurus';  
    import { makeSmallUid }   from '@/services/util/index';
    import {lstring } from '../../../services/filters/lstring';   
    import { useKmStorage} from '../../../services/composables/storage';
    //import { useUserPreferencesStore }    from '@/stores/userPreferences'; 

    const model = defineModel({ type: Object, required: false, default:{}});
  
    const props = defineProps({
        locales: { type: Array,  required: true,  }, 
        disabled: { type: Boolean,  required: false,  },
        identifier: { type: String,   required: true, }
    });

    const emit = defineEmits(['update:modelValue', 'onFileUpload', 'userPreferences']);

    const activeLocale = ref('');
    const uid = makeSmallUid();  
    //const tabPaneActiveKey =1;
    //const userPreferencesStore = useUserPreferencesStore();


    watch(props.locales,  (newVal, oldVal) => {
        const deleted = without(oldVal, ...newVal)
          if(deleted?.length){      
              deleted.forEach(e=>{
                  binding[e] = undefined;
              })
              onChange();
          }
          if(!newVal.includes(activeLocale.value)){        
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
        // if(locales.includes(userPreferencesStore.editorActiveLanguageTab )){
        //     return userPreferencesStore.editorActiveLanguageTab ;
        // }
        // else {
        //     return activeLocale;
        // }             
        return activeLocale.value;
    })

    const onChange=(value)=>{
        const clean = useKmStorage().cleanDocument({...binding});
     
        emit('update:modelValue', clean);
    }
    const onFileUpload=({file})=>{
        emit('onFileUpload', {file, locale : activeLocale.value});
    }
    const loadLanguages=()=>{   
        const thesaurusService  = useThesaurus();
        props.locales?.forEach(e=>{
            thesaurusService.loadDomainTerms (`lang-${e}`);
        });   
    }
    const  getTerm=(term)=>{     
        const thesaurusService  = useThesaurus();
        return thesaurusService.getDomainTerms(`lang-${term}`)||{};
    }
    const  onTabChange=(locale)=>{
        activeLocale.value = locale;
        // userPreferencesStore.setEditorActiveLanguageTab(locale);
        //TODO: add event handle for parents
        emit('userPreferences', locale);
   } 


    onMounted(() => {
        activeLocale.value =props.locales[0];        
        if(model.value){
            binding = {...model.value||{}};
        }
        loadLanguages();
    })
 
  </script>
  