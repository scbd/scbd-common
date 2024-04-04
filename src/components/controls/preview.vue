<template>
    <div>
        <h3>CBD controls components</h3>

        <preview-component card-header="Available locales">
            <template #left>
                <div class="btn-group">
                    <button class="btn btn-danger" v-for="(locale, index) in locales" :key="locale" @click="removeLocale(index)">
                        <i class="bi bi-trash"></i> {{locale}}
                    </button>
                </div>
            </template>
            <template #right>
                {{`<button class="btn btn-danger" v-for="(locale, index) in locales" :key="locale" @click="removeLocale(index)">
                    <i class="bi bi-trash"></i></button> `}}
            </template>
        </preview-component>  

        <preview-component card-header="Link editor">
            <template #left>
                <button class="btn btn-default" @click="showLinkEditor()">Show Link editor</button>
                <link-editor ref="linkEditorRef" @on-close="onLinkEditorClose"></link-editor>
                {{newLink}}
            </template>
            <template #right>
                &lt;button class=&quot;btn btn-default&quot; @click=&quot;showLinkEditor()&quot;&gt;Show Link editor&lt;/button&gt;
                &lt;link-editor ref=&quot;linkEditorRef&quot; @close=&quot;onLinkEditorClose&quot;&gt;&lt;/link-editor&gt;
            </template>
        </preview-component>

        <preview-component card-header="Km view links">
            <template #left>
                <km-view-links v-model="links"   @on-edit = "edit($event)"  @on-delete = "remove($event)"></km-view-links>
            </template>
            <template #right>
                &lt;km-view-links v-model=&quot;links&quot;    @on-edit  = &quot;edit($event)&quot;  @on-delete = &quot;remove($event)&quot;&gt;&lt;/km-view-links&gt;                         
            </template>
        </preview-component>

        <preview-component card-header="Km value bool">
            <template #left>
                <km-value-bool value="true" locale="en"></km-value-bool>
            </template>
            <template #right>
                {{`<km-value-bool value="true" locale="en"></km-value-bool>`}}
            </template>
        </preview-component>

        <preview-component card-header="KmInputLString">
            <template #left>
                <km-input-lstring v-model="kmInputLStringModel" :locales="locales" >
                </km-input-lstring>
                <br/>
                {{ kmInputLStringModel }}
            </template>
            <template #right>                 
                <code>
                    {{ `<km-input-lstring v-model="kmInputLStringModel" :locales="locales" >
                    </km-input-lstring>` }}
                </code>         
            </template>
        </preview-component>

        <preview-component card-header="KmInputLString ">
            <template #left>
                <km-input-lstring v-model="kmInputLStringModel" :locales="locales" rows="5" >
                </km-input-lstring>
                <br/>
                {{ kmInputLStringModel }}
            </template>
            <template #right>                 
                <code>
                    {{ `<km-input-lstring v-model="kmInputLStringModel" :locales="locales"  rows="5" >
                    </km-input-lstring>` }}
                </code>         
            </template>
        </preview-component>

        <preview-component card-header="Add Link">
            <template #left>
                <km-add-link  v-model="kmAddLinkModel1"/>Parent links :   {{ kmAddLinkModel1 }}   
                <br/>
            </template>
            <template #right>
                &lt;km-add-link/&gt;
            </template>
        </preview-component>

        <preview-component card-header="Add Websites">
            <template #left>
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
            </template>
            <template #right>
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
            </template>
        </preview-component>

        <preview-component card-header="Km form group">
            <template #left>
                <km-form-group required name="government" caption="SCBD Control help" help-content="This is a preview of simple help, it also supports <h3>html</h3>">
                    <input name="government-input" class="form-control" />
                </km-form-group>   
            </template>
            <template #right>
                {{` <km-form-group required name="government" caption="SCBD Control help" help-content="This is a preview of simple help, it also supports <h3>html</h3>">
                    <input name="government-input" class="form-control" />
                </km-form-group>    `}}
                <br><br>
                <select-file-button  multiple @on-file-selected="receiveFile"> <slot name="file-button-label">+ Add Multiple File</slot></select-file-button> 
                <br/>   
                <br/>
                <select-file-button  @on-file-selected="receiveFile"> <slot name="file-button-label">+ Add File</slot></select-file-button>                              
                <div v-for="(item, index) in files" :key="index">
                            {{item.name}}     
                </div>   
            </template>
        </preview-component>

        <preview-component card-header="Km lstring value">
            <template #left>
                <km-lstring-value value="Test Value" locale="en"></km-lstring-value>                 
            </template>
            <template #right>
                {{`<km-lstring-value value="Test Value" locale="en"></km-lstring-value>`}}
            </template>
        </preview-component> 

        <preview-component card-header="Km Value">
            <template #left>
                <km-value value="Test Value"></km-value>  
            </template>
            <template #right>
                {{`<km-value value="Test Value"></km-value>`}}
            </template>
        </preview-component> 
     
        <preview-component card-header="Km Locales">
            <template #left>
                {{ kmLocalesModel }}
                <km-locales
                    :locales="locales"        
                    v-model="kmLocalesModel"                                     
                    >
                </km-locales>
            </template>
            <template #right>
                {{`<km-locales :locales="locales" v-model="kmLocalesModel"></km-locales>`}}
            </template>
        </preview-component>

        <preview-component card-header="Km Term">
            <template #left>
                 {{ kmInitializeTerm }}
                    <km-term
                        :value="kmTermModel" :locale="kmLocalesModel" @on-term-load="onTermLoad"                                           
                        >
                    </km-term>
            </template>
            <template #right>
                {{`<km-term
                    :value="kmTermModel" :locale="kmLocalesModel" @on-term-load="onTermLoad"                                           
                    >
                </km-term>`}}
            </template>
        </preview-component>

        <preview-component card-header="Km value term">
            <template #left>
                {{kmTermModel}} - {{kmLocalesModel}}
                <km-value-term
                    :value="kmTermModel" :locale="kmLocalesModel"                                          
                    >
                </km-value-term>
            </template>
            <template #right>
                {{` <km-value-term
                :value="kmTermModel" :locale="kmLocalesModel"                                          
                >
                </km-value-term>`}}
            </template>
        </preview-component> 

        <preview-component card-header="File Upload Editor">
            <template #left>
                <button class="btn btn-default" @click="showFileUploadEditor()">Show File Upload editor</button>
                <file-upload-editor ref="fileUploadEditorRef" @on-close="onFileUploadEditorClose"></file-upload-editor>
                {{newFile}}
            </template>
            <template #right>
                &lt;button class=&quot;btn btn-default&quot; @click=&quot;showFileUploadEditor()&quot;&gt;Show File Upload editor&lt;/button&gt;
                &lt;file-upload-editor ref=&quot;fileUploadEditorRef&quot; @on-close=&quot;onFileUploadEditorClose&quot;&gt;&lt;/file-upload-editor&gt;                              
            </template>
        </preview-component>

        <preview-component card-header="Km value terms">
            <template #left>
                <km-value-terms
                    :value="kmValueTermsModel" :locale="kmLocalesModel"                                          
                    >
                </km-value-terms>
                <br/>
            </template>
            <template #right>
                {{`<km-value-terms :value="kmValueTermsModel" :locale="kmLocalesModel"></km-value-terms>`}}
            </template>
        </preview-component>        

        <preview-component card-header="Add File">
            <template #left>
                <km-add-file v-model="kmAddFileModel1" :multiple="false"/>                                
                <br/>Parent links :   {{ kmAddFileModel1 }}   <br/> 
            </template>
            <template #right>
                {{`<km-add-file v-model="kmAddFileModel1" :multiple="false"/>`}}
            </template>
        </preview-component>


        <preview-component card-header="Add File">
            <template #left>
                <km-add-file v-model="kmAddFileModel2" >                                                                  
                    <template #link-button-label>
                        Add File
                    </template>
                    <template #link-dialog-title>
                        My custom title
                    </template>                                  
                    <template #links-view>     
                        <p></p>                                  
                    </template> 
                </km-add-file> 
                Parent links :   {{ kmAddFileModel2 }}   <br/> 
            </template>
            <template #right>                
                {{` <km-add-file v-model="kmAddFileModel2" >                                                                  
                    <template #link-button-label>
                        Add File
                    </template>
                    <template #link-dialog-title>
                        My custom title
                    </template>                                  
                    <template #links-view>     
                        <p></p>                                  
                    </template> 
                </km-add-file>`}}
            </template>
        </preview-component>


         <preview-component card-header="multi-selector">
            <template #left>
                <multi-selector
                    v-model="selectedItem"       
                    :options="options"
                    :label="label"
                    :value-key="valueKey"
                    :custom-label="customLabel"
                    :placeholder = "placeholder"
                    :track-by = "trackBy"
                    :multiple="multiple"
                    :disabled = "disabled"
                    :open-direction="openDirection" 
                    :searchable="searchable"   
                    @on-search-change="onSearchChange">                                   
                </multi-selector>  
                <br/>selected: {{ selectedItem}} <br/>   
            </template>
            <template #right>

                {{`<multi-selector
                    v-model="selectedItem"       
                    :options="options"
                    :label="label"
                    :value-key="valueKey"
                    :custom-label="customLabel"
                    :placeholder = "placeholder"
                    :track-by = "trackBy"
                    :multiple="multiple"
                    :disabled = "disabled"
                    :open-direction="openDirection" 
                    :searchable="searchable"   
                    @on-search-change="onSearchChange">                                   
                </multi-selector> `}}

            </template>
        </preview-component> 

        <preview-component card-header="Km Form Wizard Tab Content">
            <template #left>
                <km-form-wizard @on-tab-change="onChangeCurrentTab">
                    <!-- Tab 1 -->
                    <km-form-wizard-tab-content :isActive="activeTab === 0" title="Tab 1">
                        <form  class="mx-auto" style="width: 18rem;">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </km-form-wizard-tab-content>
                    
                    <!-- End of Tab 1 -->
                    <!-- Tab 2 -->
                    <km-form-wizard-tab-content  :isActive="activeTab === 1" title="Tab 2">
                        <div class="card mx-auto my-2" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="card-link">Card link</a>
                                <a href="#" class="card-link">Another link</a>
                            </div>
                        </div>
                    </km-form-wizard-tab-content>
                    
                    <!-- End of Tab 2 -->
                </km-form-wizard>
            </template>
            <template #right>
                {{`
                    <km-form-wizard-tab-content :isActive="activeTab === 0" title="Tab 1"></km-form-wizard-tab-content>
                `}}
            </template>
        </preview-component>


         <preview-component card-header="Spinner">
            <template #left>
                <spinner variant="spinner-grow spinner-grow-sm">New loading</spinner>
            </template>
            <template #right>
                <code>
                    {{ `<spinner></spinner>` }}
                </code>
            </template>
        </preview-component> 

         <preview-component card-header="spinner modal">
            <template #left>
                <spinner-modal :visible="true" title="Title" message="Please wait"></spinner-modal>
            </template>
            <template #right>
                <code>
                    {{ `<spinner-modal :visible="true" title="Title" message="Please wait"></spinner-modal>` }}
                </code>
            </template>
        </preview-component> 


         <preview-component card-header="km input rich lstring">
            <template #left>
                <km-input-rich-lstring :locales="locales"  v-model="richLstringModel" ></km-input-rich-lstring>
                data: {{ richLstringModel }}
            </template>          
            <template #right>
                <code>
                    {{ ` <km-input-rich-lstring :locales="locales" v-model="richLstringModel"></km-input-rich-lstring>` }}
                </code>
            </template>
        </preview-component> -

        <!-- <preview-component card-header="Link editor">
            <template #left></template>
            <template #right>
                <code></code>
            </template>
        </preview-component> -->

    </div>
</template>
<script setup>
    import { onBeforeMount, ref, shallowRef, defineProps, inject, provide, reactive, onMounted} from 'vue'
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
    import kmValueTerms from "./view/km-value-terms.vue";
    import previewComponent from "./preview-component.vue";
    import multiSelector from './multi-selector.vue'
    import kmAddFile from './link/km-add-file.vue';
    import kmFormWizard from "./km/km-form-wizard.vue";
    import kmFormWizardTabContent from "./km/km-form-wizard-tab-content.vue";
    import spinner from "./spinner.vue";
    import spinnerModal from './spinner-modal.vue';
    import kmInputRichLstring from "./km/km-input-rich-lstring.vue";

    const kmValueTermsModel = [
            {
                identifier:"lang-ar"
            },
            {
                identifier:"lang-zh"
            },
            {
                identifier:"lang-ru"
            },
        ]

    const kmTermModel = {
            identifier:"lang-zh"
        }
    const kmLocalesModel = ref('zh');
   
    const kmInputLStringModel = ref({});
    const locales = ref(["en", "fr", 'zh', 'ru']);
    const kmInitializeTerm = ref(null);
    const activeTab = ref(0)

    const onTermLoad = function(term){
        kmInitializeTerm.value = term
        // thesaurusStore.loadTerm(`lang-${term}`);
    }

    const linkEditorRef = shallowRef();
    const fileUploadEditorRef = shallowRef();
    const kmAddLinkModel1 = ref([ { "url": "http://cbd.int", "name": "CBD website", "language": "en" } ]);
    const kmAddLinkModel2 = ref([ ]);
    const kmAddFileModel1 = ref([ { "url": "http://api.cbd.int/api/2013", "name": "report.pdf", "language": "en" ,tag:"Biodiversity"} ]);
    const kmAddFileModel2 = ref([ { "url": "http://api.cbd.int/api/2013", "name": "report.pdf", "language": "en" ,tag:"Biodiversity"} ]);
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

    const onChangeCurrentTab = (index) => {
        activeTab.value = index;
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

   
    // for multi-selector            
    const label = "language";
    const placeholder = "please select one";
    const trackBy = "name";
    const valueKey = "name";
    const multiple= true;
    const openDirection = ""; 
    const searchable="true";    
    const disabled=false;   
    const customLabel =(item)=>{
        return item.name + '-' + item.language;
    }     
    const selectedItem= ref("");
    const options= [
        { name: 'Vue.js', language: 'JavaScript' },
        { name: 'Rails', language: 'Ruby' },
        { name: 'Sinatra', language: 'Ruby' },
        { name: 'Laravel', language: 'PHP', $isDisabled: true },
        { name: 'Phoenix', language: 'Elixir' }
    ];

    // km-input-rich-lstring
    const richLstringModel = ref({});
   
</script>

<style  lang="scss" scoped ></style>