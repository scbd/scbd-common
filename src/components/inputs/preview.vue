<template>
  <div>
    <h3>CBD input components</h3>
 
    <preview-component card-header="checkbox">
            <template #left>
              <checkbox v-model="isChecked">
                  <template #label>
                    <!-- Content for the label slot -->
                    This is the label slot
                  </template>
                </checkbox>
                <br/>value: {{ isChecked }}        
            </template>          
            <template #right>
                <code>
                    {{ ` <checkbox v-model="isChecked">
                          <template #label>
                            <!-- Content for the label slot -->
                            This is the label slot
                          </template>
                        </checkbox> ` }}
                </code>
            </template>
    </preview-component> 

    <preview-component card-header="Date Selector">
            <template #left>
              <date-selector class="test" v-model="dateValue"></date-selector>
                <div>Selected value : {{ dateValue }}</div>
            </template>
            <template #right>
                {{` <date-selector class="test" v-model="dateValue"></date-selector>`}}
            </template>
    </preview-component>

    <div class="row"> 
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        Select File button
                    </div>
                    <div class="card-body"> 
                        <div class="row">
                            <div class="col-6">                              
                                <select-file-button  multiple @on-file-selected="receiveFile"> <slot name="file-button-label">+ Add Multiple Files</slot></select-file-button> 
                                <br/>   
                                <br/>  
                                <select-file-button  @on-file-selected="receiveFile"> <slot name="file-button-label">+ Add Single File</slot></select-file-button>     
                                <br/>   
                                <br/>                         
                                <select-file-button  @on-file-selected="receiveFile" :accept="mimeTypeWhitelist"> <slot name="file-button-label">+ set accept file type</slot></select-file-button>                              
                                <br/>   
                                <br/>  
                                <div v-for="(item, index) in files" :key="index">
                                    File name: {{item.name}}     
                                </div>  
                            </div>
                            <div class="col-6">                              
                                <div class="callout callout-warning">
                                    <code>                              
                                      &lt;select-file-button  multiple @on-file-selected=&quot;receiveFile&quot;&gt; &lt;slot name=&quot;file-button-label&quot;&gt;+ Add Multiple File&lt;/slot&gt;&lt;/select-file-button&gt; 
                                      &lt;select-file-button  @on-file-selected=&quot;receiveFile&quot;&gt; &lt;slot name=&quot;file-button-label&quot;&gt;+ Add Single File&lt;/slot&gt;&lt;/select-file-button&gt;      
                                      &lt;select-file-button  @on-file-selected=&quot;receiveFile&quot; :accept=&quot;mimeTypeWhitelist&quot;&gt; &lt;slot name=&quot;file-button-label&quot;&gt;+ set accept file type&lt;/slot&gt;&lt;/select-file-button&gt;                             
                                    </code> 
                                </div>                                                                        
                            </div>
                        </div>        
                    </div>             
                </div>
            </div>    
        </div>  

        <preview-component card-header="radio">
            <template #left>
              Example 1 :<br/>
              <radio v-model="radioValue1" value ="true" :inline="false">
                <template #label>
                  <!-- Content for the label slot -->
                  Yes
                </template>
              </radio>
              <radio v-model="radioValue1" value="false" :inline="false">
                <template #label>
                  <!-- Content for the label slot -->
                  No
                </template>
              </radio>            
                value: {{ radioValue1 }}   

                <br/><br/>Example 2 :<br/>

              <radio v-model="radioValue2" value ="true" :inline="true">
                  <template #label>
                    <!-- Content for the label slot -->
                    Yes
                  </template>
              </radio>
              <radio v-model="radioValue2" value="false" :inline="true">
                  <template #label>
                    <!-- Content for the label slot -->
                    No
                  </template>
              </radio>
                <br/>
                value: {{ radioValue2 }}    
              
   
            </template>          
            <template #right>
                <code>
                    {{ `  
                       <radio v-model="radioValue1" value ="true" :inline="false">
                        <template #label>                      
                          Yes
                        </template>
                      </radio>
                      <radio v-model="radioValue1" value="false" :inline="false">
                        <template #label>                    
                          No
                        </template>
                      </radio>               

                      <radio v-model="radioValue2" value ="true" :inline="true">
                          <template #label>                       
                            Yes
                          </template>
                      </radio>
                      <radio v-model="radioValue2" value="false" :inline="true">
                          <template #label>                     
                            No
                          </template>
                      </radio>
                   ` }}
                </code>
            </template>
    </preview-component> 


    <preview-component card-header="km-ck-editor">
      <template #left>
          <ck-editor v-model="ckText" :config="allPluginsConfig"  >
          </ck-editor>  
          {{ ckText }} 
      </template>
      <template #right>
          <code>
              {{ `   <ck-editor v-model="ckText" :config="allPluginsConfig" ></ck-editor>` }}
          </code>
      </template>
  </preview-component> 

  </div>

  <preview-component card-header="multi checkbox">
            <template #left>
                Example 1:
                <multi-checkbox v-model="selectedOptions1" :options=options :inline="true" /> 
                selected : {{  selectedOptions1}}   
                <br/><br/>
                Example 2:
                <multi-checkbox v-model="selectedOptions2" :options=options :inline="false" /> 
                selected : {{  selectedOptions2}}        
  
            </template>          
            <template #right>
                <code>
                    {{ ` <multi-checkbox v-model="selectedOptions1" :options=options :inline="true" /> 
                         <multi-checkbox v-model="selectedOptions2" :options=options :inline="false" /> ` }}
                </code>
            </template>
  </preview-component> 

</template>

<script setup lang="ts">
  import checkbox from "./checkbox.vue";
  import dateSelector from "./dateSelector.vue";
  import { ref , computed} from "vue";
  import selectFileButton from './select-file-button.vue';
  import { mimeTypeWhitelist } from "../../services/api/km-storage/KmDocuments";
  import previewComponent from "../controls/preview-component.vue";
  import radio from "./radio.vue";
  import ckEditor from "./ck-editor/ck-editor.vue";
  import { allPluginsConfig } from './ck-editor/all-plugins-config.js';
  import multiCheckbox from './multi-checkbox.vue'

  //checkbox  
 const isChecked = ref<boolean>(false);

// DateSelector
const dateValue = ref<string>('2024-02-06');

  //for select-file-button example
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

// Radio
const radioValue1 = ref<string>('true');
const radioValue2 = ref<string>('true');


  // for km-ck-editor
  const ckText= ref("");

</script>
<style lang="scss" scoped></style>
 