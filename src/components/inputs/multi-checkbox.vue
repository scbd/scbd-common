<template>
    <div class="km-multi-checkbox flex flex-col items-start justify-center w-64 border-2 p-8 rounded-lg">     
        <checkbox :id="option[props.optionValueField] + makeSmallUid()" v-for="option in options" :key="option"  v-model="model"
            :value = "{[props.optionValueField] :option[props.optionValueField]}"                 
            :label = "lstring(option[props.optionTitleField])"            
        />  
    </div>
  </template>
  
<script setup>
    import checkbox from "./checkbox.vue";  
    import { makeSmallUid }   from '@/services/util/index'
    import {  defineProps,  defineModel} from "vue";
    import { lstring } from '@/services/filters/lstring'; 

    const model = defineModel({ type: Array,required: true });   

    const props = defineProps({       
        options: { type: Array, required: true,
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
        optionValueField: { type:String, default:'identifier'},
        optionTitleField: { type:String, default:'title' }
    });  
</script>
  