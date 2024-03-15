<template>
     <km-add-link  v-model="kmAddLinkModel.value"/>  
     <km-add-file  v-model="kmAddFileModel.value"/>  

</template>
<script setup>
    import { ref,shallowRef, computed ,onMounted} from 'vue'
    import kmAddLink from './km-add-link.vue';
    import kmAddFile from './km-add-file.vue';
    const fileUploadPath = "http://api.cbd.int/api/2013";

    const links = defineModel({type:Array, required:true, default:[]});

    // const linkEditorRef = shallowRef();
    // const FileEditorRef = shallowRef();
   

    const kmAddLinkModel = computed(()=>{  
        return ref(links.value.filter(item => !item.url.startsWith(fileUploadPath)));
   }); 
   //const kmAddLinkModel = ref([ { "url": "http://cbd.int", "name": "CBD website", "language": "en" } ]);
   
       
    let kmAddFileModel = computed(()=>{  
        return ref(links.value.filter(item => item.url.startsWith(fileUploadPath)));
   });   

</script> 
 