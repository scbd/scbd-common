<template>
    <!-- <button ref="myButton">Click me!</button> -->
     {{x}}
  </template>
  
  <script setup>
  // No need to import anything in the script setup block
  import {ref} from 'vue'
  let x = ref(0);
  const add= ()=>{      
    //alert("add");
    x.value +=1;
    console.log(x.value);
  }

  const reset= ()=>{      
    //alert("reset");
    x.value =0;
    console.log(x.value);
  }

  defineExpose({

  add,
  reset
})
  </script>