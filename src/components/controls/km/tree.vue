<template> 
  <ul>
    <li v-if="root" >
      <checkbox v-model="root.selected" @update:modelValue="onChange($event,root)" :id="root.termId" >        
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




  const onChange=(isSelected, currentNode)=>{  
    // change status of current node
    currentNode.selected=isSelected;
  
    // change status of all children and grandchildren
    for (let i = 0; i < currentNode.narrowerTerms.length; i++) {  
      changeChildrenStatus(currentNode.narrowerTerms[i],isSelected);  
    }

    // change status of parent    
    for (let i = 0; i < currentNode.broaderTerms.length; i++) {  
      changeParentStatus(currentNode.broaderTerms[i],isSelected);  
    }
  }

  const changeChildrenStatus=(identifier, isSelected)=>{ 
    const currentNode = model.value.find(object=>object.identifier ==identifier)
    currentNode.selected = isSelected;
    //alert(currentNode.selected);
    for (let i = 0; i < currentNode.narrowerTerms.length; i++) {      
      changeChildrenStatus(currentNode.narrowerTerms[i],isSelected);  
    }     
  }

  const changeParentStatus=(identifier, isSelected)=>{ 
    //if selected ,half-selected parent or select parent if all the children selected
    //if not selected, half-selected parent or unselect parent if it is the only child
    const currentNode = model.value.find(object=>object.identifier ==identifier)
    if (isAllChildSelected(currentNode)=="true"){
      currentNode.selected = true;
    }
    else if  (isAllChildSelected(currentNode)=="false"){
      currentNode.selected = false;
    }
    else if (isAllChildSelected(currentNode)=="indeterminate"){
      var checkbox = document.getElementById(currentNode.termId);
      currentNode.selected = false;
      //TODO: why it doesn't work?
      checkbox.indeterminate = true;     
    }
   // currentNode.selected = isAllChildSelected(currentNode);      
   
    //TODO: add iterate for grandparent
  }

  const isAllChildSelected=(currentNode)=>{    
    const childNumber = currentNode.narrowerTerms.length;
    let selectedNumber = 0;    

    for (let i = 0; i < currentNode.narrowerTerms.length; i++) {   
      const id =currentNode.narrowerTerms[i];
      const child = model.value.find(object=>object.identifier ==id)    
      if (child.selected){
        selectedNumber +=1;
      }      
    } 

    if (selectedNumber ==0){
      return "false";
    }
    else if (selectedNumber ==childNumber){
      return "true";
    }
    else{   
      return "indeterminate ";
    }   
  }

  </script>