<template>
    <ul>
      <li v-for="(item, index) in props.data" :key="index">
        <checkbox v-model="item.selected" @update:modelValue="onChange($event)" >        
          <template #label>
            {{ item.name }} 
          </template>
        </checkbox>      
        <template v-if="item.children">
          <tree :data="item.children"></tree>   
        </template>
      </li>
    </ul>
  </template>
  
<script setup>
  import checkbox from '../../inputs/checkbox.vue';
  //@on-change="onChange($event)" 

  const props = defineProps({
    data: { type:Array, default: [] }
  });

  const onChange=(isSelected, id)=>{  
    alert(isSelected);    
    //TODO: pass the id to this function
    //@update:modelValue="onChange($event, item.id)
    //onChange=(isSelected, id)=>{  
    //if selected , select all the children, and half-selected parent
    // if not selected,  unselect all the children, and unselect parent if it is the only child
  }

  </script>