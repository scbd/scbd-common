<template>
    <div class="scbd-common checkbox form-check " :class="{'form-check-inline' : $attrs.inline}">   
        <input type="checkbox"  :id="$attrs.id"  v-model="model" :value="$attrs.value"
            :required="$attrs.required"
            :indeterminate="$attrs.indeterminate"
            :disabled="$attrs.disabled"
            :class="$attrs.class"
            class="form-check-input"/>
        <label :for="$attrs.id" class="form-check-label">
            <slot name="label">{{ label }}</slot>
        </label> 
    </div>
</template>
<script setup>
    const model = defineModel({ type: Boolean,required: true });
    const props = defineProps({ label: { type: String,  required: true }});
</script>