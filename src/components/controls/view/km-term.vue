<template>
  <span class="scbd-controls km-term">
    <div v-if="error" class="alert alert-danger" role="alert">Error loading term {{ value.identifier }}</div>
    {{ lstring(term, locale) }}
    <slot name="help" :term="term"></slot>
  </span>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import { lstring } from "../../../services/util/index";

const emit = defineEmits(['onTermLoad']);
const props = defineProps({
  value: { type: Object, required: true },
  locale: { type: String, required: true },
});

const term = ref(null);
const error = ref(null);

if (!props.value?.identifier || props.value) {
    try {
      // TODO: Use thesaurus API
      // term = await  thesaurusStore.loadTerm(value.value?.identifier||value.value);
      term.value = { title: 'SCBD Term' }; 
      if (term.value) {
        emit('onTermLoad', term.value);
      }
      //TODO: Use Thesaurus API
    } catch (error) {
      error.value = error;
      console.error(`Error loading term ${value.value}`, error);
    }
  }
</script>

<style scoped>
/* Add scoped styles if needed */
</style>
