<template>
    <div class="scbd-common spinner" :class="{'d-flex justify-content-center' : alignCenter}">
        
        <span :class="variant" role="status"></span>
        <slot>
            <span class="ms-2" v-if="message">{{ message }}</span>
            <span class="ms-2" v-if="!message">{{t('loading')}}...</span>
        </slot>
    </div>
</template>

<script setup >
    import { useAttrs, computed } from 'vue'
    import { useI18n } from '../../services/composables/i18n';

    const props = defineProps({ 
        message : { type: String },
        variant : { type: String, default:'spinner-border'}
    })

    const { t } = useI18n();  
    const attrs = useAttrs();

    const alignCenter = computed(()=>attrs.hasOwnProperty('center'));  

</script>
