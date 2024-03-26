<template>

    <div class="form-check">
        <input  v-model="model" @input="(event) => $emit('update:modelValue', event.target.checked)" type="checkbox" 
        :checked="model" :id="fieldId" class="form-check-input" />
        <label :for="fieldId" class="form-check-label">            
            <slot>
                {{ label }}
            </slot>  
        </label>
    </div>
</template>
  
<script setup>
    import { defineEmits, defineModel, defineProps} from 'vue';

    const model = defineModel({ type: Boolean,required: true, default: false});  

    const props = defineProps({
        label: String, 
        fieldId: { type: String,  required: true, },
        checked: { type: Boolean   }
    })
    const emit  = defineEmits(['update:modelValue']);    

</script>
  
<style></style>