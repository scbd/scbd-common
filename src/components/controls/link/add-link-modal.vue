
<template>  
    <p>Child Compont</p>
    <p>modalOpen is :{{ modalOpen }}, link is :{{ link }}</p>
    <!-- <p>locallink is :{{ localLink }}</p> -->
     <div v-if="modalOpen" class="modal-mask" @click.self="closeModal">
 
           <!-- <div id="editLink" class="modal" data-backdrop="static">  -->
          <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h3>Editing link</h3>
                </div>            
                <div class="modal-body"  >				
                    <div class="alert alert-info">Please provide the URL of the website (e.g.
                        <a rel="noopener" translation-url target="_blank" href="http://www.cbd.int">https://www.cbd.int</a> )and the name of the website (e.g. "The Convention on Biological Diversity").
                    </div>					
					<form name="linkForm">
						<fieldset>					
							<div class="control-group" ng-class="{error: linkForm.editor.url.$invalid}">
								<label class="control-label" ng-required="editor.visible" for="url">Url</label>
								<div class="help-block">Protocol is required (https:// or http://)</div>							
								<!-- <input class="form-control" v-model="link.url" type="url" style="width:98%" ng-model="editor.url"  placeholder=" https://www.cbd.int" /> -->
                	<input class="form-control"  id ="url" :value="link.url" type="url" style="width:98%" ng-model="editor.url"  placeholder=" https://www.cbd.int" />
						
							</div>

							<div class="control-group" >
								<label>Name</label>
								<!-- <input class="form-control" v-model="link.name" type="text" style="width:98%"  placeholder="example:SCBD website" /> -->
                <input class="form-control" id="name" :value="link.name" type="text" style="width:98%"  placeholder="example:SCBD website" />
							
              </div>

							<div class="control-group" >
								<label class="control-label"  for="Language">Language</label>								
						  <!-- <input class="form-control" id="languageinput" :value="link.language" type="text" style="width:98%"  placeholder="language selector" />						 -->
                <select name="language" id="language" :value="link.language" >
                  <option value="en">en</option>
                  <option value="fr">fr</option>
                  <option value="cn">cn</option>           
                </select>
                </div>
						</fieldset>
					</form>                    
				</div>           
           
        <div class="modal-footer d-block">
					<button type="button" class="btn btn-primary px-3 float-end" @click="save" >Save</button>
					<button type="button" class="btn btn-secondary px-3 float-end" @click="closeModal" >Cancel</button>
				</div>
      </div>

    </div> 
    </div>   
</template>

<script setup >
  const modalOpen = defineModel('modalOpen');
  let   link      = defineModel('link'); 
 
  const closeModal = () => { 
    link.value={};  
    modalOpen.value = false;  
  }
  const save = () =>{  
    link.value = { "url": document.getElementById("url").value , "name": document.getElementById("name").value , "language": document.getElementById("language").value  };
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
