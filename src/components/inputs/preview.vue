<template>
  <div>
    <h3>CBD input components</h3>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">Checkbox</div>
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                <checkbox v-model="isChecked">
                  <template #label>
                    <!-- Content for the label slot -->
                    This is the label slot
                  </template>
                </checkbox>
              </div>
              <div class="col-4">
                <strong>sample code</strong>
                <textarea rows="10" cols="80" class="bg-purple text-white">
 
                                    <template>
                                        <div class="form-check">
                                            <input
                                                type="checkbox"
                                                v-model="model"
                                                :id="$attrs.id"
                                                :required="$attrs.required"
                                                :disabled="$attrs.disabled"
                                                :class="$attrs.class"
                                                class="form-check-input"
                                            />
                                            <label :for="$attrs.id" class="form-check-label">
                                                <slot name="label">{{
                    label
                  }}</slot>
                                            </label>
                                        </div>
                                    </template>
                                    <script setup>
                                        const model = defineModel({
                                            type: Boolean,
                                            required: true,
                                        });
                                        const props = defineProps({
                                            label: {
                                            type: String,
                                            required: true,
                                            },
                                        });
                                    </script>
                                </textarea
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">Date Selector</div>
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                <date-selector class="test" v-model="dateValue"></date-selector>
                <div>Selected value : {{ dateValue }}</div>
              </div>
              <div class="col-4">
                <strong>Date selector sample code</strong>
                <textarea rows="10" cols="80" class="bg-purple text-white">
 
                                <template>    
                                    <input    
                                        v-model="model"
                                        :class="$attrs.class"
                                        :id="$attrs.id"
                                        :required="$attrs.required" 
                                        :placeholder="$attrs.placeholder"
                                        :disabled="$attrs.disabled"
                                        :type="type" /> 
                                </template>
                                <script setup>
                                    const model = defineModel();    
                                    const props = defineProps({
                                        type:{
                                            type:String,
                                            default:"date",
                                            validator(value) { 
                                                return ['date', 'month'].includes(value)
                                            }
                                        }   
                                    });
                                </script>
                                </textarea
                >
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
                        Select File button
                    </div>
                    <div class="card-body"> 
                        <div class="row">
                            <div class="col-6">
                                <select-file-button  multiple @on-file-selected="receiveFile"> <slot name="file-button-label">+ Add Multiple Files</slot></select-file-button> 
                                <br/>   
                                <br/>
                                <select-file-button  @on-file-selected="receiveFile"> <slot name="file-button-label">+ Add Single File</slot></select-file-button>                              
                                <div v-for="(item, index) in files" :key="index">
                                           {{item.name}}     
                                </div>                                    
                            </div>
                            <div class="col-6">                              
                                <div class="callout callout-warning">
                                    <code>                              
                                      &lt;select-file-button  multiple @on-file-selected=&quot;receiveFile&quot;&gt; &lt;slot name=&quot;file-button-label&quot;&gt;+ Add Multiple File&lt;/slot&gt;&lt;/select-file-button&gt; 
                                      &lt;select-file-button  @on-file-selected=&quot;receiveFile&quot;&gt; &lt;slot name=&quot;file-button-label&quot;&gt;+ Add Single File&lt;/slot&gt;&lt;/select-file-button&gt;      
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
  //Checkbox
  import checkbox from "./checkbox.vue";
  import dateSelector from "./dateSelector.vue";
  import { ref , computed} from "vue";
  import selectFileButton from './select-file-button.vue';

  const isChecked = ref(true);
  //dateSelector
  const dateValue = ref("2024-02-06");
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
  

</script>
<style lang="scss" scoped></style>
<!-- <div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header">
                
            </div>
            <div class="card-body"> 
                <div class="row">
                   <div class="col-6">
                        
                    </div>
                    <div class="col-6">
                        <div class="callout callout-warning">
                            <code>                                    
                                ///HTML Escape////
                            </code>   
                        </div>                                                            
                    </div>
                </div>
            </div>               
        </div>
    </div>        
</div> -->