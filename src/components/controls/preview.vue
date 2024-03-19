<template>
    <div>
        <h3>CBD controls components</h3>
        
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        Available locales
                    </div>
                    <div class="card-body"> 
                        <div class="row">
                            <div class="col-6">                                
                                <div class="btn-group">
                                    <button class="btn btn-danger" v-for="(locale, index) in locales" :key="locale" @click="removeLocale(index)">
                                        <i class="bi bi-trash"></i> {{locale}}
                                    </button>
                                </div>
                            </div>                            
                        </div>
                    </div>  
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        Link Editor
                    </div>
                    <div class="card-body"> 
                        <div class="row">
                            <div class="col-6">
                                <button class="btn btn-default" @click="showLinkEditor()">Show Link editor</button>
                                <link-editor ref="linkEditorRef" @on-close="onLinkEditorClose"></link-editor>
                                {{newLink}}
                            </div>
                            <div class="col-6">
                                <div class="callout callout-warning">                                
                                    <code>                                    
                                        &lt;button class=&quot;btn btn-default&quot; @click=&quot;showLinkEditor()&quot;&gt;Show Link editor&lt;/button&gt;
                                        &lt;link-editor ref=&quot;linkEditorRef&quot; @close=&quot;onLinkEditorClose&quot;&gt;&lt;/link-editor&gt;                                 
                                    </code>   
                                </div>                                                            
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        Km view links
                    </div>
                    <div class="card-body"> 
                        <div class="row">
                            <div class="col-6"> 
                                <km-view-links v-model="links"   @on-edit = "edit($event)"  @on-delete = "remove($event)"></km-view-links>                                
                            </div>
                            <div class="col-6">
                                <div class="callout callout-warning">                              
                                    <code id="kmViewLinks">                             
                                        &lt;km-view-links v-model=&quot;links&quot;    @on-edit  = &quot;edit($event)&quot;  @on-delete = &quot;remove($event)&quot;&gt;&lt;/km-view-links&gt;                         
                                    </code>   
                                </div>                                                            
                            </div>
                        </div>
                    </div>               
                </div>
            </div>        
        </div> 

        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        Km value bool
                    </div>
                    <div class="card-body"> 
                        <div class="row">
                            <div class="col-6"> 
                                <km-value-bool value="true" locale="en"></km-value-bool>                             
                            </div>
                            <div class="col-6">
                                <div class="callout callout-warning">                              
                                    <code id="kmViewLinks">                             
                                        {{`<km-value-bool value="true" locale="en"></km-value-bool>`}}
                                    </code>   
                                </div>                                                            
                            </div>
                        </div>
                    </div>               
                </div>
            </div>        
        </div>       
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">KmInputLString</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6">
                                <km-input-lstring
                                    v-model="kmInputLStringModel"
                                    :locales="locales"                                                    
                                    >
                                </km-input-lstring>
                                <br/>
                                
                            </div>
                            <div class="col-6">
                                <div class="callout callout-warning">
                                <code>
                                    &lt;km-input-lstring
                                        v-model=&quot;kmInputLStringModel&quot;
                                        :locales=&quot;locales&quot;
                                        &gt;
                                    &lt;/km-input-lstring&gt;
                                </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">       
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        Add Link 
                    </div>
                    <div class="card-body"> 
                        <div class="row">
                            <div class="col-6">
                                <km-add-link  v-model="kmAddLinkModel1"/>  
                                Parent links :   {{ kmAddLinkModel1 }}   <br/>
                            </div>
                            <div class="col-6">
                                Example 1: default
                                <div class="callout callout-warning">
                                    <code>                              
                                        &lt;km-add-link/&gt;
                                    </code> 
                                </div>                                                                        
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">                                                       
                                <km-add-link v-model="kmAddLinkModel2">
                                    <template #link-button-label>
                                        Add Websites
                                    </template>
                                    <template #link-dialog-title>
                                        My custom title
                                    </template>                                  
                                    <template #links-view>     
                                        <p></p>                                  
                                    </template>
                                </km-add-link>
                                Parent links :   {{ kmAddLinkModel2 }}   <br/>
                            </div>
                            <div class="col-6">  
                                Example 2: customize button label, link editor title, hide link list                                 
                                <div class="callout callout-warning">
                                    <code>  
                                        &lt;km-add-link&gt;
                                            &lt;template #link-button-label&gt;
                                                Add Websites
                                            &lt;/template&gt;
                                            &lt;template #link-dialog-title&gt;
                                                my custom title
                                            &lt;/template&gt;                                  
                                            &lt;template #links-view&gt;  
                                            &lt;p&gt; &lt;/p&gt;                                     
                                            &lt;/template&gt;
                                        &lt;/km-add-link&gt;    
                                    </code> 
                                </div>                                          
                            </div>
                        </div>
                    </div>               
                </div>
            </div>    
        </div> 

        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        Km form group
                    </div>
                    <div class="card-body"> 
                        <div class="row">
                            <div class="col-6"> 
                                <km-form-group required name="government" caption="SCBD Control help" help-content="This is a preview of simple help, it also supports <h3>html</h3>">
                                    <input name="government-input" class="form-control" />
                                </km-form-group>                              
                            </div>
                            <div class="col-6">
                                <div class="callout callout-warning">  
                                    <code>                      
                                    {{` <km-form-group required name="government" caption="SCBD Control help" help-content="This is a preview of simple help, it also supports <h3>html</h3>">
                                    <input name="government-input" class="form-control" />
                                </km-form-group>    `}}</code>      
                                </div>                                                            
                                <select-file-button  multiple @on-file-selected="receiveFile"> <slot name="file-button-label">+ Add Multiple File</slot></select-file-button> 
                                <br/>   
                                <br/>
                                <select-file-button  @on-file-selected="receiveFile"> <slot name="file-button-label">+ Add File</slot></select-file-button>                              
                                <div v-for="(item, index) in files" :key="index">
                                           {{item.name}}     
                                </div>                                
                            </div>
                        </div>
                    </div>               
                </div>
            </div>        
        </div> 

       

        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        Km lstring value
                    </div>
                    <div class="card-body"> 
                        <div class="row">
                            <div class="col-6"> 
                                <km-lstring-value value="Test Value" locale="en"></km-lstring-value>                                
                            </div>
                            <div class="col-6">
                                <div class="callout callout-warning">                              
                                    <code id="kmViewLinks">                             
                                        {{`<km-lstring-value value="Test Value" locale="en"></km-lstring-value>`}}
                                    </code>   
                                </div>                                                            
                            </div>
                        </div>
                    </div>               
                </div>
            </div>        
        </div>

        

        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        Km Value
                    </div>
                    <div class="card-body"> 
                        <div class="row">
                            <div class="col-6"> 
                                <km-value value="Test Value"></km-value>                                
                            </div>
                            <div class="col-6">
                                <div class="callout callout-warning">                              
                                    <code id="kmViewLinks">                             
                                        {{`<km-value value="Test Value"></km-value>`}}
                                    </code>   
                                </div>                                                            
                            </div>
                        </div>
                    </div>               
                </div>
            </div>        
        </div>   
     

        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">Km Locales</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6">
                                {{ kmLocalesModel }}
                                <km-locales
                                    :locales="locales"        
                                    v-model="kmLocalesModel"                                     
                                    >
                                </km-locales>
                            </div>
                            <div class="col-6">
                                <div class="callout callout-warning">
                                <code>
                                    {{`<km-locales :locales="locales" v-model="kmLocalesModel"></km-locales>`}}
                                </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">Km Term</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6">
                                {{ kmInitializeTerm }}
                                <km-term
                                    :value="kmTermModel" :locale="kmLocalesModel" @on-term-load="onTermLoad"                                           
                                    >
                                </km-term>
                                <br/>
                            </div>
                            <div class="col-6">
                                <div class="callout callout-warning">
                                <code>
                                   {{`<km-term
                                    :value="kmTermModel" :locale="kmLocalesModel" @on-term-load="onTermLoad"                                           
                                    >
                                </km-term>`}}
                                </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 

        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">Km value term</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6">
                            {{kmTermModel}} - {{kmLocalesModel}}
                                <km-value-term
                                    :value="kmTermModel" :locale="kmLocalesModel"                                          
                                    >
                                </km-value-term>
                            </div>
                            <div class="col-6">
                                <div class="callout callout-warning">
                                <code>
                                    {{` <km-value-term
                                    :value="kmTermModel" :locale="kmLocalesModel"                                          
                                    >
                                    </km-value-term>`}}
                                </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        File Upload Editor
                    </div>
                    <div class="card-body"> 
                        <div class="row">
                            <div class="col-6">
                                <button class="btn btn-default" @click="showFileUploadEditor()">Show File Upload editor</button>
                                <file-upload-editor ref="fileUploadEditorRef" @on-close="onFileUploadEditorClose"></file-upload-editor>
                                {{newFile}}
                            </div>
                            <div class="col-6">
                                <div class="callout callout-warning">                                
                                    <code>      
                                        &lt;button class=&quot;btn btn-default&quot; @click=&quot;showFileUploadEditor()&quot;&gt;Show File Upload editor&lt;/button&gt;
                                        &lt;file-upload-editor ref=&quot;fileUploadEditorRef&quot; @on-close=&quot;onFileUploadEditorClose&quot;&gt;&lt;/file-upload-editor&gt;                              
                                    </code>   
                                </div>                                                            
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>

    </div> 
</template>
<script setup>
    import { onMounted, onBeforeMount, ref, shallowRef, defineProps, inject, provide, reactive} from 'vue'
    import KmInputLstring from "./km-input-lstring.vue";
    import kmViewLinks from './link/km-view-links.vue';
    import kmAddLink from './link/km-add-link.vue';
    import linkEditor from './link/link-editor.vue';
    import KmFormGroup from "./km-form-group.vue"
    import kmLstringValue from "./view/km-lstring-value.vue"
    import kmValueBool from "./view/km-value-bool.vue"
    import kmValue from "./view/km-value.vue"
    import kmLocales from "./view/km-locales.vue"
    import kmTerm from "./view/km-term.vue"
    import fileUploadEditor from './link/file-upload-editor.vue';
    import kmValueTerm from "./view/km-value-term.vue";

    const kmTermModel = {
            identifier:"lang-zh"
        }
    const kmLocalesModel = ref('zh');
    const kmInputLStringModel = ref({});
    const locales = ref(["en", "fr", 'zh', 'ru']);
    const kmInitializeTerm = ref(null);

    const onTermLoad = function(term){
        kmInitializeTerm.value = term
        // thesaurusStore.loadTerm(`lang-${term}`);
    }

    const linkEditorRef = shallowRef();
    const fileUploadEditorRef = shallowRef();
    const kmAddLinkModel1 = ref([ { "url": "http://cbd.int", "name": "CBD website", "language": "en" } ]);
    const kmAddLinkModel2 = ref([ ]);
    const links = ref([
        { "url": "http://cbd.int", "name": "CBD website", "language": "en" ,tag:"Biodiversity"},
        { "url": "http://cbd.int", "name": "CBD website", "language": "en" ,tag:"Biodiversity"},
        { "url": "http://cbd.int", "name": "CBD website", "language": "en" ,tag:"Biodiversity"}]);
  
     const validationReview = {
        "identifier": "4DE6D968-FBB4-135A-3D23-DA52FB705939",
        "schema": "authority",
        "locales": [
            "en"
        ],
        "title": {},
        "summary": {},
        "errors": [
            {
            "code": "Error.Mandatory",
            "property": "government"
            },
            {
            "code": "Error.Mandatory",
            "property": "name"
            },
            {
            "code": "Error.Mandatory",
            "property": "city"
            },
            {
            "code": "Error.Mandatory",
            "property": "country"
            },
            {
            "code": "Error.Mandatory",
            "property": "phones"
            },
            {
            "code": "Error.Mandatory",
            "property": "emails"
            },
            {
            "code": "Error.Mandatory",
            "property": "responsibleForAll"
            }
        ]
    };

    const removeLocale = (index) => {
        locales.value.splice(index, 1);
    }
    
    const isValid = (name)=>{
        console.log(name)
        return !!validationReview?.errors?.find(e=>e.property == name)
    }

    // link Editor   
    const newLink = ref({url: 'https://cbd.int', name: 'CDB website', language: 'es'}) 
    const showLinkEditor = ()=>{
        linkEditorRef.value.show(newLink.value)
    }  
    function onLinkEditorClose(newValue) {    
        newLink.value = newValue;     
    }

    // file upload editor
    const newFile = ref({url: 'https://api/cbd.int/api/2013', name: 'report.pdf', language: 'en', tag : "Biodiversity"}) 
    const showFileUploadEditor=() =>{
        fileUploadEditorRef.value.show(newFile.value)
    }

    function onFileUploadEditorClose(newValue) {    
        newFile.value = newValue;     
    }



    onMounted(()=>{
        
    })
    onBeforeMount(()=>{
        provide("validationReview", {
            isValid
        });
    })
    // for select-file-button
    let files = ref([]);
    const receiveFile = (receiveFiles) => {
        if (receiveFiles instanceof Array) {
            files.value = receiveFiles;   
        }
        else{
        if (receiveFiles instanceof Object){
         
            files.value=[receiveFiles];   
        }   }      

    };
</script>

<style lang="scss" scoped>
</style> 