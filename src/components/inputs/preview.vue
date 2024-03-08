<template>
    <div>
        <h3>CBD input components</h3>   
        
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        Checkbox
                    </div>
                    <div class="card-body"> 
                        <div class="row">
                            <div class="col-6">
                                <checkbox  v-model="isChecked">
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
                                                <slot name="label">{{ label }}</slot>
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

                                </textarea>
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
                        Date Selector
                    </div>
                    <div class="card-body"> 
                        <div class="row">
                            <div class="col-6">
                                <date-selector  class="test" v-model="dateValue"></date-selector>
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
                                </textarea>
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
  import checkbox from './checkbox.vue';
  import { ref} from 'vue';
  const isChecked = ref(true)

  //dateSelector
  import dateSelector from  './dateSelector.vue'
  const dateValue = ref('2024-02-06');
 
</script>

<style lang="scss" scoped>

</style>

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