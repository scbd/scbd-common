<template>    
    <input    
        v-model="model"
        :class="$attrs.class"
        :id="$attrs.id"
        :required="$attrs.required" 
        :placeholder="$attrs.placeholder"
        :disabled="$attrs.disabled"
        :type="type" /> 
</template>

<script setup>
    //TODO: check if browser support datepicker
    //https://stackoverflow.com/questions/10193294/how-can-i-tell-if-a-browser-supports-input-type-date
    const model = defineModel();    
    const props = defineProps({
        type:{
            type:String,
            default:"date",
            validator(value) { 
                return ['date', 'month'].includes(value)
            }
        }   
    });
</script>