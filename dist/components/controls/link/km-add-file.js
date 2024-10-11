import { mergeModels, useModel, computed, openBlock, createElementBlock, unref, createElementVNode, Fragment, renderList, toDisplayString, createCommentVNode, ref, renderSlot, createTextVNode, withDirectives, vModelText, vModelSelect, withModifiers, shallowRef, createVNode, withCtx } from 'vue';

const languages = {
    "ar" : "العربية",
    "zh" : "中文",
    "en" : "English",
    "es" : "Español",
    "fr" : "Français",
    "ru" : "Русский"
};

const _hoisted_1$3 = { class: "scbd-common km-view-links" };
const _hoisted_2$1 = {
  key: 0,
  class: "table table-striped"
};
const _hoisted_3$1 = { class: "align-middle" };
const _hoisted_4$1 = { class: "align-middle" };
const _hoisted_5$1 = ["href"];
const _hoisted_6$1 = { class: "align-middle" };
const _hoisted_7$1 = { key: 0 };
const _hoisted_8$1 = { class: "text-nowrap text-right align-middle" };
const _hoisted_9$1 = ["onClick"];
const _hoisted_10$1 = /*#__PURE__*/createElementVNode("i", { class: "bi bi-pencil-square" }, null, -1 /* HOISTED */);
const _hoisted_11$1 = [
  _hoisted_10$1
];
const _hoisted_12$1 = ["onClick"];
const _hoisted_13$1 = /*#__PURE__*/createElementVNode("i", { class: "bi bi-trash3" }, null, -1 /* HOISTED */);
const _hoisted_14$1 = [
  _hoisted_13$1
];

  
var script$3 = {
  __name: 'km-view-links',
  props: {
    "modelValue": {type:Array, required:true},
    "modelModifiers": {},
  },
  emits: /*#__PURE__*/mergeModels(['onDelete','onEdit'], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {

  const model = useModel(__props, "modelValue");
  const emit = __emit;
   
    let links = computed(()=>{
        if(model.value)
            return  model.value;
        return [];
    });   
 
    const remove = (index) =>{    
        emit("onDelete", index);        
    };

    const edit = (index) =>{    
        emit("onEdit", index);        
    };

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$3, [
    (unref(links)?.length)
      ? (openBlock(), createElementBlock("table", _hoisted_2$1, [
          createElementVNode("tbody", null, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(links), (item, index) => {
              return (openBlock(), createElementBlock("tr", { key: index }, [
                createElementVNode("td", _hoisted_3$1, [
                  createElementVNode("span", null, toDisplayString(unref(languages)[item.language]), 1 /* TEXT */)
                ]),
                createElementVNode("td", _hoisted_4$1, [
                  createElementVNode("a", {
                    href: item.url
                  }, toDisplayString(item.name), 9 /* TEXT, PROPS */, _hoisted_5$1)
                ]),
                createElementVNode("td", _hoisted_6$1, [
                  (item.tag)
                    ? (openBlock(), createElementBlock("span", _hoisted_7$1, " (" + toDisplayString(item.tag) + ") ", 1 /* TEXT */))
                    : createCommentVNode("v-if", true)
                ]),
                createElementVNode("td", _hoisted_8$1, [
                  createElementVNode("button", {
                    class: "btn btn-outline-secondary",
                    onClick: $event => (edit(index))
                  }, [..._hoisted_11$1], 8 /* PROPS */, _hoisted_9$1),
                  createElementVNode("button", {
                    class: "btn btn-outline-secondary",
                    onClick: $event => (remove(index))
                  }, [..._hoisted_14$1], 8 /* PROPS */, _hoisted_12$1)
                ])
              ]))
            }), 128 /* KEYED_FRAGMENT */))
          ])
        ]))
      : createCommentVNode("v-if", true)
  ]))
}
}

};

script$3.__file = "src/components/controls/link/km-view-links.vue";

const _hoisted_1$2 = {
  key: 0,
  id: "linkEditorModal",
  class: "scbd-common file-upload-editor modal fade show overflow-auto d-block scbd-controls link-editor",
  tabindex: "-1",
  role: "dialog",
  "aria-labelledby": "fileUploadEditor"
};
const _hoisted_2 = {
  class: "modal-dialog",
  role: "document"
};
const _hoisted_3 = { class: "modal-content" };
const _hoisted_4 = { class: "modal-header" };
const _hoisted_5 = { class: "modal-title" };
const _hoisted_6 = /*#__PURE__*/createElementVNode("span", { "aria-hidden": "true" }, "×", -1 /* HOISTED */);
const _hoisted_7 = [
  _hoisted_6
];
const _hoisted_8 = { class: "modal-body" };
const _hoisted_9 = { key: 0 };
const _hoisted_10 = {
  key: 0,
  class: "alert alert-danger",
  role: "alert"
};
const _hoisted_11 = /*#__PURE__*/createElementVNode("h4", null, "An error has occured", -1 /* HOISTED */);
const _hoisted_12 = [
  _hoisted_11
];
const _hoisted_13 = /*#__PURE__*/createElementVNode("div", {
  class: "progress",
  role: "progressbar",
  "aria-valuenow": "100",
  "aria-valuemin": "0",
  "aria-valuemax": "100"
}, [
  /*#__PURE__*/createElementVNode("div", {
    class: "progress-bar",
    style: {"width":"100%"}
  }, "100%")
], -1 /* HOISTED */);
const _hoisted_14 = { class: "mb-3" };
const _hoisted_15 = /*#__PURE__*/createElementVNode("label", {
  for: "name",
  class: "col-form-label"
}, "File name", -1 /* HOISTED */);
const _hoisted_16 = { class: "mb-3" };
const _hoisted_17 = /*#__PURE__*/createElementVNode("label", {
  for: "language",
  class: "col-form-label"
}, [
  /*#__PURE__*/createTextVNode("Language "),
  /*#__PURE__*/createElementVNode("span", { class: "text-danger" }, " *")
], -1 /* HOISTED */);
const _hoisted_18 = ["value"];
const _hoisted_19 = { class: "mb-3" };
const _hoisted_20 = /*#__PURE__*/createElementVNode("label", {
  for: "tag",
  class: "col-form-label"
}, "Tags", -1 /* HOISTED */);
    
    //TODO: use km-form-control when its available   
    //TODO: upload file, uploading process bar, error msg , showing file.size 
    
    
var script$2 = {
  __name: 'file-upload-editor',
  emits: ['onClose'],
  setup(__props, { expose: __expose, emit: __emit }) {

    const modalOpen = ref(false) ;
    const isAddingNewFile = ref(false);
    const isUploadingError= ref(false);
    const link = ref({});  
    const newFile = ref({});   
  
    const emit = __emit;
    
    const show= (linkToEdit,isNew, file)=>{ 
        modalOpen.value = true;    
        const  { url, name, language ,tag} = linkToEdit;  
        link.value = { url, name, language, tag };    
        isAddingNewFile.value = isNew;  
        newFile.value = file;  
    };
    const close = () => {      
      modalOpen.value = false;  
      emit("onClose");  
    };  
    const save = () =>{         
        const newLink = { "url": link.value.url , "name": link.value.name , "language": link.value.language ,"tag": link.value.tag };      
        modalOpen.value = false;               
        emit("onClose", newLink);  
    };
  
    __expose({
        show
    });
  
return (_ctx, _cache) => {
  return (modalOpen.value)
    ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
        createElementVNode("div", _hoisted_2, [
          createElementVNode("div", _hoisted_3, [
            createElementVNode("div", _hoisted_4, [
              createElementVNode("h3", _hoisted_5, [
                renderSlot(_ctx.$slots, "modalTitle", {}, () => [
                  createTextVNode("Uploading File")
                ])
              ]),
              createElementVNode("button", {
                type: "button",
                class: "close",
                "data-dismiss": "modal",
                "aria-label": "Close",
                onClick: close
              }, [..._hoisted_7])
            ]),
            createElementVNode("div", _hoisted_8, [
              (isAddingNewFile.value)
                ? (openBlock(), createElementBlock("div", _hoisted_9, [
                    (isUploadingError.value)
                      ? (openBlock(), createElementBlock("div", _hoisted_10, [..._hoisted_12]))
                      : createCommentVNode("v-if", true),
                    createElementVNode("div", null, [
                      createElementVNode("label", null, [
                        createTextVNode("Uploading "),
                        createElementVNode("span", null, toDisplayString(link.value.name), 1 /* TEXT */)
                      ]),
                      _hoisted_13
                    ])
                  ]))
                : createCommentVNode("v-if", true),
              createElementVNode("form", null, [
                createElementVNode("div", _hoisted_14, [
                  _hoisted_15,
                  withDirectives(createElementVNode("input", {
                    class: "form-control",
                    id: "name",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((link.value.name) = $event)),
                    type: "text",
                    placeholder: "example:SCBD website"
                  }, null, 512 /* NEED_PATCH */), [
                    [vModelText, link.value.name]
                  ])
                ]),
                createElementVNode("div", _hoisted_16, [
                  _hoisted_17,
                  withDirectives(createElementVNode("select", {
                    class: "form-select",
                    name: "language",
                    id: "language",
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((link.value.language) = $event))
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(languages), (language, key) => {
                      return (openBlock(), createElementBlock("option", {
                        value: key,
                        key: key
                      }, toDisplayString(language), 9 /* TEXT, PROPS */, _hoisted_18))
                    }), 128 /* KEYED_FRAGMENT */))
                  ], 512 /* NEED_PATCH */), [
                    [vModelSelect, link.value.language]
                  ])
                ]),
                createElementVNode("div", _hoisted_19, [
                  _hoisted_20,
                  withDirectives(createElementVNode("input", {
                    class: "form-control",
                    id: "tag",
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((link.value.tag) = $event)),
                    type: "text",
                    placeholder: "example: Biodiversity, Aichi target"
                  }, null, 512 /* NEED_PATCH */), [
                    [vModelText, link.value.tag]
                  ])
                ])
              ])
            ]),
            createElementVNode("div", { class: "modal-footer" }, [
              createElementVNode("button", {
                type: "button",
                class: "btn btn-secondary",
                onClick: close
              }, "Cancel"),
              createElementVNode("button", {
                type: "button",
                class: "btn btn-primary",
                onClick: save
              }, "Save")
            ])
          ])
        ])
      ]))
    : createCommentVNode("v-if", true)
}
}

};

script$2.__file = "src/components/controls/link/file-upload-editor.vue";

const _hoisted_1$1 = ["id"];


var script$1 = {
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
  return (openBlock(), createElementBlock("button", {
    class: "scbd-common select-file-button btn btn-primary",
    type: "button",
    id: _ctx.$attrs.id,
    onClick: _cache[0] || (_cache[0] = withModifiers($event => (selectFile()), ["prevent","stop"]))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 8 /* PROPS */, _hoisted_1$1))
}
}

};

script$1.__file = "src/components/inputs/select-file-button.vue";

const _hoisted_1 = { class: "scbd-common km-add-file" };
  

    
var script = {
  __name: 'km-add-file',
  props: /*#__PURE__*/mergeModels({multiple: { type: Boolean, require: false, default: false }}, {
    "modelValue": {type:Array, required:true, default:[]},
    "modelModifiers": {},
  }),
  emits: ["update:modelValue"],
  setup(__props) {

    const links = useModel(__props, "modelValue");

    const fileEditorRef= shallowRef (null); 
    let editedLinkIndex = -1;
    
    function addLink(file) {        
        editedLinkIndex = -1; 
        fileEditorRef.value.show({url:"",name:file.name, language:"en", tag:""}, true,file); 
    }      
    function editLink(index) {         
        editedLinkIndex = index;  
        fileEditorRef.value.show(links.value[index] ||{}, false, {});     
    }
    function removeLink(index) {  
        links.value.splice(index, 1);   
    }
    function onFileUploadEditorClose(newValue) {         
     
        if(!newValue) {// mean cacnel => return  
            return;
        } 
        else {   
            if(editedLinkIndex<0) { 
                links.value.push(newValue);
            } 
            else {        
                links.value[editedLinkIndex]=newValue;
            } 
            editedLinkIndex = -1;
        }       
    }

 
    const receiveFile = (selectedFile) => {  
         addLink(selectedFile);            
    };



return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(script$1, { onOnFileSelected: receiveFile }, {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "file-button-label", {}, () => [
          createTextVNode("+ Add Files")
        ])
      ]),
      _: 3 /* FORWARDED */
    }),
    createVNode(script$2, {
      ref_key: "fileEditorRef",
      ref: fileEditorRef,
      onOnClose: onFileUploadEditorClose
    }, {
      modalTitle: withCtx(() => [
        renderSlot(_ctx.$slots, "link-dialog-title", {}, () => [
          createTextVNode(" File Upload ")
        ])
      ]),
      _: 3 /* FORWARDED */
    }, 512 /* NEED_PATCH */),
    renderSlot(_ctx.$slots, "links-view", {}, () => [
      createVNode(script$3, {
        modelValue: links.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((links).value = $event)),
        onOnDelete: removeLink,
        onOnEdit: editLink
      }, null, 8 /* PROPS */, ["modelValue"])
    ])
  ]))
}
}

};

script.__file = "src/components/controls/link/km-add-file.vue";

export { script as default };
//# sourceMappingURL=km-add-file.js.map
