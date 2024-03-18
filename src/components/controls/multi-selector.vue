<template>
    <VueMultiselect
      v-model="selectedItems"
      :options="options">
      
   <!--
    :label="label"> 
      :track-by="trackBy"
      :placeholder="placeholder"
      :open-direction="openDirection"
      
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
      deselect-label="Can't remove this value" -->
    
      <!-- <slot name="clear">
        <template slot="clear">
          <div

            v-if="selectItems.value.length && !disabled"
            class="multiselect__clear"
            @mousedown.prevent.stop="selectItems = null; $emit('change', null)"
          >
          </div>
        </template>
      </slot>      -->
    </VueMultiselect>
    component page:<br/>
    selectedLanguage:{{ selectedItems }}<br/>
    options:{{ options }}<br/>
 
</template>

<script setup >  

  import VueMultiselect from 'vue-multiselect';
  // import { isEqual } from 'lodash'
  // import { asArray } from '@/utils/helpers';
  //import VueMultiselect from 'vue-multiselect';
  import { isEqual } from 'lodash';
  import _ from 'lodash';
  import {computed, ref, defineProps, defineEmits, onMounted,defineModel} from 'vue'


  const selectedItems = defineModel({type:[ String, Array, Object ], required:true, default:() => [],});

  const emit = defineEmits(["change","searchChange"]);
  const selected= ref("en");

  const props = defineProps({    
      options      : { type: Array, required: true },
      multiple     : { type: Boolean, default: false },
      trackBy      : { type: String },
      label        : { type: String },
      valueKey     : { type: String, required: true},
      searchable   : { type: Boolean, default: true },
      clearOnSelect: { type: Boolean, default: true },
      placeholder  : { type: String,  default: 'Select option' },
      closeOnSelect: { type: Boolean, default: true },
      customLabel  : { type: Function,
        default (option, label) {
          // if (isEmpty(option)) return ''
          return label ? option[label] : option
        }
      },
      customSelectedItem  : {type: Function,default (item) {return item;}},
      groupValues  : { type: String },
      groupLabel   : { type: String },
      groupSelect  : { type: Boolean, default: false },
      openDirection: { type: String, default: 'below' },
      isValid      : { type: [ Boolean, Function ],  default: null },
      disabled    : { type: Boolean, default: false },
      allowEmpty  : { type: Boolean, default: true },
  });

  const onEventTextChange=(...args)=>{
        emit('search-change', ...args)
  };
  const fetchOptions=()=>{
        props.options = props.options;
  };


  const asArray=(data)=>{
          return _([ data ])
          .flatten()
          .compact()
          .value();
  };

  // let selectItems = computed(()=>{
  //         return asArray(model.value).map((value) => {
  //           return props.options?.find((option) => {
  //             const customSelectedItem = props.customSelectedItem(option[props.valueKey], option);            
  //             return isEqual(customSelectedItem, value);
  //           })
  //         });
  // }); 

  onMounted(() => {
      emits:['update:modelValue']
  })


</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>