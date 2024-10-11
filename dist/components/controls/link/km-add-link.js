import { mergeModels, useModel, computed, openBlock, createElementBlock, unref, createElementVNode, Fragment, renderList, toDisplayString, createCommentVNode, ref, renderSlot, createTextVNode, withDirectives, vModelText, vModelSelect, shallowRef, createVNode, withCtx } from 'vue';

const languages = {
    "ar" : "العربية",
    "zh" : "中文",
    "en" : "English",
    "es" : "Español",
    "fr" : "Français",
    "ru" : "Русский"
};

const _hoisted_1$1 = { class: "scbd-common km-view-links" };
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

  
var script$2 = {
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
  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
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

script$2.__file = "src/components/controls/link/km-view-links.vue";

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
    
    
var script$1 = {
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

script$1.__file = "src/components/controls/link/link-editor.vue";

var script = {
  __name: 'km-add-link',
  props: {
    "modelValue": {type:Array, required:true, default:[]},
    "modelModifiers": {},
  },
  emits: ["update:modelValue"],
  setup(__props) {

  const linkEditorRef= shallowRef(null); 
  let editedLinkIndex = -1;   
  const links = useModel(__props, "modelValue");

    function addLink() {  
        editLink(-1);
    }      

    function editLink(index) {  
        editedLinkIndex = index;  
        linkEditorRef.value.show(links.value[index] ||{});     
    }

    function removeLink(index) {  
        links.value.splice(index, 1);   
    }

    function onLinkEditorClose(newValue) {    
        if(Object.keys(newValue).length ==0) {// mean cacnel => return              
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
    

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createElementVNode("button", {
      type: "button",
      class: "btn btn-primary",
      onClick: _cache[0] || (_cache[0] = $event => (addLink()))
    }, [
      renderSlot(_ctx.$slots, "link-button-label", {}, () => [
        createTextVNode("+ Add Link")
      ])
    ]),
    createVNode(script$1, {
      ref_key: "linkEditorRef",
      ref: linkEditorRef,
      onOnClose: onLinkEditorClose
    }, {
      modalTitle: withCtx(() => [
        renderSlot(_ctx.$slots, "link-dialog-title", {}, () => [
          createTextVNode(" Edit link ")
        ])
      ]),
      _: 3 /* FORWARDED */
    }, 512 /* NEED_PATCH */),
    renderSlot(_ctx.$slots, "links-view", {}, () => [
      createVNode(script$2, {
        modelValue: links.value,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((links).value = $event)),
        onOnDelete: _cache[2] || (_cache[2] = $event => (removeLink($event))),
        onOnEdit: _cache[3] || (_cache[3] = $event => (editLink($event)))
      }, null, 8 /* PROPS */, ["modelValue"])
    ])
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script.__file = "src/components/controls/link/km-add-link.vue";

export { script as default };
//# sourceMappingURL=km-add-link.js.map
