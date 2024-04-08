<template> 
  <ul>
    <li v-if="root" >
      <checkbox v-model="root.selected" @update:modelValue="onChange($event,root)" :id="root.termId" :indeterminate="root.indeterminate"  >    
       <template #label>
          {{ root.name}}{{ rootIdt }}
        </template>
      </checkbox>  

      <template v-for="id in root.narrowerTerms">
          <tree v-model="model" :data="model" :root="model.find(object=> object.identifier == id )"></tree>     
      </template>    
    </li>
  </ul>  
</template>
  
<script setup>

  import checkbox from '../../inputs/checkbox.vue';
  import { defineEmits, computed } from 'vue';
  
 
  const model = defineModel({type:Array, required:true});

  const props = defineProps({
    data: { type:Array, default: [] },
    root: { type: Object, require: true},
  });


  const selectAll= "true";
  const unSelectAll = "false";
  const halfSelect = "indeterminate";

  
  const onChange=(isSelected, currentNode)=>{  
    // change status of current node
    currentNode.selected=isSelected;
  
    // change status of all children and grandchildren
    for (let i = 0; i < currentNode.narrowerTerms.length; i++) {  
      changeChildrenStatus(currentNode.narrowerTerms[i],isSelected);  
    }

    // change status of parent  and grandparent  
    for (let i = 0; i < currentNode.broaderTerms.length; i++) {  
      changeParentStatus(currentNode.broaderTerms[i]);  
    } 
    
  }

  const changeChildrenStatus=(identifier, isSelected)=>{ 
    const currentNode = model.value.find(object=>object.identifier ==identifier)
    currentNode.selected = isSelected; 

    // iterate for grandchildren  
    for (let i = 0; i < currentNode.narrowerTerms.length; i++) {      
      changeChildrenStatus(currentNode.narrowerTerms[i], isSelected);  
    }     
  }

  const changeParentStatus=(identifier)=>{ 
    // check all children status,
    // selected all = parent checked, unselected all = parent unchecked, selected som = parent indeterminate (half select)
    const currentNode = model.value.find(object=>object.identifier ==identifier)
    switch (isAllChildSelected(currentNode)){
      case selectAll:
        currentNode.indeterminate = false;  
        currentNode.selected = true;
        break;
      case unSelectAll:
        currentNode.indeterminate = false;  
        currentNode.selected = false;
        break;
      case halfSelect:    
        currentNode.selected = false;   
        currentNode.indeterminate = true;        
        break;      
    }    

  
  
    if (currentNode.termId==model.value[0].termId) {      
      //parent of currentNode is checkbox model
      //TODO: add code to change value      
    }
    else {
      // iterate for grandparent  
      for (let i = 0; i < currentNode.broaderTerms.length; i++) {  
        changeParentStatus(currentNode.broaderTerms[i]);  
      }
    }
  }

  const isAllChildSelected=(currentNode)=>{    
    const childNumber = currentNode.narrowerTerms.length;
    let selectedNumber = 0;  
    let indeterminateNumber = 0;  

    for (let i = 0; i < currentNode.narrowerTerms.length; i++) {   
      const id =currentNode.narrowerTerms[i];
      const child = model.value.find(object=>object.identifier ==id)    
      if (child.selected){
        selectedNumber +=1;
      } 
      if (child.indeterminate){
        indeterminateNumber +=1;
      }    
    } 

    if (selectedNumber ==childNumber){
      return selectAll;
    }
    else if(( (selectedNumber >0) && (selectedNumber <childNumber) ) | indeterminateNumber>0) {
      return halfSelect;
    }   
    else {
      return unSelectAll;
    }   
  }

  </script>