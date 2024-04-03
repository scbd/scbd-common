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
          tag-name="textarea"
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
          <!-- <CAlert class="m-2" color="danger" dismissible @close="() => { uploadErrors = [] }">
              {{ t('uploadError') }} 
              <ul><li v-for="error in uploadErrors" :key="error">{{ error.file }}</li></ul>
          </CAlert> -->  
          <div class="alert alert-danger" role="alert">
            {{ t('uploadError') }} 
            <ul><li v-for="error in uploadErrors" :key="error">{{ error.file }}</li></ul>
          </div>
        </p>
    </div>
  </template>

  <script setup> 
    import  "@ckeditor/ckeditor5-build-classic/build/ckeditor.js";
    import  "@ckeditor/ckeditor5-vue/dist/ckeditor.js";
    import CKEditor   from '@ckeditor/ckeditor5-vue';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';   
    import { useI18n} from '../../services/composables/i18n.js'
    import { computed, onMounted, ref , defineComponent} from 'vue';
    import { useLogger } from '../../services/util/index.js';

    //   import OverlayLoading from 'vue3-loading-overlay';
    //   import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
    //   import KmSpinner from '../KmSpinner.vue';


    const ckeditor = defineComponent(CKEditor.component);  
    const model = defineModel({type:String, required:true,default:''});
    const emit = defineEmits(['update:modelValue','onEditorReady', 'onEditorFocus', 'onEditorBlur', 'onEditorInput', 'onFileUpload', 'onEditorDestroy']);
    const props = defineProps(      
        {tagName: { type: String, required: false,default: 'div'}},     
        {uploadUrl: { type: String, required: false}},
        {locale: { type: String, required: false, default: 'en' }},
        {config: { type: Object, required: false,default: function () {}}},
        {identifier: { type: String, required: true} }  
    );
    
    const {t, locale }   = useI18n();      
    const wordCount= 0;
    const editor= ClassicEditor;
    const isUploadingFile= ref(false);
    const editorConfig = ref(Object);
    const uploadErrors = [];

    import KmStorageApi from '../../services/api/km-storage/KmStorage.js';
    const api= new KmStorageApi({});

    const  binding  = computed({       
        get()      {  return model.value;  },        
        set(value) {  emit('update:modelValue', value);  }
    })      
  
    onMounted(() => {
        editorConfig.value = {...getEditorConfig(), ...props.config }  
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

    const getEditorConfig=()=>{     
          return {        
              language: { ui: locale, content: locale },          
              toolbar:{ 
                  items: ['heading', 'fontSize', 'fontColor', '|', 'bold', 'italic','link', '|',
                        'indent', 'outdent', 'alignment', '|', 'bulletedList','numberedList','blockQuote', '|',
                        'highlight', 'insertTable', '|','imageInsert','mediaEmbed', '|', 'horizontalLine', '|',
                        'removeFormat','undo', 'redo', '|', 'pageBreak'     ],
                  shouldNotGroupWhenFull: true
              },
              alignment: { options: ['left', 'right', 'center', 'justify']},
              fontColor: {
                    colors: [
                        { color: 'hsl(0, 0%, 0%)', label: 'Black' },
                        { color: 'hsl(0, 0%, 30%)', label: 'Dim grey' },
                        { color: 'hsl(0, 0%, 60%)', label: 'Grey' },
                        { color: 'hsl(0, 0%, 90%)', label: 'Light grey' },
                        { color: 'hsl(0, 0%, 100%)', label: 'White', hasBorder: true }
                        ],
                     },
              list: { properties: { styles: true,   startIndex: true, reversed: true }},
              image: {
                    styles: ['alignCenter', 'alignLeft', 'alignRight'],
                    resizeOptions: [
                        { name: 'imageResize:original', label: 'Original', value: null },
                        { name: 'imageResize:25', label: '25%', value: '25' },
                        { name: 'imageResize:50', label: '50%', value: '50' },
                        { name: 'imageResize:75', label: '75%', value: '75' },
                    ],
                    toolbar: [ 'imageTextAlternative', 'toggleImageCaption', '|',
                        'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText',
                        'imageStyle:side', '|', 'resizeImage' ],
                    insert: { integrations: ['insertImageViaUrl']},   
               },
              heading: {
                    options: [
                        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                    ],
              },
              fontSize: {
                options: [8, 10, 12, 14, 'default', 18, 20, 22],
                supportAllValues: true,
              },
              table: {
                contentToolbar: ['tableColumn','tableRow','mergeTableCells', 'tableProperties', 'tableCellProperties', 'toggleTableCaption'  ]
                     },
              link: {
                    addTargetToExternalLinks: false,
                    defaultProtocol: 'https://',
                    decorators: [
                        {  mode: 'manual',   label: 'Downloadable',   attributes: { download: 'download',  },},
                        {  mode: 'manual',   label: 'Open in a new tab',  attributes: { target: '_blank', rel: 'noopener noreferrer', }, },
                            ],
                    },
              wordCount: {
                onUpdate: function(stats){
                    // console.log(stats)
                    wordCount = stats.words;
                },
              },
              mediaEmbed: {
              previewsInData: false,
              removeProviders: ['youtube'],
              extraProviders: [
                  {
                    name: 'youtubePlaylist',
                    url: [/^youtube\.com\/embed\/videoseries\?list=([\w-]+)/],
                    html: (match) => {
                        const id = match[1]
    
                        return (
                        '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' +
                        `<iframe src="https://www.youtube.com/embed/videoseries?list=${id}" ` +
                        'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
                        'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
                        '</iframe>' +
                        '</div>'
                        )
                    },
                  },
                  {
                    name: 'youtube',
                    url: [
                        /^(?:m\.)?youtube\.com\/watch\?v=([\w-]+)/,
                        /^(?:m\.)?youtube\.com\/v\/([\w-]+)/,
                        /^youtube\.com\/embed\/([\w-]+)/,
                        /^youtu\.be\/([\w-]+)/,
                            ],
                    html: (match) => {
                        const id = match[1]
    
                        return (
                        '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' +
                        `<iframe src="https://www.youtube.com/embed/${id}" ` +
                        'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
                        'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
                        '</iframe>' +
                        '</div>'
                        )
                    },
                  },
                  {  
                    name: 'customEmbed',
                    url: [
                        /cdn\.knightlab\.com\/libs\/timeline3\/.*/,
                        /uploads\.knightlab\.com\/storymapjs\/.*/,
                        /cdn\.knightlab\.com\/libs\/juxtapose\/.*/,
                        /uploads\.knightlab\.com\/scenevr\/.*/,
                        /cdn\.knightlab\.com\/libs\/storyline\/.*/,
                        /theydrawit\.mucollective\.co\/vis\/.*/,
                        /youtube\.com\/embed\/videoseries.*/,
                      ],
                    html: function (id) {
                        return (
                        '<figure class="media">' + '	<oembed url="' +  id.input +  '">' +
                        '<a href="' +   id.input +  '">' +  id.input +  '</a>' + '	</oembed>' +   '</figure>'
                        )
                    },
                  },
              ],
              },
          }
    }
 
  
  </script>

  <style scope>  
    .ck.ck-balloon-panel.ck-balloon-panel_visible {
        /* stylelint-disable-line */
        z-index: 10000 !important;
    }
  </style>
  