<template>
    <div>
        <p>Link Component</p>  
        <p>relevant info is : </p>
        <p>{{ info }}</p> 
        <p>relevant documents is : </p>    
        <p>{{ documents }}</p>
        <p>info lang is : {{ infoLang }}</p> 
        <!--{{ documents[0] }}
        {{ documents[1] }}-->
   
    
        <textarea            
            v-model="infoValue"           
            id="info"
            :class="$attrs.class"
            :required="$attrs.required" 
            :placeholder="$attrs.placeholder"
            :disabled="$attrs.disabled"
            :rows="$attrs.rows" 
            :cols="$attrs.cols" 
            @change="saveInfo" >
        </textarea>     

        <div style="padding-bottom: 5px;">
            <selectfilebutton @files="receiveFile">Add File</selectfilebutton>        
            <button type="button"  class="btn" @click="openModal" ><i class="bi bi-plus"></i>Add Link</button> 
            <button type="button"  class="btn" @click="openModal" ><i class="bi bi-plus"></i>Upload File</button> 
            <addLinkModal v-model:modalOpen="modalOpen"   :link="link"  @updateLink="handleChildData" ></addLinkModal>
            <uploadFileModal v-model:modalOpen="modalOpen"    :file="file"  @updateFile="handleChildData"></uploadFileModal>
           
            <p>modalOpen is :{{ modalOpen }}, link is :{{ link }}</p>
            <p>receive link is :{{ receivedLink }}</p> 
       
		</div>

        <table  class="table table-striped" v-if="documents?.length  ">
            <tr  v-for="(item, index) in documents" :key="index">
                <td>{{item.language}} {{item.name}}  </td>   
                <td style="width:10px;"><span class="btn" @click="edit(index)"><i class="fa fa-edit icon"></i></span></td>
                <td style="width:10px;"><span class="btn" @click="remove(index)"><i class="fa fa-trash-o icon"></i></span></td>
            </tr>
        </table>  
        
    </div> 
</template>

<script setup>
   import { ref, computed, watch} from 'vue'
   import selectfilebutton from  '../../inputs/select-file-button.vue'
   import addLinkModal from './add-link-modal.vue'
   import uploadFileModal from './upload-file-modal.vue'
  
   const info = defineModel('relevantInfomation');
   const documents = defineModel('relevantDocuments');
   
   // parameter for modal
   const modalOpen = ref(false);
   const modalEdit = ref(false); 
   const editIndex = ref(0);
   const OpenLinkModal = ref(false);
   const OpenFileModal = ref(false); 


   let link = ref({});  
   let file = ref({});  

   const receivedLink = ref({}); // Reactive data

    const handleChildData = (newLink) => {  
        if (modalEdit.value == true){   
            documents.value[editIndex.value]=newLink;
        }
        else{
            documents.value.push(newLink);
        }        
        receivedLink.value = newLink;
    };

    const receiveFile = (files) => { 
        console.log(files[0].name);
        console.log(files[0].type);
    };
    

    let infoValue = computed(()=>{
            if(info.value)
                return  Object.values(info.value)[0] ;//(model.value.relevantInfomation);        
            return [];
    }); 

    let infoLang = computed(()=>{
            if(info.value)
                return  Object.keys(info.value)[0] ;//(model.value.relevantInfomation);
            return [];
    }) 

   
    const remove=(index)=>{ 
            documents.value.splice(index, 1);   
    };

    const edit=(index)=>{  
            link= documents.value[index];
            modalEdit.value = true;   
            modalOpen.value = true;
            editIndex.value = index;
    };

    const openModal = () => { 
            link={};
            modalEdit.value = false;           
            modalOpen.value = true;
        };

    const openLinkModal = () => { 
        link={};
        modalEdit.value = false;
        openLinkModal.value = true;
      
    };

    const openUploadFileModal = () => { 
        file={};
        modalEdit.value = false;
        modalOpen.value = true;
        openFileModal.value = true;
    };


  const changeInfo =()=>{
    //    console.log("before change:"+info)
    //    info = "happy";
    //    console.log("after:"+info)
   }; 


   const saveInfo=()=>{
        //const rInfo = {infoLang:info};
        info = document.getElementById("info").value;
        //model.value = {"relevantInfomation ":{"en":info},"relevantDocuments":documents};;
   };




</script>
