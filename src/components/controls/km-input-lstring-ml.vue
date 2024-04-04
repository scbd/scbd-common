<template>
  <div :id="$attrs.id" class="scbd-controls km-input-lstring-ml" :class="$attrs.class">
    <div v-for="(item, index) in binding" :key="item">
      <div class="row">
        <div class="col-md-11">
          <km-input-lstring
            v-model="item.value"
            :locales="props.locales"
            @update:modelValue="emitChange"
          ></km-input-lstring>
        </div>
        <div class="col-md-1">
          <button
            :disabled="index == binding.length-1"
            class="btn btn-danger btn-sm"
            type="button"
            @click="removeItem(item, index)"
          >
            <i class="bi bi-trash"></i> {{ t("remove") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  defineProps,
  defineEmits,
} from "vue";
import { isEmpty } from "lodash";
import KmInputLstring from "./km-input-lstring.vue";
import { removeEmpty } from "../../services/util";
import { useI18n } from "../../services/composables/i18n"
import messages from "../../app-text/components/controls/km-input-lstring-ml.json"
const { t } = useI18n({ messages });

const props = defineProps({
  locales: {
    type: Array,
    required: true,
    validator:(value) => {
      return value.every(locale => locale.length <= 3); // we use ISO-2 but need support for ISO-3
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

function addItem() {
  binding.value.push({ value: {} });
}

function removeItem(item, index) {
  binding.value?.splice(index, 1);
}

function emitChange(value) {
  const clean = removeEmpty(binding.value);
 
  emit("update:modelValue", clean?.map((e) => e.value));

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
