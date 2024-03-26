<template> 
    <div class="scbd-common km-government">
        <multi-selector
            v-model="selectedGovernment.identifier"
            class="validationClass"
            label="name"
            track-by="code"
            value-key="code"
            :placeholder="$attrs.placeholder || t('government')"
            :options="countryList"
            :disabled="!countryList || $attrs.disabled"    
            @update:modelValue="onChange" >
        </multi-selector>  
    </div>
</template>

<!-- TODO: add i18n support -->
<script setup >
    import { ref , computed , defineModel } from 'vue'
    import multiSelector from "../controls/multi-selector.vue"
    import { useI18n} from '../../services/composables/i18n';
    import { useCountries }    from '@/services/composables/countries';   
    
    const model = defineModel({ type: Array,required: true, default: {identifier:undefined}});  
    const emit  = defineEmits(['update:modelValue']);

    const countries = useCountries ();   
    const {t, locale }   = useI18n();  
    const selectedGovernment = ref({identifier:undefined});

    const countryList   = computed(()=>{      
        if(!countries?.length)
             return [];
        const mapCountries = countries.map(e=>{            
            return { name : e.name[locale], code : e.code?.toLowerCase()}
        })
        return mapCountries;
    })  

    function onChange(code){
         emit('update:modelValue', { identifier : code })
    }  
    
</script>

<style scoped>

</style>