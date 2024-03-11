<template>
    <button type="button" class="btn btn-primary" @click="addLink()">+ Add Link</button>   
    <link-editor ref="linkEditorRef" @close="closed($event)">Editing link</link-editor>    
    <km-view-links v-model="links"    @deleteLink = "deleteLink($event)"></km-view-links>
    
</template>
<script setup>
  import { ref } from 'vue'  
  import kmViewLinks from './km-view-links.vue';
  import linkEditor  from './link-editor.vue';


  const linkEditorRef= ref(null); 
  let editedLinkIndex = -1;

  const links =ref([
      {
        "url": "https://www.google.com",
        "name": "website 1",
        "language": "en"
      },
      {
        "url": "https://www.bing.com",
        "name": "website 2",
        "language": "en"
      },
      {
        "url": "/api/v2013/documents/DFF1283A-411A-75CF-B678-0A6EA5696070/attachments/614774/TEST.txt",
        "name": "TEST.txt",
        "language": "en"
      },
      {
        "url": "/api/v2013/documents/DFF1283A-411A-75CF-B678-0A6EA5696070/attachments/614775/TEST.txt",
        "name": "TEST.txt",
        "language": "ar"
      }
    ]);
  

    function addLink() { 
        editLink({},-1);
    }
        
    function editLink(linkToEdit,index) {
        editedLinkIndex = index;   
        linkEditorRef.value.show(linkToEdit || {}) 
    }

    function deleteLink(index) {    
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