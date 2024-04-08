<template>   
    <tree v-model="model" :data="data" :root="data[0]"  ></tree>    

</template>
  
  <script setup>
    import { ref, onMounted} from 'vue';
    import tree from './tree.vue';
    import { terms } from './terms.js';

    const model = defineModel({type:Array, required:true});
    let data = [];
    
    onMounted(() => {
      data = terms.map(obj => {
          return {
            ...obj,  
            selected: false,
            indeterminate:false
          };
        });  
      model.value = data;
    }) 
   
  </script>