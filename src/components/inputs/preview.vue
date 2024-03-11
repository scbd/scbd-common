<template>
  <div>
    <h3>CBD input components</h3>

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">Checkbox</div>
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                <checkbox v-model="isChecked">
                  <template #label>
                    <!-- Content for the label slot -->
                    This is the label slot
                  </template>
                </checkbox>
              </div>
              <div class="col-4">
                <strong>sample code</strong>
                <textarea rows="10" cols="80" class="bg-purple text-white">
 
                                    <template>
                                        <div class="form-check">
                                            <input
                                                type="checkbox"
                                                v-model="model"
                                                :id="$attrs.id"
                                                :required="$attrs.required"
                                                :disabled="$attrs.disabled"
                                                :class="$attrs.class"
                                                class="form-check-input"
                                            />
                                            <label :for="$attrs.id" class="form-check-label">
                                                <slot name="label">{{
                    label
                  }}</slot>
                                            </label>
                                        </div>
                                    </template>

                                    <script setup>
                                        const model = defineModel({
                                            type: Boolean,
                                            required: true,
                                        });
                                        const props = defineProps({
                                            label: {
                                            type: String,
                                            required: true,
                                            },
                                        });
                                    </script>

                                </textarea
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">Date Selector</div>
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                <date-selector class="test" v-model="dateValue"></date-selector>
                <div>Selected value : {{ dateValue }}</div>
              </div>
              <div class="col-4">
                <strong>Date selector sample code</strong>
                <textarea rows="10" cols="80" class="bg-purple text-white">
 
                                <template>    
                                    <input    
                                        v-model="model"
                                        :class="$attrs.class"
                                        :id="$attrs.id"
                                        :required="$attrs.required" 
                                        :placeholder="$attrs.placeholder"
                                        :disabled="$attrs.disabled"
                                        :type="type" /> 
                                </template>
                                <script setup>
                                    const model = defineModel();    
                                    const props = defineProps({
                                        type:{
                                            type:String,
                                            default:"date",
                                            validator(value) { 
                                                return ['date', 'month'].includes(value)
                                            }
                                        }   
                                    });
                                </script>
                                </textarea
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">KmInputLString</div>
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                <km-input-lstring
                  v-model="kmInputLStringModel"
                  :locales="locales"
                >
                </km-input-lstring>
              </div>
              <div class="col-6">
                <div class="callout callout-warning">
                  <code>
                    &#x3C;template&#x3E; &#x3C;div :id=&#x22;$attrs.id&#x22;
                    class=&#x22;scbd-controls km-input-lstring mb-2&#x22;&#x3E;
                    &#x3C;slot&#x3E;&#x3C;/slot&#x3E; &#x3C;div
                    class=&#x22;input-group mb-1&#x22; v-for=&#x22;locale in
                    userLocales&#x22; :key=&#x22;locale&#x22;
                    :class=&#x22;&#x60;km-input-lstring-${locale}&#x60;&#x22;
                    &#x3E; &#x3C;input type=&#x22;text&#x22;
                    class=&#x22;form-control&#x22;
                    aria-describedby=&#x22;basic-addon2&#x22;
                    v-model=&#x22;binding[locale]&#x22; :dir=&#x22;locale ==
                    &#x27;ar&#x27; ? &#x27;rtl&#x27; : &#x27;ltr&#x27;&#x22;
                    @update:modelValue=&#x22;emitChange&#x22; /&#x3E; &#x3C;div
                    class=&#x22;input-group-append&#x22;&#x3E; &#x3C;button
                    class=&#x22;btn btn-outline-primary&#x22;
                    type=&#x22;button&#x22; id=&#x22;basic-addon2&#x22;
                    :data-bs-toggle=&#x22;&#x27;tooltip&#x27;&#x22;
                    :data-bs-placement=&#x22;&#x27;top&#x27;&#x22;
                    :title=&#x22;getTerm(locale).title&#x22; &#x3E;
                    &#x3C;/button&#x3E; &#x3C;/div&#x3E; &#x3C;/div&#x3E;
                    &#x3C;/div&#x3E; &#x3C;/template&#x3E; &#x3C;script
                    setup&#x3E; import { ref, watch, onMounted, defineEmits,
                    computed } from &#x22;vue&#x22;; import { without } from
                    &#x22;lodash&#x22;; const props = defineProps({ locales: {
                    type: Array, required: true }, modelValue: { type: Object,
                    default: () =&#x3E; ({}), required: true, }, disabled: {
                    type: Boolean, default: false }, }); const emit =
                    defineEmits([&#x22;update:modelValue&#x22;]); const
                    userLocales = computed(() =&#x3E; props.locales); const
                    binding = ref(props.modelValue); const emitChange = (value)
                    =&#x3E; { emit(&#x22;update:modelValue&#x22;, value ||
                    binding.value); }; const loadLanguages = () =&#x3E; {
                    props.locales?.forEach((e) =&#x3E; { //TODO: call thesaurus
                    service API }); }; const getTerm = (term) =&#x3E; { //TODO:
                    call thesaurus service API return { title: term }; }; watch(
                    () =&#x3E; props.locales, (newVal, oldVal) =&#x3E; { const
                    deleted = without(oldVal, ...newVal); if (deleted?.length) {
                    deleted.forEach((e) =&#x3E; { binding.value[e] = undefined;
                    }); emitChange(); } loadLanguages(); } ); onMounted(()
                    =&#x3E; { binding.value = { ...props.modelValue };
                    loadLanguages(); }); &#x3C;/script&#x3E;
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">KmInputLStringML</div>
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                <km-input-lstring-ml
                  v-model="kmInputLStringMLModel"
                  :locales="locales"
                >
                </km-input-lstring-ml>
              </div>
              <div class="col-6">
                <div class="callout callout-warning">
                  <code>
                    &#x3C;template&#x3E; &#x3C;div :id=&#x22;id&#x22;
                    class=&#x22;km-input-lstring-ml mb-2&#x22;&#x3E; &#x3C;div
                    v-for=&#x22;(item, index) in binding&#x22;
                    :key=&#x22;item&#x22;&#x3E; &#x3C;div
                    class=&#x22;row&#x22;&#x3E; &#x3C;div
                    class=&#x22;col-md-11&#x22;&#x3E; &#x3C;km-input-lstring
                    v-model=&#x22;item.value&#x22;
                    :locales=&#x22;props.locales&#x22;
                    @update:modelValue=&#x22;emitChange&#x22;
                    &#x3E;&#x3C;/km-input-lstring&#x3E; &#x3C;/div&#x3E;
                    &#x3C;div class=&#x22;col-md-1&#x22;&#x3E; &#x3C;button
                    :disabled=&#x22;binding.length === 1&#x22; class=&#x22;btn
                    btn-danger btn-sm&#x22; type=&#x22;button&#x22;
                    @click=&#x22;removeItem(item, index)&#x22; &#x3E;
                    &#x3C;font-awesome-icon icon=&#x22;fa-solid fa-trash&#x22;
                    /&#x3E; &#x3C;/button&#x3E; &#x3C;/div&#x3E;
                    &#x3C;/div&#x3E; &#x3C;/div&#x3E; &#x3C;button
                    class=&#x22;btn btn-outline-secondary-btn-sm&#x22;
                    type=&#x22;button&#x22; @click=&#x22;addItem()&#x22;
                    :disabled=&#x22;hasEmpty&#x22; &#x3E;
                    &#x3C;font-awesome-icon icon=&#x22;fa-solid fa-plus&#x22;
                    /&#x3E; &#x3C;/button&#x3E; &#x3C;/div&#x3E;
                    &#x3C;/template&#x3E; &#x3C;script setup&#x3E; import { ref,
                    computed, onMounted, defineProps, defineEmits, useAttrs, }
                    from &#x22;vue&#x22;; import { isEmpty } from
                    &#x22;lodash&#x22;; import KmInputLstring from
                    &#x22;./km-input-lstring.vue&#x22;; import { removeEmpty }
                    from &#x22;@/utils/helpers.ts&#x22;; function t(str) {
                    return str; } const props = defineProps({ locales: { type:
                    Array, required: true, }, modelValue: { type: Array,
                    required: false, default: () =&#x3E; [{}], }, disabled: {
                    type: Boolean, required: false, }, }); const emit =
                    defineEmits([&#x22;update:modelValue&#x22;]); const binding
                    = ref([{ value: {} }]); const id = computed(() =&#x3E;
                    useAttrs().id); const hasEmpty = computed(() =&#x3E;
                    binding.value.some((e) =&#x3E; isEmpty(e.value))); function
                    addItem() { binding.value.push({ value: {} }); } function
                    removeItem(item, index) { binding.value?.splice(index, 1); }
                    function emitChange(value) { const clean =
                    removeEmpty(binding.value); emit(
                    &#x22;update:modelValue&#x22;, clean?.map((e) =&#x3E;
                    e.value) ); if (binding.value?.length) { if
                    (!binding.value.some((e) =&#x3E; isEmpty(e.value))) {
                    addItem(); } } } onMounted(() =&#x3E; { if
                    (props.modelValue) { binding.value =
                    props.modelValue.map((e) =&#x3E; { return { value: e }; });
                    } }); &#x3C;/script&#x3E; &#x3C;style
                    scoped&#x3E;&#x3C;/style&#x3E;
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//Checkbox
import checkbox from "./checkbox.vue";
import kmInputLstring from "./km-input-lstring.vue";
import kmInputLstringML from "./km-input-lstring-ml.vue";
import dateSelector from "./dateSelector.vue";
import { ref } from "vue";

const isChecked = ref(true);
const kmInputLStringModel = ref({});
const kmInputLStringMLModel = ref({});
const locales = ref(["en", "fr"]);
//dateSelector
const dateValue = ref("2024-02-06");
</script>

<style lang="scss" scoped></style>

<!-- <div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header">
                
            </div>
            <div class="card-body"> 
                <div class="row">
                   <div class="col-6">
                        
                    </div>
                    <div class="col-6">
                        <div class="callout callout-warning">
                            <code>                                    
                                ///HTML Escape////
                            </code>   
                        </div>                                                            
                    </div>
                </div>
            </div>               
        </div>
    </div>        
</div> -->
