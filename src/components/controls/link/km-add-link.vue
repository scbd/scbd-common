<template>
  
  <slot name="add-link">
    <button type="button" class="btn btn-primary" @click="addLink()">+ Add Link</button>  
    <link-editor ref="linkEditorRef" @on-close="closed($event)">Editing link</link-editor>  
    <km-view-links v-model="links"   @on-delete = "remove($event)"   @on-edit = "edit($event)"></km-view-links>  
  </slot>
   

</template>
<script setup>
import { ref } from 'vue'  
import kmViewLinks from './km-view-links.vue';
import linkEditor  from './link-editor.vue';

const linkEditorRef= ref(null); 
let editedLinkIndex = -1;
const links =ref([]);

  function addLink() {  
      edit(-1);
  }      

  function edit(index) {  
      editedLinkIndex = index;  
      linkEditorRef.value.show(links.value[index] ||{})     
  }

  function remove(index) {  
      links.value.splice(index, 1);   
  }

  function closed(newValue) {    
      if(Object.keys(newValue).length ==0) {// mean cacnel => return              
          return;
      } 
      else{
          if(editedLinkIndex<0) {  
                    
              links.value.push(newValue);
          } 
          else {        
              links.value[editedLinkIndex]=newValue;
          } 
      }       
  }
</script>
