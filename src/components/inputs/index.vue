<template>
    <div>
        <h1>CBD input components</h1>
        <div class="row">
            <div class="col-6">
                <h3>Checkbox</h3>
                <checkbox  v-model="isChecked">
                    <template #label>
                        <!-- Content for the label slot -->
                        This is the label slot
                    </template>
                </checkbox>
            </div>
            <div class="col-6">
                <h3>Checkbox Code</h3>
                <textarea rows="10" cols="80" class="bg-black text-white"> 
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
        
        <div class="row">
            <div class="col-6">
                <h3>Date Selector</h3> {{ dateValue }}
                <date-selector  class="test" v-model="dateValue"></date-selector>
            </div>
            <div class="col-6">
                <h3>Date Selector Code</h3>
                <textarea rows="10" cols="80" class="bg-black text-white"> 
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
</template>

<script setup>
//Checkbox
  import checkbox from '../../../src/components/inputs/checkbox.vue';
  import { ref} from 'vue';
  const isChecked = ref(true)

  //dateSelector
  import dateSelector from  '../../../src/components/inputs/dateSelector.vue'
  const dateValue = ref('2024-02-06');
 
</script>

<style lang="scss" scoped>

</style>