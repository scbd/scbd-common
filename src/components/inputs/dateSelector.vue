<template>
    <input    
        v-model="model"
        :class="attrs.class"
        :id="attrs.id"
        :required="attrs.required" 
        :placeholder="attrs.placeholder"
        :disabled="attrs.disabled"
        :type="type" /> 
</template>

<script setup lang="ts">

    //TODO: check if browser support datepicker
    //https://stackoverflow.com/questions/10193294/how-can-i-tell-if-a-browser-supports-input-type-date

    import { useAttrs } from 'vue'; 

    const model = defineModel<string>({ required: true });  
    const attrs = useAttrs() as {
        id?: string;
        required?: boolean;
        placeholder?: string;
        disabled?: boolean;
        class?: string;
    };

    defineProps({
        type: {
            type: String, 
            default: "date", 
            validator(value: string) { 
                return ['date', 'month'].includes(value); // Validating the value
            }
        }
    }); 
</script>
