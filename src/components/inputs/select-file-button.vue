<template>
    <button    
      class="btn btn-primary"
      type="button"
      v-bind="$attrs"
      @click.prevent.stop="selectFile()">  
      <slot name="default" ></slot>
    </button> 
</template>
  
<script setup>  
  const emit = defineEmits(['files']);

  const props = defineProps({ 
    multiple: { type: Boolean, require: false, default: false },
    accept: { type: String, require: false, default: '*/*' }
  })  
  
  const selectFile = () =>{   
    const fileInput = document.createElement('INPUT');
  
    fileInput.type = 'file';
    fileInput.style.display = 'none';
  
    if (props.multiple) fileInput.setAttribute('multiple', props.multiple);
    if (props.accept && props.accept !== '*/*') fileInput.setAttribute('accept', props.accept);
  
    fileInput.addEventListener('click', ($event) => $event.stopPropagation());    
    fileInput.addEventListener('change', ({ target }) => { 
      const files = [...target.files];  
      emit('files', files);   
    }) 

    fileInput.click();   
  }  
 
  </script>