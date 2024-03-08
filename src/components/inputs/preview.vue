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
                    default: () =&gt; ({}), required: true, }, disabled: { type:
                    Boolean, default: false }, }); const emit =
                    defineEmits([&#x22;update:modelValue&#x22;]); const
                    userLocales = computed(() =&gt; props.locales); const
                    binding = ref(props.modelValue); const emitChange = (value)
                    =&gt; { emit(&#x22;update:modelValue&#x22;, value ||
                    binding.value); }; const loadLanguages = () =&gt; {
                    props.locales?.forEach((e) =&gt; { //TODO: call thesaurus
                    service API }); }; const getTerm = (term) =&gt; { //TODO:
                    call thesaurus service API return { title: term }; }; watch(
                    () =&gt; props.locales, (newVal, oldVal) =&gt; { const
                    deleted = without(oldVal, ...newVal); if (deleted?.length) {
                    deleted.forEach((e) =&gt; { binding.value[e] = undefined;
                    }); emitChange(); } loadLanguages(); } ); onMounted(() =&gt;
                    { binding.value = { ...props.modelValue }; loadLanguages();
                    }); const encodedHtml = &#x60; &#x26;lt;button
                    class=&#x26;quot;btn btn-default&#x26;quot;
                    @click=&#x26;quot;showLinkEditor()&#x26;quot;&amp;#x26;gt;Show
                    Link editor&amp;#x26;lt;/button&amp;#x26;gt;
                    &#x26;lt;link-editor ref=&#x26;quot;linkEditorRef&#x26;quot;
                    @close=&#x26;quot;onLinkEditorClose&#x26;quot;&amp;#x26;gt;&amp;#x26;lt;/link-editor&amp;#x26;gt;
                    &#x60;; &#x3C;/script&#x3E;
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
import KmInputLstring from "./km-input-lstring.vue";
import dateSelector from "./dateSelector.vue";
import { ref } from "vue";

const isChecked = ref(true);
const kmInputLStringModel = ref({});
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
