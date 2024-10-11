import { ref, openBlock, createElementBlock, createElementVNode, renderSlot, createTextVNode, createCommentVNode, toDisplayString, withDirectives, vModelText, Fragment, renderList, unref, vModelSelect } from 'vue';

const languages = {
    "ar" : "العربية",
    "zh" : "中文",
    "en" : "English",
    "es" : "Español",
    "fr" : "Français",
    "ru" : "Русский"
};

const _hoisted_1 = {
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
    
    
var script = {
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
    ? (openBlock(), createElementBlock("div", _hoisted_1, [
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

script.__file = "src/components/controls/link/file-upload-editor.vue";

export { script as default };
//# sourceMappingURL=file-upload-editor.js.map
