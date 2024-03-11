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
                                <km-view-links v-model="links"   @onEdit = "edit($event)"  @onDelete = "remove($event)"></km-view-links>                                
                            </div>
                            <div class="col-6">
                                <div class="callout callout-warning">                              
                                    <code id="kmViewLinks">                             
                                        &lt;km-view-links v-model=&quot;links&quot;    @onEdit  = &quot;edit($event)&quot;  @onDelete = &quot;remove($event)&quot;&gt;&lt;/km-view-links&gt;                         
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
import kmViewLinks from './link/km-view-links.vue';

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
  

</script>

<style lang="scss" scoped>

</style> 

