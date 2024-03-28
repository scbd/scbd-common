<template> 
    <div class="scbd-common km-government">
        <multi-selector
            v-model="model.identifier"
            class="validationClass"
            label="name"
            track-by="code"
            value-key="code"
            :placeholder="$attrs.placeholder || t('government')"
            :options="countryList"
            :disabled="!countryList || $attrs.disabled" >
        </multi-selector>  
    </div>
</template>

<!-- TODO: add i18n support -->
<script setup >
    import { computed, defineModel } from 'vue'
    import multiSelector from "../controls/multi-selector.vue"
    import { useI18n } from '../../services/composables/i18n';
    import { useCountries }    from '@/services/composables/countries';   
    
    const model = defineModel({ type: Array,required: true, 
                                default: {identifier:undefined}
                            });  
    
    const countries = useCountries ();   
    const {t, locale }   = useI18n();  

    const countryList   = computed(()=>{  
        return (countries||[]).map(e=>{            
            return { name : e.name[locale], code : e.code?.toLowerCase()}
        })
    })  

</script>