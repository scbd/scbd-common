<template> 
    <div v-if="modalOpen" class="modal-mask" @click.self="closeModal"> 
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header"> 
            <h3 class="modal-title">Uploading file</h3>  
          </div>            
          <div class="modal-body"  >
            <form>
              <div class="mb-3" >
                  <label class="col-form-label" for="name">File name</label>           						
                  <input class="form-control"  id ="name" :value="file.name" type="text" style="width:98%"    />
              </div>

              <div class="mb-3">
                  <label for="language" class="col-form-label">Language <span style="color: #e32"> *</span></label>       
                    <select class="form-select"  name="language" id="language" :value="file.language||'en'"> 
                      <option value="ar">Arabic</option>                 
                      <option value="en">English</option>     
                      <option value="cn">Chinese</option>
                      <option value="fr">French</option>                 
                      <option value="es">Spanish</option>
                      <option value="ru">Russian</option>
                  </select>
              </div>

              <div class="mb-3" >
                  <label for="tags" class="col-form-label" >Tags</label>
                  <input class="form-control" id="tags" :value="file.tag" type="text" style="width:98%"  />
              </div>
            </form>
          </div> 
          <div class="modal-footer ">  
            <button type="button" class="btn btn-secondary" @click="closeModal" >Cancel</button>
            <button type="button" class="btn btn-primary  " @click="save" >Save</button>         
          </div>
        </div>
      </div>
  
    </div>  
  </template>
  
  <script setup >
    import { defineEmits } from "vue"; // Import defineProps and defineEmits
    import { lstring } from "../../../services/filters/lstring"
  
    const modalOpen = defineModel('modalOpen');
    const props = defineProps({file: Object});
    const emit = defineEmits(['updateFile']);
  
    const closeModal = () => {      
      modalOpen.value = false;  
    }  
  
    const save = () =>{ 
      const newFile = { "name": document.getElementById("name").value , "language": document.getElementById("language").value , "tag": document.getElementById("tag").value  };
      modalOpen.value = false;   
      emit("updateFile", newFile);     
    }
  </script>
  
  
  <style>
    .modal-mask {
      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5); 
      display: flex;
      transition: opacity 0.3s ease; 
    }
  </style>
  