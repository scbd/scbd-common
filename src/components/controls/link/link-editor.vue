<template> 
    <div v-if="modalOpen" class="modal" > 
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header"> 
            <h3 class="modal-title">Editing Link--link editor</h3>  
          </div>            
          <div class="modal-body"  >				
            <div class="alert alert-info">Please provide the URL of the website (e.g.
                <a rel="noopener" translation-url target="_blank" href="http://www.cbd.int">https://www.cbd.int</a> )and the name of the website (e.g. "The Convention on Biological Diversity").
            </div>					
            <form>
              <div class="mb-3" >
                  <label class="col-form-label" for="url">Url <span style="color: #e32"> *</span></label>
                  <div class="help-block">Protocol is required (https:// or http://)</div>	                  	
                  <p v-if=urlErrorMsgShow ><span style="color: #e32"> Please provide valid URL</span></p>				
                  <input class="form-control"  id ="url" :value="link.url" type="url" style="width:98%" ng-model="editor.url"  placeholder=" https://www." />
              </div>
              <div class="mb-3" >
                  <label for="name" class="col-form-label" >Name</label>
                  <input class="form-control" id="name" :value="link.name" type="text" style="width:98%"  placeholder="example:SCBD website" />
              </div>
              <div class="mb-3">
                  <label for="language" class="col-form-label">Language <span style="color: #e32"> *</span></label>   
                  <p v-if=languageErrorMsgShow ><span style="color: #e32"> Please select Language </span></p>
                    <select class="form-select"  name="language" id="language" :value="link.language||''"> 
                      <option value="ar">Arabic</option>                 
                      <option value="en">English</option>     
                      <option value="cn">Chinese</option>
                      <option value="fr">French</option>                 
                      <option value="es">Spanish</option>
                      <option value="ru">Russian</option>
                  </select>
              </div>
            </form>
          </div> 
          <div class="modal-footer ">  
            <button type="button" class="btn btn-secondary" @click="close" >Cancel</button>
            <button type="button" class="btn btn-primary  " @click="save" >Save</button>         
          </div>
        </div>
      </div>
    </div>    
  </template>
  
  <script setup >
    import { defineEmits, ref } from "vue"; 
    import { lstring } from "../../../services/filters/lstring"
     
    const modalOpen = ref(false) ;
    const link = ref({});     
    const emit = defineEmits(['close']);
    const urlErrorMsgShow = ref(false);
    const languageErrorMsgShow = ref(false);
  
    const close = () => {      
      modalOpen.value = false;  
      emit("close", {});  
    }  

    const validate = () => {   
        
        if (isValidHttpUrl(document.getElementById("url").value)){          
            urlErrorMsgShow.value =false;
        }
        else{
            urlErrorMsgShow.value = true;   
        }
  
        if ( document.getElementById("language").value =="") {        
            languageErrorMsgShow.value  = true;        }
        else{         
            languageErrorMsgShow.value = false;
        }
        
        const isValid = !languageErrorMsgShow.value  && !urlErrorMsgShow.value;    
        return isValid;  
    }
  
    const save = () =>{ 
      const isValid = validate();
   
      if (isValid){
        const newLink = { "url": document.getElementById("url").value , "name": document.getElementById("name").value , "language": document.getElementById("language").value  };
        modalOpen.value = false;   
        emit("close", newLink);  

      }
      else{
        link.value= { "url": document.getElementById("url").value , "name": document.getElementById("name").value , "language": document.getElementById("language").value  };
        
      }

    }
    
    const show= (linkToEdit)=>{  
        modalOpen.value = true;          
        link.value = linkToEdit;   
        languageErrorMsgShow.value = false;
        urlErrorMsgShow.value = false;  
    }

   const isValidHttpUrl =(string)=> {
        try {
            const newUrl = new URL(string);
            return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
        } catch (err) {
            return false;
        }
    }

    defineExpose({
        show
    })
  </script>
  
  
  <style scoped>
     .modal {
      position: fixed;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      overflow: auto;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5); 
      display: flex;
      transition: opacity 0.3s ease; 
    } 
  </style>
  