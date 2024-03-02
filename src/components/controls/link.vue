<template>
    <div>
        <p>Link Component</p>  
      
        <textarea            
            v-model="info"           
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
			<!-- <button type="button"  @click="addFile()" ><i class="bi bi-plus"></i> addFile</button>
			<button type="button"  @click="addLink()" ><i class="bi bi-plus"></i> addLink</button> -->
            <!-- <button type="button"  @click="changeInfo()" ><i class="bi bi-plus"></i> changeInfo</button> -->
            <selectfilebutton>Add File</selectfilebutton>
            <!-- <addLink>Add Link </addLink>  -->

            <button type="button"  @click="modalOpen= true" ><i class="bi bi-plus"></i>Add Link</button> 
            {{newLink}}
            <addLinkModal v-model="modalOpen" :newLink.sync="newLink"></addLinkModal>
            <!-- <modal v-model="data" ></modal>  -->
		</div>

        <table  class="table table-striped" v-if="documents?.length && model">
            <tr  v-for="(item, index) in documents" :key="index">
                <td>{{item.name}}  </td>   
                <td style="width:10px;"><span class="btn" @click="remove(index)"><i class="fa fa-trash-o icon"></i></span></td>
            </tr>
        </table>  
        
      
     
    </div> 
</template>

<script setup>
   import { ref, computed } from 'vue'
   import selectfilebutton from  './select-file-button.vue'
   import addLinkModal from './addLinkModal.vue'

 
   const model = defineModel({type:Boolean, required:true});

   const modalOpen = ref(false);
   const newLink = ref("test");

   const props1 = false;
   const props2 = "props2";
   const data = {props1, props2}

   
   let info = computed(()=>{
        if(model.value)
            return  Object.values(model.value.relevantInfomation)[0] ;//(model.value.relevantInfomation);
        return [];
   }); 

   let infoLang = computed(()=>{
        if(model.value)
            return  Object.keys(model.value.relevantInfomation)[0] ;//(model.value.relevantInfomation);
        return [];
   }); 

  


   
   let documents = computed(()=>{
        if(model.value)
            return  (model.value.relevantDocuments);
        return [];
   }); 

   
   const remove=(index)=>{  
         documents.value.splice(index, 1);        
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

    // const closeModal = () => {
    // modalOpen.value = false;
    // displayContent.value = '';
    // titleDisplay.value = ''
    // };

    // };
</script>
<style>
 
</style>./addLinkModal.vue
