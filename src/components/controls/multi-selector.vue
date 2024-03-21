
<template> 
  <VueMultiselect
    v-model="selectItems"
    :label="label"
    :track-by="trackBy"
    :placeholder="placeholder"
    :open-direction="openDirection"
    :options="options"
    :group-values="groupValues"
    :group-label="groupLabel"
    :group-select="groupSelect"
    :multiple="multiple"
    :clear-on-select="clearOnSelect"
    :close-on-select="closeOnSelect"      
    :searchable="searchable"
    :disabled="disabled"
    @search-change="onEventTextChange"
    
    :custom-label="customLabel"
    :allow-empty="allowEmpty"
    deselect-label="Can't remove this value"
  > 
    <slot name="clear">
      <template slot="clear">
        <div
          v-if="selectItems.length && !disabled"
          class="multiselect__clear"
          @mousedown.prevent.stop="selectItems = null; $emit('change', null)"
        />
      </template>
    </slot>     
  </VueMultiselect>

</template>

<script setup >  
import VueMultiselect from 'vue-multiselect';
import { asArray } from   '../../services/util/index.js';
import { isEqual } from 'lodash';

import {computed, ref, defineProps, defineEmits, onMounted,defineModel} from 'vue'
const emit = defineEmits(['update:model-value', "on-select","on-remove","on-search-change","on-open", "on-close", "on-add-tag","on-value-change"]);

const props = defineProps({   
    modelValue     : {type:[ String, Array, Object ], required:true, default:() => []},
    options      : { type: Array, required: true },
    label        : { type: String },
    trackBy      : { type: String },  
    placeholder  : { type: String,  default: 'Select option' },
    openDirection: { type: String, default: 'below' },
    groupValues  : { type: String },
    groupLabel   : { type: String },
    groupSelect  : { type: Boolean, default: false },
    multiple     : { type: Boolean, default: false },
    clearOnSelect: { type: Boolean, default: true },  
    closeOnSelect: { type: Boolean, default: true },
    searchable   : { type: Boolean, default: true },
    disabled     : { type: Boolean, default: false },
    customLabel  : { type: Function,
      default (option, label) {
        // if (isEmpty(option)) return ''
        return label ? option[label] : option
      }
    },
    allowEmpty   : { type: Boolean, default: true },
    valueKey     : { type: String, required: true},
    customSelectedItem  : {type: Function,default (item) {return item;}},
    isValid      : { type: [ Boolean, Function ],  default: null },   
});

const onEventTextChange=(...args)=>{
  this.$emit('on-search-change', ...args)
};
const fetchOptions=()=>{
  this.options = this.optionsFn();
}   
let selectItems = computed({  
    get() {
      return asArray(props.modelValue).map((value) => {
        return props.options?.find((option) => {
          const customSelectedItem =props.customSelectedItem(option[props.valueKey], option);
          
          return isEqual(customSelectedItem, value);
        })
      });
    },
    set(events) {
      let ids = asArray(events).map((event) => props.customSelectedItem(event[props.valueKey], event));     
      emit('update:model-value', props.multiple ? ids : ids[0]);
    },
  }
); 
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
