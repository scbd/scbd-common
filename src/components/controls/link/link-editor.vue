<template> 
    <div id="linkEditorModal" v-if="modalOpen" class="modal fade show overflow-auto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" style="padding-right: 17px; display: block;">
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
                            <label class="col-form-label" for="url">Url <span style="color: #e32"> *</span></label><br/>
                            <small class="help-block">Protocol is required (https:// or http://)</small>	               				
                            <input class="form-control"  id ="url" v-model="link.url" type="url" style="width:98%"  placeholder=" https://www." />
                            <p v-if="!isUrlValid" ><span style="color: #e32"> Please provide valid URL</span></p>
                            </div>
                        <div class="mb-3" >
                            <label for="name" class="col-form-label" >Name</label>
                            <input class="form-control" id="name" v-model="link.name" type="text" style="width:98%"  placeholder="example:SCBD website" />
                        </div>
                        <div class="mb-3">
                            <label for="language" class="col-form-label">Language <span style="color: #e32"> *</span></label>   
                            <p v-if="!isLangValid" ><span style="color: #e32"> Please select Language </span></p>
                                <select class="form-select"  name="language" id="language" v-model="link.language"> 
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
     
    const modalOpen = ref(false) ;
    const link = ref({});     
  
    const emit = defineEmits(['close']);

    const isUrlValid  = computed(()=>{ return isValidHttpUrl(link.value.url)});
    const isLangValid = computed(()=>{ 
        return !(typeof (link.value.language)=== 'undefined' || link.value.lang == "" );  
    });

 
    const show= (linkToEdit)=>{  
        modalOpen.value = true;    
        const  { url, name, language } = linkToEdit  
        link.value = { url, name, language }; 
    }

    const close = () => {      
      modalOpen.value = false;  
      emit("close");  
    }  

    const save = () =>{  
      if (isUrlValid.value && isLangValid.value){       
        const newLink = { "url": link.value.url , "name": link.value.name , "language": link.value.language  };
        modalOpen.value = false;   
        emit("close", newLink);  
      }
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
  
  

  