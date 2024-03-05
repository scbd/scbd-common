<template>
    <div>
        <!-- <p>Link Component</p>  
        <p>relevant info is : </p>
        <p>{{ info }}</p> 
        <p>relevant documents is : </p>    
        <p>{{ documents }}</p>
        <p>info lang is : {{ infoLang }}</p> -->
        <!--{{ documents[0] }}
        {{ documents[1] }} -->
   
    
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

            <selectfilebutton>Add File</selectfilebutton>
        
            <!-- <button type="button"  @click="modalOpen= true" ><i class="bi bi-plus"></i>Add Link</button>   -->
            <button type="button"  @click="openModal" ><i class="bi bi-plus"></i>Add Link</button> 
            <p>modalOpen is :{{ modalOpen }}, link is :{{ link }}</p>
            <!-- <addLinkModal v-model:modalOpen="modalOpen" v-model:link="link" ></addLinkModal>  -->
            <addLinkModal v-model:modalOpen="modalOpen"   :link="link"  @custom-event="handleChildData" ></addLinkModal>
            
            <p>receive data is :{{ receivedData }}</p>
       
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
  


   const info = defineModel('relevantInfomation');
   const documents = defineModel('relevantDocuments');
   
   // parameter for modal
   const modalOpen = ref(false);
   //const modalEdit = ref(false);
   let link = ref({});  //{ "url": "https://www.zxcvzx", "name": "test", "language": "en" });

   const receivedData = ref(""); // Reactive data

    const handleChildData = (data) => {
    // Handle the data received from the child
    receivedData.value = data;
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
         link= documents.value[index];//{ "url": "https://www.zxcvzx", "name": "test", "language": "en" };  
         //modalEdit.value = true;   
         modalOpen.value = true;
   };

   const openModal = () => { 
        link={};
        //modalEdit.value = false;
        modalOpen.value = true;
    };
  const changeInfo =()=>{
       console.log("before change:"+info)
       info = "happy";
       console.log("after:"+info)
   }; 


   const saveInfo=()=>{
        //const rInfo = {infoLang:info};
        info = document.getElementById("info").value;
        //model.value = {"relevantInfomation ":{"en":info},"relevantDocuments":documents};;
   };



    watch(modalOpen,  (newValue, oldValue) => {
      
    //   alert("open"+modalOpen.value);
    //   alert("edit"+modalEdit.value);
    //   alert(modalOpen.value == false );
    //   alert( modalEdit.value==false);
    //   alert(modalOpen.value == false &&  modalEdit.value==false);
    //   if (modalOpen.value == false && modalEdit.value==false)
    //         alert("new-push");
     
        
      //modalEdit.value = false;
      console.log("link"+link);  
    });

    watch(link,  (newValue, oldValue)=> {
      alert("link change!")
      console.log(`new: ${newValue}, old: ${oldValue}`)
    },
    {deep:true}
    );


</script>
