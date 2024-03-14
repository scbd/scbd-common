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
                                <link-editor ref="linkEditorRef" @close="onLinkEditorClose"></link-editor>
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
                    <div class="card-header font-weight-bold">Km input lstring multi line input</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6">
                                {{ kmInputLStringMlModel }}
                                <km-input-lstring-ml
                                    v-model="kmInputLStringMlModel"
                                    :locales="locales"
                                    >
                                </km-input-lstring-ml>
                            </div>
                            <div class="col-6">
                                <div class="callout callout-warning">
                                    <code>
                                            &lt;km-input-lstring-ml
                                            v-model=&quot;kmInputLStringMlModel&quot;
                                            :locales=&quot;locales&quot;
                                            &gt;
                                        &lt;/km-input-lstring-ml&gt;
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
import { onMounted, ref} from 'vue'
import linkEditor from './link/link-editor.vue';
import KmInputLstring from "./km-input-lstring.vue";
import KmInputLstringMl from "./km-input-lstring-ml.vue"
const kmInputLStringModel = ref({});
const locales = ref(["en", "fr"]);//, 'zh', 'ru'
import kmViewLinks from './link/km-view-links.vue';
const kmInputLStringMlModel = ref([{}]);

const linkEditorRef = ref();

const showLinkEditor = ()=>{
    linkEditorRef.value.show({url: 'https://cnbd.int', name: 'sdf', language: 'es2'})
}
const onLinkEditorClose = (newVal)=>{
    console.log(newVal)
}


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
  


const removeLocale = () => {
    locales.value.splice(1, 1);
}
</script>

<style lang="scss" scoped>

</style> 

