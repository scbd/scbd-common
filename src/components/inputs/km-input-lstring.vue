<template>
  <div :id="$attrs.id" class="km-input mb-2">
    <slot></slot>
    <div
      class="input-group mb-1"
      v-for="locale in locales"
      :key="locale"
      :class="`km-input-${locale}`"
    >
      <input
        type="text"
        class="form-control"
        aria-describedby="basic-addon2"
        v-model="binding[locale]"
        :dir="locale == 'ar' ? 'rtl' : 'ltr'"
        @update:modelValue="emitChange"
      />

      <div class="input-group-append">
        <button
          class="btn btn-outline-primary"
          type="button"
          id="basic-addon2"
          :data-bs-toggle="'tooltip'"
          :data-bs-placement="'top'"
          :title="getTerm(locale).title"
        >
          {{ locale.toUpperCase() }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, defineEmits, computed } from "vue";
import { without } from "lodash";

const props = defineProps({
  locales: { type: Array, required: true },
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue"]);

const userLocales = computed(() => props.locales);
const binding = ref(props.modelValue);

const emitChange = (value) => {
  emit("update:modelValue", value || binding.value);
};

const loadLanguages = () => {
  props.locales?.forEach((e) => {
    //TODO: call thesaurus service API
  });
};

const getTerm = (term) => {
  //TODO: call thesaurus service API
  return { title: term };
};

watch(
  () => props.locales,
  (newVal, oldVal) => {
    const deleted = without(oldVal, ...newVal);
    if (deleted?.length) {
      deleted.forEach((e) => {
        binding.value[e] = undefined;
      });
      emitChange();
    }
    loadLanguages();
  }
);

onMounted(() => {
  binding.value = { ...props.modelValue };
  loadLanguages();
});
</script>
