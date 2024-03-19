<template>
    <div :id="$attrs.id" class="scbd-controls km-value form-control">
      <slot>
        {{ value }}
      </slot>
    </div>
</template>

<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
    value: { type: String, required: true }
  });
</script>

<style scoped>
  /* Add Bootstrap styling to match the form-control class */
</style>
