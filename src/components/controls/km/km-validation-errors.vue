<template>
  <div class="scbd-controls km-validation-errors document-validation">
    <div v-if="isAnalyzing" class="alert alert-info" role="alert">
      <i class="bi bi-gear"></i> {{ t("analyzingDocument") }}
    </div>
    <div v-if="isSaving" class="alert alert-info" role="alert">
      <i class="bi bi-gear"></i> {{ t("savingDocument") }}
    </div>
    <div v-if="!isAnalyzing && !isSaving && !errors" class="alert alert-success" role="alert">
      {{ t("valid") }}
    </div>
    <div v-if="!isAnalyzing && !isSaving">
      <div v-if="!hideErrors && errors && errors.length" class="alert alert-warning" role="alert">
        <button type="button" @click="onButtonClose" aria-label="Close" class="position-absolute top-0 end-0 m-2 bg-transparent border-0 fs-5 text-secondary">
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>
          {{ tc("contain", errors.length) }} {{ errors.length }} {{ tc("error", errors.length) }}
        </strong>

        <ul>
          <li v-for="error in errors" :title="error.parameters" :key="error">
            <span>{{ t(error?.code) || "unknown" }}</span>
            <ul v-if="error.properties">
              <li v-for="property in error.properties" :title="error.parameters" :key="property">
                <a class="text-decoration-none" href="#" @click.prevent="onJumpTo($event, property.property)">
                  {{ getLabel(property.property) }}
                </a>
              </li>
            </ul>
            <span v-if="!error.properties">
              <a class="text-decoration-none" href="#" @click.prevent="onJumpTo($event, error.property)">
                {{ getLabel(error.property) }}
              </a>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, computed, inject, ref } from "vue";
import { useI18n } from '../../../services/composables/i18n';
import messages from "../../../app-text/components/controls/km/km-validation-errors.json";

const { t, tc } = useI18n(messages);

const props = defineProps({
  errors: { type: Array, required: true },
  isSaving: { type: Boolean, required: false },
  isAnalyzing: { type: Boolean, required: false },
  allowShowErrors: { type: Boolean, default: true },
});

const $emits = defineEmits(["onJumpTo"]);

const showErrors = computed(() =>!hideErrors && props.errors && props.errors.length && props.allowShowErrors);

const hideErrors = ref(false);

const getLabel = inject("getLabel");

function onButtonClose() {
  hideErrors.value = !hideErrors.value;
}

function onJumpTo(event, field) {
  event.preventDefault;
  event.stopPropagation();
  $emits("onJumpTo", field);
}
</script>
