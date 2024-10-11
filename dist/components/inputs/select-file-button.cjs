'use strict';

var vue = require('vue');

const _hoisted_1 = ["id"];


var script = {
  __name: 'select-file-button',
  props: { 
    multiple: { type: Boolean, require: false, default: false },
    accept: { type: Array, require: false, default: ['*/*'] }
  },
  emits: ['onFileSelected'],
  setup(__props, { emit: __emit }) {

  const emit = __emit;
  const props = __props;  
  
  const selectFile = () =>{   
    const fileInput = document.createElement('input');
   
    fileInput.type = 'file';
    fileInput.style.display = 'none';
  
    if (props.multiple) fileInput.setAttribute('multiple', props.multiple);
    if (props.accept && !props.accept?.includes('*/*')) fileInput.setAttribute('accept', props.accept?.join(', '));
  
    fileInput.addEventListener('click', ($event) => $event.stopPropagation());    
    fileInput.addEventListener('change', ({ target }) => { 
      const files = [...target.files]; 
      if (props.multiple)
        emit('onFileSelected', files);   
      else 
        emit('onFileSelected', files[0]);   
      
    }); 

    fileInput.click();   
  }; 

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("button", {
    class: "scbd-common select-file-button btn btn-primary",
    type: "button",
    id: _ctx.$attrs.id,
    onClick: _cache[0] || (_cache[0] = vue.withModifiers($event => (selectFile()), ["prevent","stop"]))
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 8 /* PROPS */, _hoisted_1))
}
}

};

script.__file = "src/components/inputs/select-file-button.vue";

module.exports = script;
//# sourceMappingURL=select-file-button.cjs.map
