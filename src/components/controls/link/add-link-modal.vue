<template> 
  <div v-if="modalOpen" class="modal" > <!--@click.self="closeModal">--> 
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header"> 
          <h3 class="modal-title">Editing Link</h3>  
        </div>            
        <div class="modal-body"  >				
          <div class="alert alert-info">Please provide the URL of the website (e.g.
              <a rel="noopener" translation-url target="_blank" href="http://www.cbd.int">https://www.cbd.int</a> )and the name of the website (e.g. "The Convention on Biological Diversity").
          </div>					
          <form>
            <div class="mb-3" >
                <label class="col-form-label" for="url">Url <span style="color: #e32"> *</span></label>
                <div class="help-block">Protocol is required (https:// or http://)</div>							
                <input class="form-control"  id ="url" :value="link.url" type="url" style="width:98%" ng-model="editor.url"  placeholder=" https://www." />
            </div>
            <div class="mb-3" >
                <label for="name" class="col-form-label" >Name</label>
                <input class="form-control" id="name" :value="link.name" type="text" style="width:98%"  placeholder="example:SCBD website" />
            </div>
            <div class="mb-3">
                <label for="language" class="col-form-label">Language <span style="color: #e32"> *</span></label>       
                  <select class="form-select"  name="language" id="language" :value="link.language||'en'"> 
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
  import { defineEmits } from "vue"; // Import defineProps and defineEmits
  import { lstring } from "../../../services/filters/lstring"

  const modalOpen = defineModel('modalOpen');
  const props = defineProps({link: Object});
  const emit = defineEmits(['updateLink']);

  const close = () => {      
    modalOpen.value = false;  
  }  

  const save = () =>{ 
    const newLink = { "url": document.getElementById("url").value , "name": document.getElementById("name").value , "language": document.getElementById("language").value  };
    modalOpen.value = false;   
    emit("update-link", newLink);     
  }
</script>


<style scoped>
  .modal {
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
