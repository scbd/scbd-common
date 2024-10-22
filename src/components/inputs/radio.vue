<template>
    <div class="scbd-common radio form-check" :class="{'form-check-inline': attrs.inline}">
        <input type="radio" :id="attrs.id" v-model="model" :value="attrs.value"
            :required="attrs.required"
            :disabled="attrs.disabled"
            :class="attrs.class"
            class="form-check-input"/>
        <label :for="attrs.id" class="form-check-label">
            <slot name="label">{{ label }}</slot>
        </label>
    </div>
</template>

<script setup lang="ts"> 

    import { useAttrs } from 'vue';
    const model = defineModel<string>({ required: true });
    defineProps<{ label?: string }>();
    
    const attrs = useAttrs() as {
        id?: string;
        value?: string;
        required?: boolean;
        disabled?: boolean;
        class?: string;
        inline?: boolean;
    };
</script>
