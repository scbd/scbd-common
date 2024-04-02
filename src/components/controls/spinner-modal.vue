<template>
    <div class="scbd-common spinner-modal" tabindex="-1" role="dialog" v-if="props.visible" >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{props.title|| t('processing')}}</h5>          
            </div>
            <div class="modal-body">
                <slot>
                    <spinner> </spinner>
                    <span v-if="message">{{ message }}</span>
                    <span v-if="!message">{{t('loading')}}...</span>
                </slot>
            </div>         
          </div>
        </div>
    </div>
</template>


<script setup >
    import { useI18n} from '../../services/composables/i18n';
    import spinner from './spinner.vue';

    const {t, locale } = useI18n();  

    const props = defineProps({
        visible : { type:Boolean, default:false},
        title   : { type:String},
        message : { type:String}
    })
</script>

