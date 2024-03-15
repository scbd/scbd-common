<template>
    <div :id="$attrs.id" class="form-group scbd-controls km-form-group mb-3" :class="{'has-error':hasError, 'has-help':content, 'mandatory':required}">
        <label class="mb-1 control-label" v-if="caption" 
        :for="name" :name="name" :required="required ? true : null">
            {{caption}}             
        </label>
        <km-help v-if="$attrs['data-content']" :title="$attrs['data-title']" :content="$attrs['data-content']" class="ms-1 me-1"></km-help>
        <div>
            <slot></slot>
        </div>
        <slot name="testName"></slot>
    </div>
</template>

<script setup>
import { ref, provide, defineProps, useSlots } from 'vue'
import KmHelp  from './view/km-help.vue';   
const slots = useSlots();
console.log(slots);
const props = defineProps({
    name      : { type:String, default:"" },
    caption   : { type:String, required: true },
    required  : { type:Boolean, default:false },
    isValid : { type:Function },
});

const hasError = ref(false)

const onReviewErrorHandler = (validationResponse)=>{
    hasError.value = validationResponse?.errors?.find(e=>e.property == name) != undefined;            
}

if(props.name && props.required){
    provide("onReviewError", onReviewErrorHandler);
}
</script>

<style scoped>

</style>
