<template> 
    <div id="linkEditorModal" v-if="modalOpen" class="modal fade show overflow-auto d-block scbd-controls link-editor" tabindex="-1" role="dialog" aria-labelledby="linkEditor" >
        <div class="modal-dialog" role="document" >
            <div class="modal-content">
                <div class="modal-header">     
                    <h3 class="modal-title"><slot name="modalTitle">Editing link</slot></h3>  
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"  @click="close" >
                    <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                        <div class="alert alert-info">Please provide the URL of the website (e.g.
                            <a rel="noopener" translation-url target="_blank" href="http://www.cbd.int">https://www.cbd.int</a> )and the name of the website (e.g. "The Convention on Biological Diversity").
                        </div>                  
                        <form>
                        <div class="mb-3" >
                            <label class="col-form-label" for="url">Url <span class="text-danger"> *</span></label><br/>
                            <small class="help-block">Protocol is required (https:// or http://)</small>                                
                            <input class="form-control"  id ="url" v-model="link.url" type="url"  placeholder=" https://www." />
                            <p v-if=" checkValidation &&  !isUrlValid"  ><span class="text-danger"> Please provide valid URL</span></p>
                        </div>
                        <div class="mb-3" >
                            <label for="name" class="col-form-label" >Name</label>
                            <input class="form-control" id="name" v-model="link.name" type="text"  placeholder="example:SCBD website" />
                        </div>
                        <div class="mb-3">
                            <label for="language" class="col-form-label">Language <span class="text-danger"> *</span></label>   
                                <select class="form-select"  name="language" id="language" v-model="link.language"> 
                                <option v-for="(language, key) in languages" :value="key" :key="key">{{ language }}</option> 
                            </select>
                            <p v-if="checkValidation && !isLangValid"  ><span class="text-danger"> Please select Language </span></p>
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
    
    const modalOpen = ref(false) ;
    const link = ref({});     
  
    const emit = defineEmits(['onClose']);
    const isUrlValid  = computed(()=>{ return isValidHttpUrl(link.value.url)});
    const isLangValid = computed(()=>!!link.value?.language?.trim() && Object.keys(languages).includes(link.value.language));  
    const checkValidation = ref(false);
 
    const show= (linkToEdit)=>{  
        checkValidation.value=false; 
        modalOpen.value = true;    
        const  { url, name, language } = linkToEdit  
        link.value = { url, name, language }; 
    }
    const close = () => {      
      modalOpen.value = false;  
      checkValidation.value=false; 
      emit("onClose");  
    }  
    const save = () =>{  
      checkValidation.value=true; 
      if (isUrlValid.value && isLangValid.value){   
        const newLink = { "url": link.value.url , "name": link.value.name , "language": link.value.language  };
        modalOpen.value = false;        
        emit("onClose", newLink);      
      }
    }
    
    const isValidHttpUrl =(string)=> {
        try {
            const newUrl = new URL(string);
            return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
        }
        catch(e){};
        
        return false;
    }
    defineExpose({
        show
    })
  </script>