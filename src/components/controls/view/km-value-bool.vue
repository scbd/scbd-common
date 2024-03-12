<template>
  <div class="km-value-bool">
    <div :class="`input-group input-lang-${locale}`">
      <div class="form-control km-value" :dir="direction(value, locale)" aria-describedby="basic-addon1">
        <span v-if="value">{{ t('yes') }}</span>
        <span v-else>{{ t('no') }}</span>
      </div>
      <span class="input-group-text" id="basic-addon1" style="cursor: default">
        {{ locale.toUpperCase() }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRefs } from 'vue';

const props = defineProps({
  value: { type: Boolean, required: true },
  locale: { type: String, required: true }
});

function t(str){
    //use 'vue-i18n' library
    return str;
}

const direction = (value, locale) => {
  // Add your logic for determining direction based on locale
  // For example:
  return locale.value === 'ar' ? 'rtl' : 'ltr';
};
</script>

<style scoped>
/* Add your Bootstrap styles here */
</style>
