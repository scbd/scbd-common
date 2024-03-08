<template>
    <div>
        <h3>CBD controls components</h3>
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        
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
        
    </div>
</template>

<script setup>
import { onMounted, ref} from 'vue'
import linkEditor from './link/link-editor.vue';

const linkEditorRef = ref();

const showLinkEditor = ()=>{
    linkEditorRef.value.show({url: 'https://cnbd.int', name: 'sdf', language: 'es2'})
}
const onLinkEditorClose = (newVal)=>{
    console.log(newVal)
}
</script>

<style lang="scss" scoped>

</style>