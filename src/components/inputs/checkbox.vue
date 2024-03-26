<template>
    <div class="scbd-common checkbox form-check">
        <input  
            type="checkbox" 
            v-model="model"
            :id="fieldId"  
            :checked="checked" 
            :required="$attrs.required"
            :disabled="$attrs.disabled"
            :class="$attrs.class"        
             class="form-check-input" />
        <label :for="fieldId" class="form-check-label">            
            <slot>
                {{ label }}
            </slot> 
        </label>
    </div>
</template>
  
<script setup>
    import { defineModel, defineProps} from 'vue';
    const model = defineModel({ type: Boolean,required: true, default: false});  
    const props = defineProps({
        label: String, 
        fieldId: { type: String,  required: true, },
        checked: { type: Boolean   }
    })
 
</script>
  
<style></style>