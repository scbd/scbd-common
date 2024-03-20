<template>
  <div :id="$attrs.id" class="scbd-controls km-value-term">
    <div :class="`input-group input-lang-${locale}`">
      <div class="form-control km-value" :dir="direction(kmInitializeTerm?.title, locale)">
        <km-term :value="value" :locale="locale" @on-term-load="onTermLoad">
        </km-term>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { direction } from "../../../services/util/index"
import KmTerm from './km-term.vue';

const props = defineProps({
  value: { type: Object, required: true },
  locale: { type: String, required: true },
});
const termValue = ref(null);

const onTermLoad = function(term){
    kmInitializeTerm.value = { title: 'SCBD Term' }
    // thesaurusStore.loadTerm(`lang-${term}`);
}
</script>

<style scoped>
/* Add any scoped styles here */
</style>
