
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
                                <km-add-link  v-model="kmAddLinkModel"/>  
                                Parent links :   {{ kmAddLinkModel }}   <br/>
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
                                <km-add-link v-model="kmAddLinkModel">
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

    </div>
</template>

<script setup>
    import { onMounted, ref,shallowRef} from 'vue'
    import KmInputLstring from "./km-input-lstring.vue";
    import kmViewLinks from './link/km-view-links.vue';
    import kmAddLink from './link/km-add-link.vue';
    import linkEditor from './link/link-editor.vue';

    const kmInputLStringModel = ref({});
    const locales = ref(["en", "fr", 'zh', 'ru']);

    const linkEditorRef = shallowRef();
    const kmAddLinkModel = ref([ { "url": "http://cbd.int", "name": "CBD website", "language": "en" } ]);

    const links = ref([
        { "url": "http://cbd.int", "name": "CBD website", "language": "en" ,tag:"Biodiversity"},
        { "url": "http://cbd.int", "name": "CBD website", "language": "en" ,tag:"Biodiversity"},
        { "url": "http://cbd.int", "name": "CBD website", "language": "en" ,tag:"Biodiversity"}]);

    const showLinkEditor = ()=>{
        linkEditorRef.value.show({url: 'https://cnbd.int', name: 'sdf', language: 'es2'})
    }
    const onLinkEditorClose = (newVal)=>{
        console.log(newVal)
    }

    const removeLocale = () => {
        locales.value.splice(1, 1);
    }
</script>

<style lang="scss" scoped>

</style> 