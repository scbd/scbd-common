<template>
     <km-add-link  v-model="kmAddLinkModel.value"/>  
     <km-add-file  v-model="kmAddFileModel.value"/>  

</template>
<script setup>
    import { ref, computed } from 'vue'
    import kmAddLink from './km-add-link.vue';
    import kmAddFile from './km-add-file.vue';
  
    const links = defineModel({type:Array, required:true, default:[]});

    const fileUploadPath = "http://api.cbd.int/api/2013";
   

    // choose links (url of file contain fileuploadpath)
    const kmAddLinkModel = computed(()=>{  
        return ref(links.value.filter(item => !item.url.startsWith(fileUploadPath)));
    }); 
    
    // choose files (url of file contain fileuploadpath)
    let kmAddFileModel = computed(()=>{  
        return ref(links.value.filter(item => item.url.startsWith(fileUploadPath)));
    });   

</script> 
 