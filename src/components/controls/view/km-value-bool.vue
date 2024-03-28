<template>
  <div class="scbd-controls km-value-bool" :id="$attrs.id">
    <div :class="`input-group input-lang-${locale}`">
      <div class="form-control km-value" :dir="direction(value, locale)">
        <span v-if="value">{{ t('yes') }}</span>
        <span v-else>{{ t('no') }}</span>
      </div>
      <span class="input-group-text" style="cursor: default">
        {{ locale.toUpperCase() }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { direction } from "../../../services/util"

const props = defineProps({
  value: { type: Boolean, required: true },
  locale: { type: String, required: true }
});

function t(str){
    //use 'vue-i18n' library
    return str;
}
</script>

<style scoped>
/* Add your Bootstrap styles here */
</style>
