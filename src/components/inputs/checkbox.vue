<template>

    <div class="form-check">
        <input  v-model="model" @input="(event) => $emit('update:checked', event.target.checked)" type="checkbox" 
        :checked="checked" :id="fieldId" class="form-check-input" />
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
    const emit  = defineEmits(['update:checked']);    

</script>
  
<style></style>