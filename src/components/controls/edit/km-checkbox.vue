
<template>
    <div class="form-check">
        <input type="checkbox" class="form-check-input"
            v-model="isChecked"
            :id="fieldId" 
        />
        <label :for="fieldId" class="form-check-label">            
            {{ label }}
        </label>
    </div>
</template>
    
<script setup>
    const { label, fieldId } = defineProps ({
            label: { type: String, required: true },
            fieldId: { type: String, required: true },
        })
    const isChecked = defineModel();
</script>