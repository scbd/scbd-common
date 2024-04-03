<template>
    <div>
      <div style="border: 1px solid #eee" v-if="editorConfig" class="vld-parent">
          <!-- <overlay-loading :active="isUploadingFile" 
          :can-cancel="false" background-color="rgb(9 9 9)"
          :is-full-page="false">
          <km-spinner size="lg" 
              :message="t('uploadingFile')"></km-spinner>
      </overlay-loading>
   -->
      <ckeditor 
          v-model="binding"
          :editor="editor"
          :config="editorConfig"
          :tagName="tagName"
          :disabled="$attrs.disabled"      
          @ready="onEditorReady"
          @focus="onEditorFocus"
          @blur="onEditorBlur"
          @input="onEditorInput"
          @destroy="onEditorDestroy"
        ></ckeditor>
      </div>
      <p style="border: 1px solid #eee; border-top: none">
        {{ t('attachmentMessage') }}
        <span class="float-end" id="wordCountSec" style="padding-right: 5px">
          <strong>{{ t('wordCount') }}: {{ wordCount }}</strong></span>
      </p>
      <p style="border: 1px solid #eee; border-top: none" v-if="uploadErrors.length">         
          <div class="alert alert-danger" role="alert">
            {{ t('uploadError') }} 
            <ul><li v-for="error in uploadErrors" :key="error">{{ error.file }}</li></ul>
          </div>
        </p>
    </div>
  </template>

  <script setup> 
    import  "@ckeditor/ckeditor5-vue/dist/ckeditor.js";
    import CKEditor   from '@ckeditor/ckeditor5-vue';
    import ClassicEditor from '@scbd/ckeditor5-build-inline-full/build/ckeditor.js';    
    import '@scbd/ckeditor5-build-inline-full/build/ckeditor.css';  
    import { useI18n} from '../../../services/composables/i18n.js'
    import { computed, onMounted, ref , defineComponent} from 'vue';
    import { useLogger } from '../../../services/util/index.js';
    import KmStorageApi from '../../../services/api/km-storage/KmStorage.js';

    //   import OverlayLoading from 'vue3-loading-overlay';
    //   import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
    //   import KmSpinner from '../KmSpinner.vue';
    
    const model    = defineModel({type:String, required:true, default:''});

    const props = defineProps( {     
        tagName  : { type: String, required: false,default: 'div'},     
        uploadUrl: { type: String, required: false},
        config   : { type: Object, required: true},
        identifier: { type: String, required: true}  
    });    

 
    const emit     = defineEmits(['update:modelValue', 'onFileUpload', 'onEditorDestroy']);

    const api          = new KmStorageApi({});
    const ckeditor     = CKEditor.component;
    const editor       = ClassicEditor;
    const uploadErrors = [];

    const {t, locale }    = useI18n();
    const wordCount       = ref(0);
    const isUploadingFile = ref(false);

    const  binding  = computed({       
        get()      {  return model.value;  },        
        set(value) {  emit('update:modelValue', value);  }
    })      
  
     
    const onEditorReady=(ed)  =>{    
        class UploadAdapter {
          constructor(loader) {
            this.loader = loader;
          }
          upload() {
            const loader = this.loader;
            return this.loader.file.then(function(file){
              
              isUploadingFile.value = true;  
              return api.attachments.uploadTempFile(props.identifier, file, file.name)   
                  .then(function(success) {                 
                      success.urls = { "default": success.url }
                      loader.uploaded = success;
                      return success;
                  })
                  .catch(function(error) {                   
                      uploadErrors.push({file:file.name })  
                      useLogger().error(error);                     
                      throw error;
                  })
                  .finally(()=>{
                      isUploadingFile.value = false;  
                  });
            })
          }
          abort() {
          }
        }
        ed.plugins.get('FileRepository').createUploadAdapter = function(loader){
            const uploadAdapter = new UploadAdapter(loader);
            uploadAdapter.loader.on('change:uploaded' , onEditorImageUploaded);
            return uploadAdapter;
        };
  
        ed.editing.view.document.on('paste', function (eventInfo, data) {
          // console.debug('paste', eventInfo, data)
        })
  
        ed.editing.view.document.on('drop', async function (eventInfo, data) {
          if(data.dataTransfer){
              isUploadingFile.value = true;   
  
              const fileUploads = data.dataTransfer.files.map(function(file, i){
                  const formData = new FormData();
                  const fileType = file.type.substring( 0, 5 );
                  const mimeType = api.attachments.getMimeType(file);   
  
                  if(fileType == "image")
                      return;
                  if (api.attachments.mimeTypeWhitelist().indexOf(mimeType) < 0) {   
                      alert("File type not supported: " + mimeType + "(" + file.name + ")");
                      return;
                  }
  
                  formData.append('file', file);
                  return api.attachments.uploadTempFile(props.identifier, file, file.name)   
                      .then(function(success) {
                          const viewFragment = ed.data.processor.toView('<span class="me-2">&nbsp;<a rel="noopener noreferrer" target="_blank" href="'+success.url+'">'+success.filename+ '</a>&nbsp;</span>' );
                          const modelFragment = ed.data.toModel(viewFragment);
                          ed.model.insertContent( modelFragment);
                          onFileUpload({file:success});   
                      })
                      .catch(e=>{
                          uploadErrors.push({file:file.name })   
                          useLogger().error(e)
                      })
              });
  
              try{
                  await Promise.all(fileUploads)
              }
              catch(e){
                  useLogger().error(e)
                }
              finally{
                  isUploadingFile.value = false   
                };
            }
        })
  
        ed.model.document.on('change:data', function (eventInfo, data) {
          // console.debug('change', eventInfo, data)
        })
  
        function onEditorImageUploaded(eventInfo, name, value, oldValue){
          // console.log((eventInfo, name, value, oldValue))
          //TODO: check why url is not in event args
            if(value.url){
                onFileUpload({file:value})    
            }
        }  
        emit('onEditorReady', ed);      
    }
     
    const onEditorFocus=( event, editor )=> {
        // console.debug( 'Editor focused.', { event, editor } );
        emit('onEditorFocus', event, editor);
    }

    const onEditorBlur=( event, editor ) =>{
        // console.debug( 'Editor blurred.', { event, editor } );
        emit('onEditorBlur', event, editor);
    }

    const onEditorInput=( data, event, editor )=> {       
        emit('onEditorInput', event, editor);     
    }
    
    const  onEditorDestroy=( editor )=> {
        // console.debug( 'Editor destroyed.', { editor } );
        emit('onEditorDestroy', editor);
    }
    
    const onFileUpload=(params)=>{
        emit('onFileUpload', params);
    }

    const editorConfig = computed(()=>{     
          return {
            ...props.config,  
            language: { ui: locale, content: locale },
            wordCount: {
                onUpdate: function (stats) {
                    wordCount.value = stats.words;
                },
            }
        }          
    })
 
  
  </script>

  <style scope>  
    .ck.ck-balloon-panel.ck-balloon-panel_visible {
        /* stylelint-disable-line */
        z-index: 10000 !important;
    }
  </style>
  ./all-plugins-config.js