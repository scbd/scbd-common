
<template>
    <div>
        <h3>CBD controls components</h3>
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
                    <div class="card-header">KmInputLString</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6">
                                {{ kmInputLStringModel }}
                                <km-input-lstring
                                    v-model="kmInputLStringModel"
                                    :locales="locales"                                                    
                                    >
                                </km-input-lstring>
                                <br/>
                                <button class="btn btn-danger" @click="removeLocale">Remove locale</button>
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
                                        &lt;km-lstring-value value=&quot;Test Value&quot; locale=&quot;en&quot;&gt;&lt;/km-lstring-value&gt;
                                    </code>   
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

    const kmInputLStringModel = ref({});
    const locales = ref(["en", "fr", 'zh', 'ru']);

    const linkEditorRef = shallowRef();
    const kmAddLinkModel1 = ref([ { "url": "http://cbd.int", "name": "CBD website", "language": "en" } ]);
    const kmAddLinkModel2 = ref([ ]);
    const links = ref([
        { "url": "http://cbd.int", "name": "CBD website", "language": "en" ,tag:"Biodiversity"},
        { "url": "http://cbd.int", "name": "CBD website", "language": "en" ,tag:"Biodiversity"},
        { "url": "http://cbd.int", "name": "CBD website", "language": "en" ,tag:"Biodiversity"}]);

const links =ref([
      {
        "url": "https://www.google.com",
        "name": "website 1",
        "language": "en"
      },
      {
        "url": "https://www.bing.com",
        "name": "website 2",
        "language": "en"
      },
      {
        "url": "/api/v2013/documents/DFF1283A-411A-75CF-B678-0A6EA5696070/attachments/614774/TEST.txt",
        "name": "TEST.txt",
        "language": "en"
      },
      {
        "url": "/api/v2013/documents/DFF1283A-411A-75CF-B678-0A6EA5696070/attachments/614775/TEST.txt",
        "name": "TEST.txt",
        "language": "ar"
      }
    ]);
  
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
            {
            },
            "property": "name"
            "code": "Error.Mandatory",
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
            {
            },
            "code": "Error.Mandatory",
            "property": "emails"
            {
            },
            "code": "Error.Mandatory",
            "property": "responsibleForAll"
            }
        ]
    };

    const removeLocale = () => {
        locales.value.splice(1, 1);
    }
    
    const isValid = (name)=>{
        console.log(name)
        return !!validationReview?.errors?.find(e=>e.property == name)
    }


    onMounted(()=>{
        
    })
    onBeforeMount(()=>{
        provide("validationReview", {
            isValid
        });
    })
</script>

<style lang="scss" scoped>
</style> 