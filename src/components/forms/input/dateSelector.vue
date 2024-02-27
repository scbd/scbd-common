<script setup  lang="ts">
    import defineModel from Vue

    const model = defineModel()

    type Type = "date"|"month"

    interface Props {    
        modelValue?: string ;
        disabled?: boolean;
        type?: Type;      
    }

    const props = withDefaults(defineProps<Props>(), {    
        type:"date",
        modelValue: "",
        disabled: false,
    });

    const emit  = defineEmits(['update:modelValue']);

    const onChange = (event) => {
         emit('update:modelValue', event.target.value);
    };
</script>

<template>
    <Input  id = "dateSelector"
            v-model="model"       
            :type=type
            placeholder="Select date"
            :disabled="disabled"
            @input="onChange"               
    /> 
</template>