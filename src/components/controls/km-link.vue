<template>
    <div>
        <p>Link Component</p>  
        <p>relevant info is : </p>
        <p>{{ info }}</p> 
        <p>relevant documents is : </p>    
        <p>{{ documents }}</p>
        <p>info lang is : {{ infoLang }}</p>
    
        <textarea            
            v-model="infoValue"           
            id="info"
            :class="$attrs.class"
            :required="$attrs.required" 
            :placeholder="$attrs.placeholder"
            :disabled="$attrs.disabled"
            :rows="$attrs.rows" 
            :cols="$attrs.cols" 
            @change="save" >
        </textarea>     

        <div style="padding-bottom: 5px;">

            <selectfilebutton>Add File</selectfilebutton>
        
            <!-- <button type="button"  @click="modalOpen= true" ><i class="bi bi-plus"></i>Add Link</button>   -->
            <button type="button"  @click="openModal" ><i class="bi bi-plus"></i>Add Link</button> 
            <addLinkModal v-model="modalOpen" ></addLinkModal> 

        
            <p>modalOpen is :{{ modalOpen }}, newLink is :{{ newLink }}</p>
        
            <!-- <button type="button"  @click="open= true" ><i class="bi bi-plus"></i>Add Link</button>  -->
           
            <!-- <addLinkModal v-model="modalOpen" :newLink.sync="newLink"></addLinkModal> -->
            <!-- <addLinkModal v-model="data" ></addLinkModal> -->
            <!-- <addLinkButton v-model:modalOpen="modalOpen"  v-model:newLink="newLink" ></addLinkButton>  -->
            
          
       
   
            <!-- <addLinkButton v-model="modalOpen" ></addLinkButton> -->
		</div>

        <table  class="table table-striped" v-if="documents?.length  ">
            <tr  v-for="(item, index) in documents" :key="index">
                <td>{{item.name}}  </td>   
                <td style="width:10px;"><span class="btn" @click="remove(index)"><i class="fa fa-trash-o icon"></i></span></td>
            </tr>
        </table>  
        
      
     
    </div> 
</template>

<script setup>
   import { ref, computed } from 'vue'
   import selectfilebutton from  '../inputs/select-file-button.vue'


   //import addLinkButton from './add-link-button.vue'
   //import addLinkModal from './addLinkModal.vue'

 
   //const model = defineModel({type:Boolean, required:true});


   const info = defineModel('relevantInfomation');
   const documents = defineModel('relevantDocuments');


   // parameter for modal
   const modalOpen = ref(false);
   const newLink = ref("");

   let infoValue = computed(()=>{
        if(info.value)
            return  Object.values(info.value)[0] ;//(model.value.relevantInfomation);        
        return [];
   }); 

   let infoLang = computed(()=>{
        if(info.value)
            return  Object.keys(info.value)[0] ;//(model.value.relevantInfomation);
        return [];
   }); 

   
//    let info = computed(()=>{
//         if(model.value)
//             return  Object.values(model.value.relevantInfomation)[0] ;//(model.value.relevantInfomation);
//         return [];
//    }); 

//    let infoLang = computed(()=>{
//         if(model.value)
//             return  Object.keys(model.value.relevantInfomation)[0] ;//(model.value.relevantInfomation);
//         return [];
//    }); 

     
//    let documents = computed(()=>{
//         if(model.value)
//             return  (model.value.relevantDocuments);
//         return [];
//    }); 

   
   const remove=(index)=>{  
         console.log(documents.length);
         documents.splice(index, 1);  
         console.log(documents.length);      
   };

   const add_link=()=>{  
        documents.value.push({ "url": "https://www.zxcvzx", "name": "test", "language": "en" });      
        //openModal();
  };

  const changeInfo =()=>{
       console.log("before change:"+info)
       info = "happy";
       console.log("after:"+info)
   }; 


   const save=()=>{
        //const rInfo = {infoLang:info};
        info = document.getElementById("info").value;
        //model.value = {"relevantInfomation ":{"en":info},"relevantDocuments":documents};;
   };

    // const modalOpen = ref<boolean>(false)
    // const displayContent = ref('')
    // const titleDisplay = ref('')

    const openModal = () => {
        modalOpen.value = true;
    };




</script>
<style>
 
</style>./addLinkModal.vue../inputs/select-file-button.vue./add-link-modal.vue
