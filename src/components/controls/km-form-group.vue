<template>
    <div :id="$attrs.id" class="scbd-controls km-form-group form-group mb-3" 
    :class="{'has-error':hasError(), 'has-help':helpContent, 'mandatory':required}">
        <label class="mb-1 km-form-group-label" v-if="caption" 
        :for="name" :name="name" :required="required ? true : null">
            {{caption}}             
        </label>
        <km-help v-if="helpContent" :title="helpTitle" :content="helpContent" class="ms-1 me-1"></km-help>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import '../../assets/km.css'
import { ref, provide, defineProps, inject, computed } from 'vue'
import KmHelp  from './view/km-help.vue';   

const props = defineProps({
    name      : { type:String, default:"" },
    caption   : { type:String, required: true },
    required  : { type:Boolean, default:false },
    isValid : { type:Function },
    helpContent: { type: String, required: true },
    helpTitle: { type:String }
});

let reviewError = inject('validationReview')

const hasError    = ()=>{
    return props.name && props.required && reviewError?.isValid(props.name);
}

</script>

<style scoped>
    .km-form-group.mandatory{
        border-left: 5px solid red;
        padding-left: 10px;
    }
    .km-form-group label.required:after, .km-form-group label[required]:after {
        color: #e32;
        content: ' * ';
    }
    .km-form-group.has-help label.form-group{
        display: unset;
    }
    .km-form-group .form-group{
        font-weight: 500;
    }
</style>
