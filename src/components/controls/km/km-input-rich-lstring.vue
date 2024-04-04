<template>
    <div class="scbd-common km-input-rich-lstring">
        <div :id="`km-rich-lstring-${uid}`"> 
            <ul class="nav nav-tabs">      
               <li class="nav-item"  v-for="locale in props.locales" :key="locale" :id="`lstringTab-${uid}`">           
                  <a class="nav-link " aria-current="page"  href="javascript:void(0);" :active="selectedLocale === locale" @click="onTabChange(locale)">      
                  {{lstring(getTerm(locale).title||locale)}}
                  </a>
              </li>        
            </ul>
          
            <div class="mt-2" :aria-labelledby="`tabContent-${locale}-${uid}`" v-for="locale in locales" :key="locale"  :visible="selectedLocale === locale" :id="`lstringTabContent-${uid}`">       
                  <ck-editor v-if="selectedLocale==locale" v-model="binding[selectedLocale]" :identifier="identifier"
                             :locale="selectedLocale"  :config="allPluginsConfig" @update:modelValue="onChange" @on-file-upload="onFileUpload"  >
                  </ck-editor>     
              </div> 
          </div>
    </div> 
</template>  

<script setup>
    import { ref, watch, onMounted, computed} from 'vue';
    import {without} from 'lodash';
    import ckEditor from '../../inputs/ck-editor/ck-editor.vue';
    import { useThesaurus }    from '@/services/composables/thesaurus';  
    import { makeSmallUid }   from '@/services/util/index';
    import {lstring } from '../../../services/filters/lstring';   
    import { removeEmpty }  from '../../../services/util/index';
    import { allPluginsConfig } from '../../inputs/ck-editor/all-plugins-config.js';
  
  
    const model = defineModel({ type: Object, required: false, default:{}});
  
    const props = defineProps({
        locales:    { type: Array,    required: true  }, 
        disabled:   { type: Boolean,  required: false },
        identifier: { type: String,   required: true  }
    });

    const emit = defineEmits(['update:modelValue', 'onFileUpload', 'onLanguageFocus']);

    const activeLocale = ref('');
    const uid = makeSmallUid();  

    watch(props.locales,  (newVal, oldVal) => {
        const deleted = without(oldVal, ...newVal);
        if(deleted?.length){      
            deleted.forEach(e=>{
                binding.value[e] = undefined;
            })
            onChange();
        }
        if(!newVal.includes(activeLocale.value)){        
        onTabChange(newVal[0]);
        }
        loadLanguages();
    })     

    const  binding  = computed(()=>{
        return model.value||{};
    })
     
    const selectedLocale  = computed(()=>{           
        return activeLocale.value;
    })

    const onChange=(value)=>{
        const clean = removeEmpty({...binding.value}); 
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
        emit('onLanguageFocus', locale);
   } 

    onMounted(() => {
        activeLocale.value =props.locales[0];        
        if(model.value){
            binding.value = {...model.value||{}};
        }
        loadLanguages();
    }) 
</script>
  