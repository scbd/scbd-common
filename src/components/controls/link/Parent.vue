<template>
    <div>
      <Child ref="childComponent" />
  
      <button @click="handleAdd">Add</button>
      <button @click="handleReset">reset</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Child from './Child.vue';
  
  const childComponent = ref(null);
  
  const handleAdd = () => {
    // Access the child button using the template ref


    childComponent.value.add();
    //childComponent.$refs.add();
    // if (childComponent) {
    //   childComponent.value.$refs.myButton.focus();
    // }
  };

  const handleReset = () => {
     childComponent.value.reset();
 
  };
  </script>