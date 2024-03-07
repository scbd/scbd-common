<template>
    <div>
        <!-- <p>Link Component</p>  
        <p>relevant info is : </p>
        <p>{{ info }}</p> 
        <p>relevant documents is : </p>    
        <p>{{ documents }}</p>
        <p>info lang is : {{ infoLang }}</p>  -->
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
            <selectfilebutton @files="receiveFile">+ Add File</selectfilebutton>        
            <button type="button"  class="btn" @click="openLinkModal" ><i class="bi bi-plus"></i>+ Add Link</button> 
            <!-- <button type="button"  class="btn" @click="openFileModal" ><i class="bi bi-plus"></i>Upload File</button>  -->
            <addLinkModal v-model:modalOpen="linkModalOpen"   :link="link"  @updateLink="updateDocument" ></addLinkModal>
            <uploadFileModal v-model:modalOpen="fileModalOpen"    :file="file"  @updateDocument="updateDocument"></uploadFileModal>
           
            
            <!-- <p> linkModalOpen is :{{ linkModalOpen }}</p>
            <p> fileModalOpen is :{{ fileModalOpen }}</p>
           
            <p>link is :{{ link }}</p>
            <p>receive link is :{{ receivedLink }}</p> 
            <p>receive document record is :{{ receivedRecord }}</p> 
            {{ file.name }}
            {{ file.type }} -->
       
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
   import { ref, computed } from 'vue'
   import selectfilebutton from  '../../inputs/select-file-button.vue'
   import addLinkModal from './add-link-modal.vue'
   import uploadFileModal from './upload-file-modal.vue'
  
   const info = defineModel('relevantInfomation');
   const documents = defineModel('relevantDocuments');
   
   // parameter for modal
   const modalEdit = ref(false); 
   const editIndex = ref(0);
   const linkModalOpen = ref(false);
   const fileModalOpen = ref(false); 


   let link = ref({});  
   let file = ref({});  

   const receivedLink = ref({}); // Reactive data
   const receivedRecord = ref({}); // Reactive data


    const receiveFile = (files) => {         
        file = files[0];      
        modalEdit.value = false;   
        fileModalOpen.value = true;
    };

    const updateDocument = (newRecord) => {
        if (modalEdit.value == true){   
            documents.value[editIndex.value]=newRecord;
        }
        else{
            documents.value.push(newRecord);
        }  
        console.log(newRecord[0].name);
        console.log(newRecord[0].type);
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
        //TODO: judge document is link or file
        
        if (documents.value[index].name.includes(".")){            
            fileModalOpen.value = true;        
            file = documents.value[index];
        } 
        else {
            linkModalOpen.value = true;   
            link = documents.value[index];    
        }
        modalEdit.value = true;     
        editIndex.value = index;        
    };

    const openModal = () => { 
        link={};
        modalEdit.value = false;     
    };

    const openLinkModal = () => { 
        link={};       
        modalEdit.value = false;
        linkModalOpen.value = true;  
    };

    const openFileModal = () => { 
        file={};
        modalEdit.value = false;   
        fileModalOpen.value = true;
    };


  const changeInfo =()=>{
   
    //    console.log("before change:"+info)
    //    info = "happy";
    //    console.log("after:"+info)
   }; 


   const saveInfo=()=>{
        //TODO: save info
        //const rInfo = {infoLang:info};
        info = document.getElementById("info").value;
        //model.value = {"relevantInfomation ":{"en":info},"relevantDocuments":documents};;
   };

</script>
