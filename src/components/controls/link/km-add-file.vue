<template>
    <select-file-button  @files="receiveFile"> <slot name="file-button-label">+ Add File</slot></select-file-button> 
    <file-upload-editor ref="fileEditorRef" @on-close="closed($event)">
        <template v-slot:modalTitle>
        <slot name="link-dialog-title"   >        
            Uploading file    
        </slot>
        </template>       
    </file-upload-editor>
    <slot name="links-view">
        <km-view-links v-model="links"   @on-delete = "remove($event)"   @on-edit = "edit($event)"></km-view-links>  
    </slot>
</template>
<script setup>
  import { ref, shallowRef } from 'vue'  
  import kmViewLinks from './km-view-links.vue';
  import fileUploadEditor  from './file-upload-editor.vue';
  import selectFileButton from '../../inputs/select-file-button.vue'

  const fileEditorRef= shallowRef (null); 
  
  let editedLinkIndex = -1;
  const links =ref([]);
  let file = ref({});  
    function addLink(file) {  
        //edit(-1); 
        // alert("add link");               
        // linkEditorRef.value.show({})   
        editedLinkIndex = -1;  
        fileEditorRef.value.show({url:"",name:file.name, language:"", tag:""}, true,file);    
    }      
    function edit(index) {  
        editedLinkIndex = index;  
        fileEditorRef.value.show(links.value[index] ||{}, false, {})     
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
            editedLinkIndex = -1;
        }       
    }

    const receiveFile = (files) => {    
     
        file = files[0];         
        addLink(file);
    };
</script> 
 