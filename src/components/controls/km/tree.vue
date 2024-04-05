<template> 
  <ul>
    <li v-if="root" >
      <checkbox v-model="root.selected" @update:modelValue="onChange($event,root)" >        
        <template #label>
          {{ root.name}} 
        </template>
      </checkbox>  

      <template v-for="id in root.narrowerTerms">
        <!-- <tree v-model="model" :data="props.data" :root="props.data.find(object=> object.identifier == id )"></tree>  -->
        <tree v-model="model" :data="model" :root="model.find(object=> object.identifier == id )"></tree>     
      </template>    
    </li>
  </ul> 
 
  </template>
  
<script setup>
  import { computed } from 'vue';
  import _ from 'lodash';
  import checkbox from '../../inputs/checkbox.vue';

  //@on-change="onChange($event)" 

  const model = defineModel({type:Array, required:true});

  const props = defineProps({
    data: { type:Array, default: [] },
    root: { type: Object, require: true},
  });




  const onChange=(isSelected, parent)=>{  
    //alert(isSelected);  
    parent.selected=isSelected;
  
    for (let i = 0; i < parent.narrowerTerms.length; i++) {  
      changeChildrenStatus(parent.narrowerTerms[i],isSelected);  
    }
    
        //TODO: pass the id to this function
    //@update:modelValue="onChange($event, item.id)
    //onChange=(isSelected, id)=>{  
    //if selected , select all the children, and half-selected parent
    // if not selected,  unselect all the children, and unselect parent if it is the only child
  }


  const changeChildrenStatus=(identifier, isSelected)=>{
 
  
    // const currentNode = props.data.find(object=>object.identifier ==identifier)
    // currentNode.selected = isSelected;
    // alert(currentNode.selected);
    // for (let i = 0; i < currentNode.narrowerTerms.length; i++) {      
    //   changeChildrenStatus(currentNode.narrowerTerms[i],isSelected);  
    // } 
    
    
    const currentNode = model.value.find(object=>object.identifier ==identifier)
    currentNode.selected = isSelected;
    //alert(currentNode.selected);
    for (let i = 0; i < currentNode.narrowerTerms.length; i++) {      
      changeChildrenStatus(currentNode.narrowerTerms[i],isSelected);  
    } 
    
  }

 
  

  </script>