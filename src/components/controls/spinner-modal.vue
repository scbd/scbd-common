<template>
    <div class="scbd-common spinner-modal" tabindex="-1" role="dialog" v-if="props.visible" >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{props.title|| t('processing')}}</h5>          
            </div>
            <div class="modal-body">
                <slot>
                    <spinner :message="message || t('loading')"> </spinner>        
                </slot>
            </div>         
          </div>
        </div>
    </div>
</template>


<script setup >
    import { useI18n } from '../../services/composables/i18n';
    import spinner from './spinner.vue';
    import messages from "../../app-text/components/controls/spinner-modal.json"


    const {t, locale } = useI18n(messages);  

    const props = defineProps({
        visible : { type:Boolean, default:false},
        title   : { type:String},
        message : { type:String}
    })
</script>

