<template>
  <div class="scbd-controls km-validation-errors document-validation">
    <div
      v-if="reports && reports.isAnalyzing"
      class="alert alert-info"
      role="alert"
    >
      <i class="bi bi-gear"></i> {{ t("analyzingDocument") }}
    </div>
    <div
      v-if="reports && reports.isSaving"
      class="alert alert-info"
      role="alert"
    >
      <i class="bi bi-gear"></i> {{ t("savingDocument") }}
    </div>
    <div
      v-if="
        reports && !reports.isAnalyzing && !reports.isSaving && !reports.errors
      "
      class="alert alert-success"
      role="alert"
    >
      {{ t("valid") }}
    </div>
    {{ reports }} --- {{ internalReports }}
    <div v-if="reports && !reports.isAnalyzing && !reports.isSaving">
      <div
        v-if="!hideErrors && reports && reports.errors && reports.errors.length"
        class="alert alert-warning"
        role="alert"
      >
        <button
          type="button"
          @click="onButtonClose"
          aria-label="Close"
          class="
            position-absolute
            top-0
            end-0
            m-2
            bg-transparent
            border-0
            fs-5
            text-secondary
          "
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>
          {{ t("contains") }} {{ reports.errors.length }} {{ t("errors") }}
        </strong>

        <ul>
          <li
            v-for="error in reports.errors"
            :title="error.parameters"
            :key="error"
          >
            <span>{{ t(getTranslation(error)) }}</span>
            <ul v-if="error.properties">
              <li
                v-for="property in error.properties"
                :title="error.parameters"
                :key="property"
              >
                <a
                  class="text-decoration-none"
                  rel="noopener"
                  href="#"
                  @click="jumpTo($event, property.property)"
                >
                  {{ getLabel(property.property) }}
                </a>
              </li>
            </ul>
            <span v-if="!error.properties">
              <a
                class="text-decoration-none"
                rel="noopener"
                href="#"
                @click="jumpTo($event, error.property)"
              >
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
import { useAttrs, defineEmits, defineProps, ref, computed } from "vue";
import $ from "jquery";

const props = defineProps({
  reports: { type: Object, required: true },
});
const $emits = defineEmits(["onJumpTo"]);
const hideErrors = computed({
  get() {
    return props.reports.hideErrors;
  },
  set(newValue) {
    props.reports.hideErrors = newValue;
  },
});
const container = useAttrs().container ?? "body,html";

function t(lang) {
  return lang;
}
function getTranslation(error) {
  if (error?.code === null) return "unknown";
  if (error?.code == "Error.Mandatory") return "mandatory";
  if (error?.code == "Error.MandatoryAnyOf") return "mandatoryAnyOf";
  if (error?.code == "Error.InvalidValue") return "invalidValue";
  if (error?.code == "Error.InvalidProperty") return "invalidProperty";
  if (error?.code == "Error.UnspecifiedLocale") return "unspecifiedLocale";
  if (error?.code == "Error.UnexpectedTerm") return "unexpectedTerm";
  if (error?.code == "Error.InvalidType") return "invalidType";

  return error?.code;
}

function onButtonClose() {
  hideErrors.value = !hideErrors.value;
}

function jumpTo(event, field) {
  event.preventDefault;
  event.stopPropagation();
  $emits("onJumpTo", field);
}

function getLabel(field) {
  var qLabel = $(container).find(
    "form[name='editForm'] label[for='" + field + "']:first"
  );
  if (qLabel.length > 0) return qLabel.text();

  return field;
}
</script>

<style scoped></style>
