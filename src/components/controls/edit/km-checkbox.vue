
<template>
    <div class="form-check">
        <input type="checkbox" class="form-check-input"
            v-model="isChecked"
            :id="fieldId" 
            :checked="checked"  
        />
        <label :for="fieldId" class="form-check-label">            
            {{ label }}
        </label>
    </div>
</template>
    
<script setup>
    const { label, fieldId, checked } = defineProps ({
            label: { type: String, required: true },
            fieldId: { type: String, required: true },
            checked: { type: Boolean, default: false },
        })
    const isChecked = defineModel();
</script>