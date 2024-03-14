<template> 
    <div id="linkEditorModal" v-if="modalOpen" class="modal fade show overflow-auto d-block scbd-controls link-editor" tabindex="-1" role="dialog" aria-labelledby="linkEditor" >
        <div class="modal-dialog" role="document" >
            <div class="modal-content">
                <div class="modal-header">     
                    <h3 class="modal-title"><slot name="modalTitle">Uploading File</slot></h3>  
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"  @click="close" >
                    <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">                    
                        
                        <div v-if="isAddingNewFile" >   
                            <div class="alert alert-danger" role="alert" v-if="isUploadingError" >
                                <h4>An error has occured</h4>                              
                            </div>                 
                            
                            <div >
                                <label>Uploading <span >{{ link.name }}</span> </label>                              
                                <div class="progress" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                                        <div class="progress-bar" style="width: 100%">100%</div>
                                </div>
                            </div>
                        </div>  
                        <form>
                        
                        <div class="mb-3" >
                            <label for="name" class="col-form-label" >File name</label>
                            <input class="form-control" id="name" v-model="link.name" type="text"  placeholder="example:SCBD website" />
                        </div>
                        <div class="mb-3">
                            <label for="language" class="col-form-label">Language <span class="text-danger"> *</span></label>   
                                <select class="form-select"  name="language" id="language" v-model="link.language"> 
                                <option v-for="(language, key) in languages" :value="key" :key="key">{{ language }}</option> 
                            </select>                 
                        </div>
                        <div class="mb-3" >
                            <label for="tag" class="col-form-label" >Tags</label>
                            <input class="form-control" id="tag" v-model="link.tag" type="text"  placeholder="example: Biodiversity, Aichi target" />
                        </div>
                        </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="close" >Cancel</button>
                    <button type="button" class="btn btn-primary  " @click="save" >Save</button>  
                </div>    
            </div>        
        </div>
    </div>     
  </template>
  
  <script setup >
    import { defineEmits, ref, computed } from "vue"; 
    import { languages } from '../../../data/language';
    
    //TODO: use km-form-control when its available   
    //TODO: upload file, uploading process bar, error msg , showing file.size 
    
    const modalOpen = ref(false) ;
    const isAddingNewFile = ref(false);
    const isUploadingError= ref(false);
    const link = ref({});  
    const newFile = ref({});   
  
    const emit = defineEmits(['onClose']);
    
    const show= (linkToEdit,isNew, file)=>{ 
        modalOpen.value = true;    
        const  { url, name, language ,tag} = linkToEdit  
        link.value = { url, name, language, tag };    
        isAddingNewFile.value = isNew;  
        newFile.value = file;  
    }
    const close = () => {      
      modalOpen.value = false;  
      emit("onClose");  
    }  
    const save = () =>{         
        const newLink = { "url": link.value.url , "name": link.value.name , "language": link.value.language ,"tag": link.value.tag };      
        modalOpen.value = false;               
        emit("onClose", newLink);  
    }
    

  
    defineExpose({
        show
    })
  </script>
  