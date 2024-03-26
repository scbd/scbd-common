<template>
    <div class="km-multi-checkbox flex flex-col items-start justify-center w-64 border-2 p-8 rounded-lg">
        <checkbox :field-id="option[optionValueField] + makeSmallUid()" v-for="option in options" :key="option"
            :checked="modelValue && modelValue.find(e=>e[optionValueField] == option[optionValueField])"
            @update:modelValue="check(option[optionValueField], $event)"> 
            {{ lstring(option[optionTitleField]) }}
        </checkbox>
    </div>
  </template>
  
<script setup>
    import checkbox from "./checkbox.vue";  
    import { makeSmallUid }   from '@/services/util/index'
    import { defineEmits , defineProps } from "vue";
    import { lstring } from '@/services/filters/lstring'


    const model = defineModel({ type: Array,required: true });  
    const emit = defineEmits(["update:modelValue"]);

    const props = defineProps({       
        options: {
        type: Array,
        required: true,
        validator: (modelValue, props) => {
          const hasNameKey = modelValue.every((option) =>
            Object.keys(option).includes(props.optionValueField)
          );
          const hasIdKey = modelValue.every((option) =>
            Object.keys(option).includes(props.optionTitleField)
          );
          return hasNameKey && hasIdKey;
        },
      },
      optionValueField: {
        type:String,
        default:'identifier'
      },
      optionTitleField: {
        type:String,
        default:'title'
      }
    });  
    
    const check = (optionId, checked) => {    
        let updatedValue = [...model.value||[]];
        if (checked) {
            updatedValue.push({[props.optionValueField] : optionId});
        } else {
            updatedValue.splice(updatedValue.indexOf({[props.optionValueField] :optionId}), 1);
        }
        emit("update:modelValue", updatedValue);     
    }; 

</script>
  