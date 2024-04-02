<template>
    <div class="scbd-common spinner" :class="{'d-flex justify-content-center' : alignCenter}">
        <slot>
            <div class="spinner-border" role="status">                
            </div>
            <br/>
            <span class="ms-1" v-if="message">{{ message }}</span>
            <span class="ms-1" v-if="!message">{{t('loading')}}...</span>
        </slot>
    </div>
</template>

<script setup >
    import { useAttrs } from 'vue'
    import { useI18n} from '../../services/composables/i18n';
    const {t, locale } = useI18n();  
    const attrs = useAttrs();

    const props = defineProps({ message : { type:String} })
    const alignCenter = attrs.hasOwnProperty('center');    
</script>
