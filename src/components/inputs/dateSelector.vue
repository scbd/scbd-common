<template>
    <input    id = "dateSelector"
              v-model="model"       
              :type="type"
              :placeholder="placeholder"
              :disabled="disabled"
              @input="onChange"               
    /> 
</template>

<script setup>
    //TODO: check if browser support datepicker
    //https://stackoverflow.com/questions/10193294/how-can-i-tell-if-a-browser-supports-input-type-date
    const model = defineModel()

    const props = defineProps({
        modelValue: {
            type    : String,
            required: true,
            default:""
        },
        type:{
            type:String,
            default:"date",
            validator(value) { 
                return ['date', 'month'].includes(value)
            }
        },
        placeholder:{
            type:String,
            default:"Select Date"
        },
        disabled:{
            type:Boolean,
            default:false
        }      
    });
    const emit  = defineEmits(['update:modelValue']);

    const onChange = (event) => {
         emit('update:modelValue', event.target.value);
    };
</script>