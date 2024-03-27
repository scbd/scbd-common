<template>
  <div v-if="isActive" class="scbd-controls km-form-wizard-tab-content" :id="$attrs.id">
    <slot></slot>
  </div>
</template>

<script setup>
import { inject, defineProps, onMounted } from "vue";

const props = defineProps({
  isActive: { type:Boolean, default: false },
  title: { type: String, required: true },
});

onMounted(() => {
  const addTab = inject("addFormWizardTabKey");

  addTab({
    title: props.title,
    isActive: props.isActive,
  });
});
</script>

<style scoped>

</style>
