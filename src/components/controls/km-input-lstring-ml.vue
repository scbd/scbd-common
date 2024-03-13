<template>
  <div :id="$attrs.id" class="km-input-lstring-ml scbd-controls mb-2">
    <div v-for="(item, index) in binding" :key="item">
      <div class="row">
        <div class="col-md-11">
          <km-input-lstring
            v-model="item.value"
            :locales="props.locales"
            v-on:update:modelValue="emitChange"
          ></km-input-lstring>
        </div>
        <div class="col-md-1">
          <button
            :disabled="binding.length === 1"
            class="btn btn-danger btn-sm d-flex align-items-center justify-content-center"
            type="button"
            @click="removeItem(item, index)"
          >
            <i class="bi bi-trash"></i> {{ t("remove") }}
          </button>
        </div>
      </div>
    </div>

    <button
      class="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center"
      type="button"
      @click="addItem()"
      :disabled="hasEmpty"
    >
      <i class="bi bi-plus"></i> {{ t("add") }}
    </button>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  defineProps,
  defineEmits,
} from "vue";
import { isEmpty } from "lodash";
import KmInputLstring from "./km-input-lstring.vue";
import { removeEmpty } from "../../utils/helpers.js";

function t(str) {
  return str;
}
const props = defineProps({
  locales: {
    type: Array,
    required: true,
    validator:(value) => {
      return value.every(locale => locale.length <= 3);
    }
  },
  modelValue: {
    type: Array,
    required: false,
    default: () => [{}],
  },
  disabled: {
    type: Boolean,
    required: false,
  },
});

const emit = defineEmits(["update:modelValue"]);
const binding = ref([{ value: {} }]);
const hasEmpty = computed(() => binding.value.some((e) => isEmpty(e.value)));
function addItem() {
  binding.value.push({ value: {} });
}

function removeItem(item, index) {
  binding.value?.splice(index, 1);
}

function emitChange(value) {
  const clean = removeEmpty(binding.value);
  emit(
    "update:modelValue",
    clean?.map((e) => e.value)
  );
  if (binding.value?.length) {
    if (!binding.value.some((e) => isEmpty(e.value))) {
      addItem();
    }
  }
}

onMounted(() => {
  if (props.modelValue) {
    binding.value = props.modelValue.map((e) => {
      return { value: e };
    });
  }
});
</script>

<style scoped></style>
