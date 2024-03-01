
<template>
    <div class="form-check">
        <input
            type="checkbox"
            v-model="model"
            :id="$attrs.id"
            :required="$attrs.required"
            :disabled="$attrs.disabled"
            :class="$attrs.class"
            class="form-check-input"
        />
        <label :for="$attrs.id" class="form-check-label">
            <slot name="label">{{ label }}</slot>
        </label>
    </div>
</template>

<script setup>
    const model = defineModel({
        type: Boolean,
        required: true,
    });
    const props = defineProps({
        label: {
        type: String,
        required: true,
        },
    });
</script>