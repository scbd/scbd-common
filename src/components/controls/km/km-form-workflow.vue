<template>
  <div :class="{ 'dim-section': isBusy }" class="scbd-controls km-form-workflow">
    <div
      class="container mb-3"
      v-if="
        activeTab == workflowTabs.submission.index ||
        activeTab == workflowTabs.review.index ||
        activeTab == workflowTabs.publish.index
      "
    >
      <div class="row">
        <div class="col text-center">
          <button
            @click="onSaveDraft()"
            :disabled="isBusy"
            class="btn btn-primary btn-sm mr-1"
          >
            {{ t("saveDraft") }}
          </button>
          <button
            @click="onReviewDocument()"
            :disabled="isBusy"
            class="btn btn-primary btn-sm mr-1"
          >
            {{ t("review") }}
          </button>
          <button
            @click="onClose()"
            :disabled="isBusy"
            class="btn btn-danger btn-sm mr-1"
          >
            {{ t("close") }}
          </button>
        </div>
        <!-- TODO: need to add km-validation-errors -->
      </div>
    </div>
    <km-form-wizard @on-tab-change="onChangeCurrentTab" ref="formWizard">
      <div>
        <km-form-wizard-tab-content
          :title="workflowTabs.introduction.title"
          :is-active="activeTab === workflowTabs.introduction.index"
        >
          <slot name="introduction"></slot>
        </km-form-wizard-tab-content>
        <km-form-wizard-tab-content
          :title="workflowTabs.submission.title"
          :is-active="activeTab === workflowTabs.submission.index"
        >
          <slot name="submission"></slot>
        </km-form-wizard-tab-content>
      </div>
    </km-form-wizard>
    <div
      class="container mt-3"
      v-if="
        activeTab == workflowTabs.submission.index ||
        activeTab == workflowTabs.review.index ||
        activeTab == workflowTabs.publish.index
      "
    >
      <div class="row">
        <!-- TODO: need to add km-validation-errors -->
        <div class="col text-center">
          <button
            @click="onSaveDraft()"
            :disabled="isBusy"
            class="btn btn-primary btn-sm mr-1"
          >
            {{ t("saveDraft") }}
          </button>
          <button
            @click="onReviewDocument()"
            :disabled="isBusy"
            class="btn btn-primary btn-sm mr-1"
          >
            {{ t("review") }}
          </button>
          <button
            @click="onClose()"
            :disabled="isBusy"
            class="btn btn-danger btn-sm mr-1"
          >
            {{ t("close") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, toRefs, useAttrs } from "vue";
import KmFormWizardTabContent from "./km-form-wizard-tab-content.vue";
import KmFormWizard from "./km-form-wizard.vue";
import { useToast } from "../../../services/composables/useToast";
import { scrollToElement } from "../../../services/util";

// TODO: NUXT
const toast = useToast();

const workflowTabs = {
  // use individual compute so that on language change the text is updated
  introduction: { index: 0, title: computed(() => t("introduction")) },
  submission: { index: 1, title: computed(() => t("submission")) },
  review: { index: 2, title: computed(() => t("review")) },
  publish: { index: 3, title: computed(() => t("publish")) },
};

const definedProps = defineProps({
  focusedTab: { type: Number, default: 0 },
  tab: { type: String },
  // validationReport            : { type:Object,   required:true  },
  document: { type: Object, required: true },
  onPreClose: { type: Function, required: false },
  onPostClose: { type: Function, required: false },
  onPreRevert: { type: Function, required: false },
  onPostRevert: { type: Function, required: false },
  onPreSaveDraft: { type: Function, required: false },
  onPostSaveDraft: { type: Function, required: false },
  onPreRequest: { type: Function, required: false },
  onPostRequest: { type: Function, required: false },
  onPrePublish: { type: Function, required: false },
  onPostPublish: { type: Function, required: false },
  onError: { type: Function, required: false },
  onStepChange: { type: Function, required: false },
  onReviewLanguageChange: { type: Function, required: false },
  onPreSaveDraftVersion: { type: Function, required: false },
});
let { focusedTab, tab, ...props } = toRefs(definedProps);

function t(lang) {
  return lang;
}

const activeTab = ref(focusedTab.value);
const onChangeCurrentTab = (index) => {
  activeTab.value = index;
};

let originalDocument = null;
const container = useAttrs().container ?? "body,html";
const validationReport = ref({});
const formWizard = ref(null);

async function onReviewDocument(tabChanged) {
  if (!tabChanged && activeTab.value == workflowTabs.review.index) return;

  activeTab.value = workflowTabs.review.index;

  validationReport.value = { isAnalyzing: true };
  const document = props.document;

  const validationResponse = await validate(document.value);
  if (validationResponse && validationResponse?.errors?.length) {
    validationReport.value = { ...validationResponse };
    // $scope.tab = "review";
  } else validationReport.value = {};
  // $eventBus.emit("onReviewError", validationResponse);
}

async function onSaveDraft() {
  try {
    validationReport.value = { isSaving: true };
    let document = props.document;

    // onPreSaveDraft
    if (definedProps.onPreSaveDraft)
      document = await definedProps.onPreSaveDraft(document);

    // save document
    // const documentSaveResponse = await EditFormUtility.saveDraft(
    //   document.value
    // );
    originalDocument = { ...document.value };

    // onPostSaveDraft
    if (definedProps.onPostSaveDraft)
      await definedProps.onPostSaveDraft({
        ...documentSaveResponse,
        body: { ...originalDocument },
      });

    toast.success(t("draftSaveMessage"), { position: "top-right" });
  } catch (e) {
    toast.error("Error saving draft record", { position: "top-right" });
    // useLogger().error(e);
  }
  validationReport.value = {};
}

async function onClose() {
  let redirectTo = undefined;

  if (definedProps.onPreClose)
    redirectTo = await definedProps.onPreClose(originalDocument);

  if (redirectTo.value) await useNavigateAppTo(redirectTo.value);
}

async function validate(document) {
  try {
    if (!document) throw "Invalid document";

    // const { $api } = useNuxtApp();
    // const data = await $api.kmStorage.documents.validate(document);

    // return data;
  } catch (e) {
    // useLogger().error(e);
    toast.error(
      "Error occurred while validating your record, please save your data and try again."
    );
  }
}

async function onJumpTo(field) {
  //change tab to review
  if (activeTab.value != workflowTabs.submission.index) {
    // formWizard.value?.selectTab(workflowTabs.submission.index);
  }

  setTimeout(() => {
    scrollToElement(
      "form[name='editForm'] label[for='" + field + "']:first",
      container
    );
  }, 200);
}

function articleQuery() {
  const document = props.document.value();
  // const realmConfStore = useRealmConfStore();
  // const realmConf = realmConfStore.realmConf;
  // const ag = [];
  // ag.push({
  //   $match: {
  //     adminTags: {
  //       $all: [
  //         "edit-form",
  //         encodeURIComponent(
  //           realmConf.realm.toLowerCase().replace(/(\-[a-zA-Z]{1,5})/, "")
  //         ),
  //         encodeURIComponent(
  //           document.value?.header?.schema?.toLowerCase() || ""
  //         ),
  //       ],
  //     },
  //   },
  // });
  ag.push({ $project: { title: 1, content: 1, _id: 1 } });

  return {
    ag: JSON.stringify(ag),
  };
}

const isBusy = computed(
  () => validationReport.value?.isSaving || validationReport.value?.isAnalyzing
);

onMounted(() => {
  // Add any necessary logic here
  // formWizard.value?.selectTab(focusedTab.value ?? 0);
});

//TODO: need to do VUE-Router
// onBeforeRouteLeave((to, from) => {
//   const answer = window.confirm(
//     "Do you really want to leave? You have unsaved changes!"
//   );
//   if (!answer) return false;
// });
</script>

<style>
.form-wizard-vue .fw-body {
  border-top: 1px solid #eee;
}
.fw-overflow-scroll .fw-body-list:hover {
  overflow-x: auto;
}
.form-wizard-vue .fw-body-content {
  padding: 5px;
}
.dim-section {
  pointer-events: none;
  opacity: 0.4;
}
</style>
