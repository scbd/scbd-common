import { ref, computed, openBlock, createElementBlock, createElementVNode, renderSlot, createTextVNode, withDirectives, vModelText, createCommentVNode, Fragment, renderList, unref, toDisplayString, vModelSelect } from 'vue';

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
  class: "modal fade show overflow-auto d-block scbd-controls link-editor",
  tabindex: "-1",
  role: "dialog",
  "aria-labelledby": "linkEditor"
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
const _hoisted_9 = /*#__PURE__*/createElementVNode("div", { class: "alert alert-info" }, [
  /*#__PURE__*/createTextVNode("Please provide the URL of the website (e.g. "),
  /*#__PURE__*/createElementVNode("a", {
    rel: "noopener",
    "translation-url": "",
    target: "_blank",
    href: "http://www.cbd.int"
  }, "https://www.cbd.int"),
  /*#__PURE__*/createTextVNode(" )and the name of the website (e.g. \"The Convention on Biological Diversity\"). ")
], -1 /* HOISTED */);
const _hoisted_10 = { class: "mb-3" };
const _hoisted_11 = /*#__PURE__*/createElementVNode("label", {
  class: "col-form-label",
  for: "url"
}, [
  /*#__PURE__*/createTextVNode("Url "),
  /*#__PURE__*/createElementVNode("span", { class: "text-danger" }, " *")
], -1 /* HOISTED */);
const _hoisted_12 = /*#__PURE__*/createElementVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_13 = /*#__PURE__*/createElementVNode("small", { class: "help-block" }, "Protocol is required (https:// or http://)", -1 /* HOISTED */);
const _hoisted_14 = { key: 0 };
const _hoisted_15 = /*#__PURE__*/createElementVNode("span", { class: "text-danger" }, " Please provide valid URL", -1 /* HOISTED */);
const _hoisted_16 = [
  _hoisted_15
];
const _hoisted_17 = { class: "mb-3" };
const _hoisted_18 = /*#__PURE__*/createElementVNode("label", {
  for: "name",
  class: "col-form-label"
}, "Name", -1 /* HOISTED */);
const _hoisted_19 = { class: "mb-3" };
const _hoisted_20 = /*#__PURE__*/createElementVNode("label", {
  for: "language",
  class: "col-form-label"
}, [
  /*#__PURE__*/createTextVNode("Language "),
  /*#__PURE__*/createElementVNode("span", { class: "text-danger" }, " *")
], -1 /* HOISTED */);
const _hoisted_21 = ["value"];
const _hoisted_22 = { key: 0 };
const _hoisted_23 = /*#__PURE__*/createElementVNode("span", { class: "text-danger" }, " Please select Language ", -1 /* HOISTED */);
const _hoisted_24 = [
  _hoisted_23
];
    
    //TODO: use km-form-control when its available    
    
    
var script = {
  __name: 'link-editor',
  emits: ['onClose'],
  setup(__props, { expose: __expose, emit: __emit }) {

    const modalOpen = ref(false) ;
    const link = ref({});     
  
    const emit = __emit;
    const isUrlValid  = computed(()=>{ return isValidHttpUrl(link.value.url)});
    const isLangValid = computed(()=>!!link.value?.language?.trim() && Object.keys(languages).includes(link.value.language));  
    const checkValidation = ref(false);
 
    const show= (linkToEdit)=>{  
        checkValidation.value=false; 
        modalOpen.value = true;    
        const  { url, name, language } = linkToEdit;  
        link.value = { url, name, language }; 
    };
    const close = () => {      
      modalOpen.value = false;  
      checkValidation.value=false; 
      emit("onClose");  
    };  
    const save = () =>{  
      checkValidation.value=true; 
      if (isUrlValid.value && isLangValid.value){   
        const newLink = { "url": link.value.url , "name": link.value.name , "language": link.value.language  };
        modalOpen.value = false;        
        emit("onClose", newLink);      
      }
    };
    
    const isValidHttpUrl =(string)=> {
        try {
            const newUrl = new URL(string);
            return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
        }
        catch(e){}        
        return false;
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
                  createTextVNode("Editing link")
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
              _hoisted_9,
              createElementVNode("form", null, [
                createElementVNode("div", _hoisted_10, [
                  _hoisted_11,
                  _hoisted_12,
                  _hoisted_13,
                  withDirectives(createElementVNode("input", {
                    class: "form-control",
                    id: "url",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((link.value.url) = $event)),
                    type: "url",
                    placeholder: " https://www."
                  }, null, 512 /* NEED_PATCH */), [
                    [vModelText, link.value.url]
                  ]),
                  ( checkValidation.value &&  !isUrlValid.value)
                    ? (openBlock(), createElementBlock("p", _hoisted_14, [..._hoisted_16]))
                    : createCommentVNode("v-if", true)
                ]),
                createElementVNode("div", _hoisted_17, [
                  _hoisted_18,
                  withDirectives(createElementVNode("input", {
                    class: "form-control",
                    id: "name",
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((link.value.name) = $event)),
                    type: "text",
                    placeholder: "example:SCBD website"
                  }, null, 512 /* NEED_PATCH */), [
                    [vModelText, link.value.name]
                  ])
                ]),
                createElementVNode("div", _hoisted_19, [
                  _hoisted_20,
                  withDirectives(createElementVNode("select", {
                    class: "form-select",
                    name: "language",
                    id: "language",
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((link.value.language) = $event))
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(languages), (language, key) => {
                      return (openBlock(), createElementBlock("option", {
                        value: key,
                        key: key
                      }, toDisplayString(language), 9 /* TEXT, PROPS */, _hoisted_21))
                    }), 128 /* KEYED_FRAGMENT */))
                  ], 512 /* NEED_PATCH */), [
                    [vModelSelect, link.value.language]
                  ]),
                  (checkValidation.value && !isLangValid.value)
                    ? (openBlock(), createElementBlock("p", _hoisted_22, [..._hoisted_24]))
                    : createCommentVNode("v-if", true)
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

script.__file = "src/components/controls/link/link-editor.vue";

export { script as default };
//# sourceMappingURL=link-editor.js.map
