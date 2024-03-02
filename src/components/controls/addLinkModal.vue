


<template> 
 
         <div v-if="modelValue" class="modal-mask" @click.self="closeModal">
               <!-- <div id="editLink" class="modal" data-backdrop="static">  -->
              <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h3>editing link</h3>
                    </div>
                    <!-- <div class="modal-body"  >
                      <div class="alert alert-info">url of website <a rel="noopener" translation-url target="_blank" href="http://www.cbd.int">https://www.cbd.int</a>website</div>
                      <form name="linkForm">
                        <fieldset>
                          <div class="alert alert-warning" >
                            <span ng-bind-html=""></span>
                            <ul><li> linktype</li></ul>
                          </div>
                          <div class="control-group" >
                            <label class="control-label"  for="url">url</label>
                            <div class="help-block">protocol</div>
                            <div style="color: #e32">validurl</div>
                            <input class="form-control" type="url" style="width:98%"  placeholder="https://www.cbd.int" />
                          </div>

                          <div class="control-group" >
                            <label>name</label>
                            <input class="form-control" type="text" style="width:98%"  placeholder="" />
                          </div>

                          <div class="control-group" >
                            <label class="control-label"  for="Language">language</label>                         
                          </div>
                        </fieldset>
                      </form>
                    </div> -->
                    <div class="modal-footer d-block">                  
                      <button type="button" class="btn btn-primary px-3 float-end" @click="save">Save</button>
                      
                      <button type="button" class="btn btn-secondary px-3 float-end" @click="closeModal">cancel</button>
                    </div>
                  </div>
               <!-- </div> 
              </div>
                <slot></slot>-->      
              <!-- </div> -->
            </div> 
         </div>  

</template>


<script setup lang="ts">
import { ref, computed } from 'vue';
const model = defineModel({type:Object, required:true});


interface Props {
  modelValue?:boolean;
  //modelValue?:Object;
  //newLink:string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue:false,
  //newLink:""
});


const newLink = ref("");
// const props1 =  computed(()=>{  
//       return model.value.props1;   
//  }); 
//  const props2 =  computed(()=>{  
//   return model.value.props1;     
//  }); 
// let newLink = computed(()=>{  
//      return model.value.props2;      
// }); 

//const newLink1 = ref("testsetsetset")

const emit = defineEmits<{
  (e:"update:modelValue", modelValue:boolean):void;
}>()

//const emit1 = defineEmits(['newLink1'])

// const emitNewLink = defineEmits<{
//   (e:"update:newLink", newLink:string):void;
// }>()

// const emitNewLink = defineEmits(['newLink']);
//const emit = defineEmits(['modelValue', 'newLink'])

const closeModal = ():void => {
      emit('update:modelValue', false)
      //emit('modelValue',false)
}

const save = ():void => {
      //emit1('newLink1')
      //emitNewLink('newLink', newLink) 
       emit('update:modelValue', false)
      
}


</script>


<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  margin: auto;
  max-height: 95%;
  transition: all 0.3s ease;
  z-index: 9999;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
