<script setup>
    //TODO: check if browser support datepicker
    //https://stackoverflow.com/questions/10193294/how-can-i-tell-if-a-browser-supports-input-type-date
    const model = defineModel()

    const props = defineProps({
        modelValue: {
            type    : [ Object ],
            required: true,
            default:""
        },
        'type':{
            type:String,
            default:"date"
        }
      
    });
    const emit  = defineEmits(['update:modelValue']);

    const onChange = (event) => {
         emit('update:modelValue', event.target.value);
    };
</script>

<template>
  <Input    id = "dateSelector"
            v-model="model"       
            :type=type
            placeholder="Select date"
            :disabled="disabled"
            @input="onChange"               
    /> 
</template>