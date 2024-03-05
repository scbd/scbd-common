
<template>  
    <!-- <p>Child Compont</p>
    <p>modalOpen is :{{ modalOpen }}, link is :{{ props.link }}</p> -->    
    
     <div v-if="modalOpen" class="modal-mask" @click.self="closeModal"> 
          <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header"> 
                  <!-- <h3 class="modal-title">{{lstring(kmLinkT.editingLink, locale)}}</h3>            -->
                   <h3 class="modal-title">Editing Link</h3>  
                </div>            
                <div class="modal-body"  >				
                    <div class="alert alert-info">Please provide the URL of the website (e.g.
                        <a rel="noopener" translation-url target="_blank" href="http://www.cbd.int">https://www.cbd.int</a> )and the name of the website (e.g. "The Convention on Biological Diversity").
                    </div>					
					<!-- <form name="linkForm">
						<fieldset>					
							<div class="control-group" >
								<label class="control-label" for="url">Url</label>
								<div class="help-block">Protocol is required (https:// or http://)</div>							
							 	<input class="form-control"  id ="url" :value="link.url" type="url" style="width:98%" ng-model="editor.url"  placeholder=" https://www.cbd.int" />
							</div>

							<div class="control-group" >
								<label>Name</label>
							  <input class="form-control" id="name" :value="link.name" type="text" style="width:98%"  placeholder="example:SCBD website" />
							</div>

							<div class="control-group" >
								<label class="control-label"  for="Language">Language</label>								
						   <select name="language" id="language" :value="link.language" >
                  <option value="en">en</option>
                  <option value="fr">fr</option>
                  <option value="cn">cn</option>           
                </select>
                </div>
						</fieldset>
					</form>    -->
          
          <form>
          <div class="mb-3" >
              <label class="col-form-label" for="url">Url</label>
              <div class="help-block">Protocol is required (https:// or http://)</div>							
              <input class="form-control"  id ="url" :value="link.url" type="url" style="width:98%" ng-model="editor.url"  placeholder=" https://www.cbd.int" />
					</div>
          <div class="mb-3" >
              <label for="name" class="col-form-label" >Name</label>
              <input class="form-control" id="name" :value="link.name" type="text" style="width:98%"  placeholder="example:SCBD website" />
					</div>
          <div class="mb-3">
              <label for="language" class="col-form-label">Language</label>         					
              <select class="form-select"  name="language" id="language" placeholder="Avaiable Language">         
                <option value="ar">Arabic</option>
                <option value="cn">Chinese</option>
                <option value="en">English</option>     
                <option value="fr">French</option>
                <option value="ru">Russian</option>
                <option value="es">Spanish</option>
              </select>
          </div>
        </form>
				</div>           
           
        <div class="modal-footer ">  <!--d-block">-->
		
          <!-- <button type="button" class="btn btn-secondary px-3 float-end" @click="save" >Save</button>
					<button type="button" class="btn btn-primary px-3 float-end" @click="closeModal" >Cancel</button> -->
     
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
  const props = defineProps({link: Object});
  const emit = defineEmits(['updateLink'],['custom-event']);


  // const emitData = () => {
  //   // Emit an event with the data
  //   const data = "Data from child";    
  //   alert(data);
  //   //alert(link.language);
  //   //defineEmits(["custom-event"])(data);
  //   emit("custom-event", data); 
  //   //emit("custom-event", {"test":"from child"}); 
  //   //alert(data);
  // };


  const closeModal = () => {      
    modalOpen.value = false;  
  }
  // const save = () =>{  
  //   //link.value = { "url": document.getElementById("url").value , "name": document.getElementById("name").value , "language": document.getElementById("language").value  };
  //   link = { "url": document.getElementById("url").value , "name": document.getElementById("name").value , "language": document.getElementById("language").value  };
  //   alert(link);
  //   emit('update:link', {test:"test"});
  //   modalOpen.value = false;   
  // }


  const save = () =>{ 
    const newLink = { "url": document.getElementById("url").value , "name": document.getElementById("name").value , "language": document.getElementById("language").value  };
    emit("custom-event", newLink); 
    modalOpen.value = false;   
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
