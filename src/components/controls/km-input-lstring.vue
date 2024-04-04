<template>
  <div :id="$attrs.id" class="scbd-controls km-input-lstring" :class="$attrs.class">
    <slot></slot>
    <div class="input-group mb-1" v-for="locale in locales" :key="locale" :class="`km-input-lstring-${locale}`">
      <input v-if="rows==1" type="text" class="form-control" aria-describedby="basic-addon2" v-model="model[locale]" :dir="locale == 'ar' ? 'rtl' : 'ltr'" @input="$emit('update:modelValue', model)">
      </input>
      <textarea  v-if="rows>1"  class="form-control" placeholder=""  v-model="model[locale]" :dir="locale == 'ar' ? 'rtl' : 'ltr'" @input="$emit('update:modelValue', model)">        
      </textarea>

      <div class="input-group-append">
        <button class="btn btn-outline-primary" type="button" id="basic-addon2" :data-bs-toggle="'tooltip'" :data-bs-placement="'top'" :title="getTerm(locale).title">
          {{ locale.toUpperCase() }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, onMounted } from "vue";
import { without } from "lodash";

const model = defineModel({type:Object, required: true, default:{}})
const props = defineProps({
  locales:  { type: Array, required: true },
  disabled: { type: Boolean, default: false },
  rows:     { type: Number, default: 1 }
});

const loadLanguages = () => {
  props.locales?.forEach((e) => {
    //TODO: call thesaurus service API
  });
};

const getTerm = (term) => {
  //TODO: call thesaurus service API
  return { title: term };
};

watch(()=>props.locales,
  (newVal, oldVal) => {
    const deleted = without(Object.keys(model.value), ...newVal);
    if (deleted?.length) {
      deleted.forEach((e) => {
        model.value[e] = undefined;
      });
    }
    loadLanguages();
  }, {deep:true}
);

onMounted(() => {
  loadLanguages();
});
</script>
