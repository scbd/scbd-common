<script setup>
    const model = defineModel()

    const props = defineProps({
        modelValue: {
            type    : [ Object ],
            required: true,
            default:""
        },
        'type':String
      
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