<template>    
    <div class="scbd-common km-add-file" >
        <select-file-button  :multiple="props.multiple" @on-file-selected="receiveFile"> <slot name="file-button-label">+ Add Files</slot></select-file-button> 
              
        <file-upload-editor ref="fileEditorRef" @on-close="onFileUploadEditorClose">
            <template v-slot:modalTitle>
            <slot name="link-dialog-title"   >        
                Uploading file    
            </slot>
            </template>       
        </file-upload-editor>
        <slot name="links-view">
            <km-view-links v-model="links"   @on-delete = "removeLink"   @on-edit = "editLink"></km-view-links>  
        </slot>
    </div>
</template>
<script setup>
    import { shallowRef } from 'vue'  
    import kmViewLinks from './km-view-links.vue';
    import fileUploadEditor  from './file-upload-editor.vue';
    import selectFileButton from '../../inputs/select-file-button.vue'
  

    const links = defineModel({type:Array, required:true, default:[]});
    const props = defineProps({multiple: { type: Boolean, require: false, default: false }});

    const fileEditorRef= shallowRef (null); 
    let editedLinkIndex = -1;
    
    function addLink(file) {        
        editedLinkIndex = -1; 
        fileEditorRef.value.show({url:"",name:file.name, language:"en", tag:""}, true,file); 
    }      
    function editLink(index) {         
        editedLinkIndex = index;  
        fileEditorRef.value.show(links.value[index] ||{}, false, {})     
    }
    function removeLink(index) {  
        links.value.splice(index, 1);   
    }
    function onFileUploadEditorClose(newValue) {         
     
        if(!newValue) {// mean cacnel => return  
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

 
    const receiveFile = (receiveFiles) => {  
        receiveFiles = [receiveFiles];
        receiveFiles = receiveFiles.flat();   
        //TODO: support multiple files   
        addLink(receiveFiles[0]);            
    };


</script> 
 