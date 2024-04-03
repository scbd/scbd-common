<template>
    <div  class="scbd-common km-link">
        <button type="button" class="btn btn-primary m-2" @click="addLink()" v-if ="props.allowLinks">
            <slot name="link-button-label">+ Add Link</slot>
        </button>  
       
        <select-file-button class="m-2" @on-file-selected="receiveFile" v-if ="props.allowFiles"> 
            <slot name="file-button-label">
                + Add Files
            </slot>
        </select-file-button>    
             
       <file-upload-editor ref="fileEditorRef" @on-close="onFileUploadEditorClose"  v-if ="props.allowFiles">
            <template v-slot:modalTitle>
                <slot name="link-dialog-title"   >        
                    File Upload   
                </slot>
            </template>       
        </file-upload-editor>

        <link-editor ref="linkEditorRef" @on-close="onLinkEditorClose" v-if ="props.allowLinks">       
            <template v-slot:modalTitle>
                <slot name="link-dialog-title"   >        
                Edit link    
                </slot>
            </template>       
        </link-editor>
    
        <km-view-links v-model="links"   @on-delete ="removeLink($event)"   @on-edit = "editLink($event)"  v-if ="props.allowLinks || props.allowFiles " ></km-view-links>      
    </div>
</template>
<script setup>
    import { ref ,shallowRef} from 'vue'  
    import kmViewLinks from './km-view-links.vue';
    import linkEditor  from './link-editor.vue';
    import fileUploadEditor  from './file-upload-editor.vue';
    import selectFileButton from '../../inputs/select-file-button.vue';

    const links = defineModel({type:Array, required:true, default:[]});

    const props = defineProps({
        allowLinks: { type: Boolean, require: false, default: true },
        allowFiles: { type: Boolean, require: false, default: true }
     
    });


    const linkEditorRef= shallowRef(null); 
    let editedLinkIndex = -1;   
    const fileEditorRef= shallowRef (null); 
    let editedFileIndex = -1;

    function addLink() {  
        editLink(-1);
    }      

    function editLink(index) {  
        if (index ==-1){
            editedLinkIndex = index;  
            linkEditorRef.value.show(links.value[index] ||{})    
        }   
        if(links.value[index].url.includes('http://api.cbd.int/api/2013',)){              
            // edit file
            editedFileIndex = index;  
            fileEditorRef.value.show(links.value[index] ||{}, false, {})    
        }
        else{
            // edit link
            editedLinkIndex = index;  
            linkEditorRef.value.show(links.value[index] ||{})    
        }
    }

    function removeLink(index) {  
        links.value.splice(index, 1);  
    }

    function onLinkEditorClose(newValue) {    
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
        
    function addFile(file) {        
        editedFileIndex = -1; 
        fileEditorRef.value.show({url:"http://api.cbd.int/api/2013",name:file.name, language:"en", tag:""}, true,file); 
    }      
 
    function onFileUploadEditorClose(newValue) {  
        if(!newValue) {// mean cancel => return  
            return;
        } 
        else{   
            if(editedFileIndex<0) { 
                links.value.push(newValue);
            } 
            else {        
                links.value[editedFileIndex]=newValue;
            } 
            editedFileIndex = -1;
        }       
    }
 
    const receiveFile = (selectedFile) => {  
         addFile(selectedFile);            
    };

</script> 
