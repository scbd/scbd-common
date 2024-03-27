<template>
    <div class="km-multi-checkbox flex flex-col items-start justify-center w-64 border-2 p-8 rounded-lg">
      <checkbox :id="option[props.optionValueField] + makeSmallUid()" v-for="option in options" :key="option" 
            v-model = "checkStatus[option[props.optionValueField]] "         
            :label = "lstring(option[props.optionTitleField])" 
            @update:modelValue="check(option.identifier, $event)"
        />           

    </div>
    checkStatus {{ checkStatus }}<br/>
    updatedValue: {{updatedValue  }}<br/>
  </template>
  
<script setup>
    import checkbox from "./checkbox.vue";  
    import { makeSmallUid }   from '@/services/util/index'
    import { ref, defineEmits , defineProps, computed , defineModel} from "vue";
    import { lstring } from '@/services/filters/lstring'


    const model = defineModel({ type: Array,required: true });  
    const emit = defineEmits(["update:modelValue"]);

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
    
    const check = (optionId, checked) => {  
          model.value = updatedValue;
    }

    let updatedValue = computed(()=>{
  

        const newValue = [];
        for (const key in checkStatus.value) {
            if (checkStatus.value[key]){
                newValue.push({[props.optionValueField] : key});  
            }
            //console.log(`${key}: ${checkStatus[key]}`);
            }
        return newValue;

        //let updatedValue = [...model.value||[]];
        //change {"en":true}--> { "identifier":en}

        // if (checkStatus[optionId]) {          
        //         updatedValue.push({[props.optionValueField] : optionId});       
            
        // } else {
        //     index = updatedValue.indexOf({[props.optionValueField] :optionId});
        //     updatedValue.splice(index, 1);
        //     //updatedValue.splice(updatedValue.indexOf({[props.optionValueField] :optionId}), 1);
       
        // }
        // return updatedValue;
    }); 


    // format: {"en":true, "cn":false}
    let checkStatus = computed(()=>{ 
        const list = ref({});
        if (model.value){
            for (const option of props.options) {
            const id = option.identifier;
            if (model.value.some(item => item.identifier === id)) { 
                list.value [id]= true;   
            } 
            }         
            return list.value;
        }
        else{
            return {};
        }
    })
</script>
  