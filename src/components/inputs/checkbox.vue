
<template>
    <div :class="$attrs.class">
        <input
            type="checkbox"
            v-model="model"
            :id="$attrs.id"
            :required="$attrs.required"
            :disabled="$attrs.disabled"
        />
        <label :for="$attrs.id">{{ label }}</label>
    </div>
</template>

<script setup>
    const model = defineModel();
    const props = defineProps({
        label: {
        type: String,
        required: false,
        },
    });
</script>
<style scoped>
    label {
    margin-left: 10px;
    }
</style>