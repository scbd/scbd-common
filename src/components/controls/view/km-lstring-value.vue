<template>
  <div :id="$attrs.id" class="scbd-controls km-lstring-value">
    <div :class="`input-group input-lang-${locale}`">
      <div v-if="type === 'string'" class="form-control km-value km-lstring-value-string" 
           :dir="direction(valueLstring, locale)">
            {{ valueLstring }}
      </div>
      <div v-else-if="type === 'html'" class="form-control km-value km-lstring-value-html ck-content" 
           :dir="direction(valueLstring, locale)" v-html="valueLstring">
      </div>
      <span class="input-group-text" style="cursor: default">
        <div data-toggle="tooltip" data-placement="top" :title="lstring(getTerm.title, locale)">
            <span class="d-inline-block" :tabindex="0">{{ valueLocale.toUpperCase() }}</span>
        </div>
      </span>

    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { direction, lstringLocale, lstring } from '../../../services/util/index';
//TODO: enable once ckeditor PR has been merged
// import '@scbd/ckeditor5-build-inline-full/build/content-style.css'

const props = defineProps({
  value: { type: Object, required: true },
  locale: { type: String, required: true },
  type: { type: String, default: 'string' },
});

const valueLocale = computed(() => lstringLocale(props.value, props.locale));
const valueLstring = computed(() => lstring(props.value, props.locale));

const getTerm = computed(() => {
    // TODO: use thesaraus API
    return {
        title: valueLocale.value
    }
});
</script>

<style scoped>
.form-control{
  height: auto;
}
</style>
