<template>
  <div :id="$attrs.id" class="scbd-controls km-value-terms d-grid gap-1 ">
    <div v-for="term in value" :key="term">
      <km-value-term :value="term" :locale="locale"></km-value-term>
    </div>
  </div>
</template>

<script setup>
import KmValueTerm from './km-value-term.vue';
import { defineProps } from 'vue';

const props = defineProps({
  value: { type: Array, required: true },
  locale: { type: String, required: true },
});
</script>

<style scoped>
/* Add scoped styles here */
</style>
