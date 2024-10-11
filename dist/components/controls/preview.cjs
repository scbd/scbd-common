'use strict';

var Vue = require('vue');
var _ = require('lodash');
require('webui-popover');
require('webui-popover/dist/jquery.webui-popover.css');
var $ = require('jquery');
require('@/services/composables/i18n');
require('@/services/filters/lstring');
var VueMultiselect = require('vue-multiselect');
require('@ckeditor/ckeditor5-vue/dist/ckeditor.js');
var CKEditor = require('@ckeditor/ckeditor5-vue');
var ClassicEditor = require('@scbd/ckeditor5-build-inline-full/build/ckeditor.js');
require('@scbd/ckeditor5-build-inline-full/build/ckeditor.css');
var axios = require('axios');
var thesaurus = require('@/services/composables/thesaurus');
var index = require('@/services/util/index');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var Vue__namespace = /*#__PURE__*/_interopNamespace(Vue);
var ___default = /*#__PURE__*/_interopDefaultLegacy(_);
var $__default = /*#__PURE__*/_interopDefaultLegacy($);
var VueMultiselect__default = /*#__PURE__*/_interopDefaultLegacy(VueMultiselect);
var CKEditor__default = /*#__PURE__*/_interopDefaultLegacy(CKEditor);
var ClassicEditor__default = /*#__PURE__*/_interopDefaultLegacy(ClassicEditor);
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

const _hoisted_1$n = { class: "scbd-controls km-input-lstring" };
const _hoisted_2$h = ["placeholder", "onUpdate:modelValue", "dir"];
const _hoisted_3$d = ["rows", "placeholder", "onUpdate:modelValue", "dir"];
const _hoisted_4$c = { class: "input-group-append" };
const _hoisted_5$b = ["title"];

    
var script$o = {
  __name: 'km-input-lstring',
  props: /*#__PURE__*/Vue.mergeModels({
      locales:  { type: Array, required: true },
      disabled: { type: Boolean, default: false },
      rows:     { type: Number, required: false, default: 1 },
      placeholder: {type: String, required: false }
    }, {
    "modelValue": {type:Object, required: true, default:{}},
    "modelModifiers": {},
  }),
  emits: ["update:modelValue"],
  setup(__props) {

    const model = Vue.useModel(__props, "modelValue");
    const props = __props;

    const loadLanguages = () => {
      props.locales?.forEach((e) => {
        //TODO: call thesaurus service API
      });
    };

    const getTerm = (term) => {
      //TODO: call thesaurus service API
      return { title: term };
    };

    Vue.watch(()=>props.locales,
      (newVal, oldVal) => {
        const deleted = _.without(Object.keys(model.value), ...newVal);
        if (deleted?.length) {
          deleted.forEach((e) => {
            model.value[e] = undefined;
          });
        }
        loadLanguages();
      }, {deep:true}
    );

    Vue.onMounted(() => {
      loadLanguages();
    });

return (_ctx, _cache) => {
  return (Vue.openBlock(), Vue.createElementBlock("div", _hoisted_1$n, [
    Vue.renderSlot(_ctx.$slots, "default"),
    (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(__props.locales, (locale) => {
      return (Vue.openBlock(), Vue.createElementBlock("div", {
        class: Vue.normalizeClass(["input-group mb-1", `km-input-lstring-${locale}`]),
        key: locale
      }, [
        (__props.rows==1)
          ? Vue.withDirectives((Vue.openBlock(), Vue.createElementBlock("input", {
              key: 0,
              type: "text",
              class: "form-control",
              placeholder: __props.placeholder,
              "aria-describedby": "lstring-text",
              "onUpdate:modelValue": $event => ((model.value[locale]) = $event),
              dir: locale == 'ar' ? 'rtl' : 'ltr',
              onInput: _cache[0] || (_cache[0] = $event => (_ctx.$emit('update:modelValue', model.value)))
            }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_2$h)), [
              [Vue.vModelText, model.value[locale]]
            ])
          : Vue.createCommentVNode("v-if", true),
        (__props.rows>1)
          ? Vue.withDirectives((Vue.openBlock(), Vue.createElementBlock("textarea", {
              key: 1,
              rows: __props.rows,
              class: "form-control",
              placeholder: __props.placeholder,
              "aria-describedby": "lstring-textarea",
              "onUpdate:modelValue": $event => ((model.value[locale]) = $event),
              dir: locale == 'ar' ? 'rtl' : 'ltr',
              onInput: _cache[1] || (_cache[1] = $event => (_ctx.$emit('update:modelValue', model.value)))
            }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_3$d)), [
              [Vue.vModelText, model.value[locale]]
            ])
          : Vue.createCommentVNode("v-if", true),
        Vue.createElementVNode("div", _hoisted_4$c, [
          Vue.createElementVNode("button", {
            class: "btn btn-outline-primary",
            type: "button",
            id: "basic-addon2",
            "data-bs-toggle": 'tooltip',
            "data-bs-placement": 'top',
            title: getTerm(locale).title
          }, Vue.toDisplayString(locale.toUpperCase()), 9 /* TEXT, PROPS */, _hoisted_5$b)
        ])
      ], 2 /* CLASS */))
    }), 128 /* KEYED_FRAGMENT */))
  ]))
}
}

};

script$o.__file = "src/components/controls/km-input-lstring.vue";

const languages = {
    "ar" : "العربية",
    "zh" : "中文",
    "en" : "English",
    "es" : "Español",
    "fr" : "Français",
    "ru" : "Русский"
};

const _hoisted_1$m = { class: "scbd-common km-view-links" };
const _hoisted_2$g = {
  key: 0,
  class: "table table-striped"
};
const _hoisted_3$c = { class: "align-middle" };
const _hoisted_4$b = { class: "align-middle" };
const _hoisted_5$a = ["href"];
const _hoisted_6$8 = { class: "align-middle" };
const _hoisted_7$5 = { key: 0 };
const _hoisted_8$5 = { class: "text-nowrap text-right align-middle" };
const _hoisted_9$5 = ["onClick"];
const _hoisted_10$4 = /*#__PURE__*/Vue.createElementVNode("i", { class: "bi bi-pencil-square" }, null, -1 /* HOISTED */);
const _hoisted_11$4 = [
  _hoisted_10$4
];
const _hoisted_12$4 = ["onClick"];
const _hoisted_13$4 = /*#__PURE__*/Vue.createElementVNode("i", { class: "bi bi-trash3" }, null, -1 /* HOISTED */);
const _hoisted_14$4 = [
  _hoisted_13$4
];

  
var script$n = {
  __name: 'km-view-links',
  props: {
    "modelValue": {type:Array, required:true},
    "modelModifiers": {},
  },
  emits: /*#__PURE__*/Vue.mergeModels(['onDelete','onEdit'], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {

  const model = Vue.useModel(__props, "modelValue");
  const emit = __emit;
   
    let links = Vue.computed(()=>{
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
  return (Vue.openBlock(), Vue.createElementBlock("div", _hoisted_1$m, [
    (Vue.unref(links)?.length)
      ? (Vue.openBlock(), Vue.createElementBlock("table", _hoisted_2$g, [
          Vue.createElementVNode("tbody", null, [
            (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(Vue.unref(links), (item, index) => {
              return (Vue.openBlock(), Vue.createElementBlock("tr", { key: index }, [
                Vue.createElementVNode("td", _hoisted_3$c, [
                  Vue.createElementVNode("span", null, Vue.toDisplayString(Vue.unref(languages)[item.language]), 1 /* TEXT */)
                ]),
                Vue.createElementVNode("td", _hoisted_4$b, [
                  Vue.createElementVNode("a", {
                    href: item.url
                  }, Vue.toDisplayString(item.name), 9 /* TEXT, PROPS */, _hoisted_5$a)
                ]),
                Vue.createElementVNode("td", _hoisted_6$8, [
                  (item.tag)
                    ? (Vue.openBlock(), Vue.createElementBlock("span", _hoisted_7$5, " (" + Vue.toDisplayString(item.tag) + ") ", 1 /* TEXT */))
                    : Vue.createCommentVNode("v-if", true)
                ]),
                Vue.createElementVNode("td", _hoisted_8$5, [
                  Vue.createElementVNode("button", {
                    class: "btn btn-outline-secondary",
                    onClick: $event => (edit(index))
                  }, [..._hoisted_11$4], 8 /* PROPS */, _hoisted_9$5),
                  Vue.createElementVNode("button", {
                    class: "btn btn-outline-secondary",
                    onClick: $event => (remove(index))
                  }, [..._hoisted_14$4], 8 /* PROPS */, _hoisted_12$4)
                ])
              ]))
            }), 128 /* KEYED_FRAGMENT */))
          ])
        ]))
      : Vue.createCommentVNode("v-if", true)
  ]))
}
}

};

script$n.__file = "src/components/controls/link/km-view-links.vue";

const _hoisted_1$l = {
  key: 0,
  id: "linkEditorModal",
  class: "modal fade show overflow-auto d-block scbd-controls link-editor",
  tabindex: "-1",
  role: "dialog",
  "aria-labelledby": "linkEditor"
};
const _hoisted_2$f = {
  class: "modal-dialog",
  role: "document"
};
const _hoisted_3$b = { class: "modal-content" };
const _hoisted_4$a = { class: "modal-header" };
const _hoisted_5$9 = { class: "modal-title" };
const _hoisted_6$7 = /*#__PURE__*/Vue.createElementVNode("span", { "aria-hidden": "true" }, "×", -1 /* HOISTED */);
const _hoisted_7$4 = [
  _hoisted_6$7
];
const _hoisted_8$4 = { class: "modal-body" };
const _hoisted_9$4 = /*#__PURE__*/Vue.createElementVNode("div", { class: "alert alert-info" }, [
  /*#__PURE__*/Vue.createTextVNode("Please provide the URL of the website (e.g. "),
  /*#__PURE__*/Vue.createElementVNode("a", {
    rel: "noopener",
    "translation-url": "",
    target: "_blank",
    href: "http://www.cbd.int"
  }, "https://www.cbd.int"),
  /*#__PURE__*/Vue.createTextVNode(" )and the name of the website (e.g. \"The Convention on Biological Diversity\"). ")
], -1 /* HOISTED */);
const _hoisted_10$3 = { class: "mb-3" };
const _hoisted_11$3 = /*#__PURE__*/Vue.createElementVNode("label", {
  class: "col-form-label",
  for: "url"
}, [
  /*#__PURE__*/Vue.createTextVNode("Url "),
  /*#__PURE__*/Vue.createElementVNode("span", { class: "text-danger" }, " *")
], -1 /* HOISTED */);
const _hoisted_12$3 = /*#__PURE__*/Vue.createElementVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_13$3 = /*#__PURE__*/Vue.createElementVNode("small", { class: "help-block" }, "Protocol is required (https:// or http://)", -1 /* HOISTED */);
const _hoisted_14$3 = { key: 0 };
const _hoisted_15$2 = /*#__PURE__*/Vue.createElementVNode("span", { class: "text-danger" }, " Please provide valid URL", -1 /* HOISTED */);
const _hoisted_16$2 = [
  _hoisted_15$2
];
const _hoisted_17$2 = { class: "mb-3" };
const _hoisted_18$2 = /*#__PURE__*/Vue.createElementVNode("label", {
  for: "name",
  class: "col-form-label"
}, "Name", -1 /* HOISTED */);
const _hoisted_19$2 = { class: "mb-3" };
const _hoisted_20$2 = /*#__PURE__*/Vue.createElementVNode("label", {
  for: "language",
  class: "col-form-label"
}, [
  /*#__PURE__*/Vue.createTextVNode("Language "),
  /*#__PURE__*/Vue.createElementVNode("span", { class: "text-danger" }, " *")
], -1 /* HOISTED */);
const _hoisted_21$1 = ["value"];
const _hoisted_22$1 = { key: 0 };
const _hoisted_23$1 = /*#__PURE__*/Vue.createElementVNode("span", { class: "text-danger" }, " Please select Language ", -1 /* HOISTED */);
const _hoisted_24$1 = [
  _hoisted_23$1
];
    
    //TODO: use km-form-control when its available    
    
    
var script$m = {
  __name: 'link-editor',
  emits: ['onClose'],
  setup(__props, { expose: __expose, emit: __emit }) {

    const modalOpen = Vue.ref(false) ;
    const link = Vue.ref({});     
  
    const emit = __emit;
    const isUrlValid  = Vue.computed(()=>{ return isValidHttpUrl(link.value.url)});
    const isLangValid = Vue.computed(()=>!!link.value?.language?.trim() && Object.keys(languages).includes(link.value.language));  
    const checkValidation = Vue.ref(false);
 
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
    ? (Vue.openBlock(), Vue.createElementBlock("div", _hoisted_1$l, [
        Vue.createElementVNode("div", _hoisted_2$f, [
          Vue.createElementVNode("div", _hoisted_3$b, [
            Vue.createElementVNode("div", _hoisted_4$a, [
              Vue.createElementVNode("h3", _hoisted_5$9, [
                Vue.renderSlot(_ctx.$slots, "modalTitle", {}, () => [
                  Vue.createTextVNode("Editing link")
                ])
              ]),
              Vue.createElementVNode("button", {
                type: "button",
                class: "close",
                "data-dismiss": "modal",
                "aria-label": "Close",
                onClick: close
              }, [..._hoisted_7$4])
            ]),
            Vue.createElementVNode("div", _hoisted_8$4, [
              _hoisted_9$4,
              Vue.createElementVNode("form", null, [
                Vue.createElementVNode("div", _hoisted_10$3, [
                  _hoisted_11$3,
                  _hoisted_12$3,
                  _hoisted_13$3,
                  Vue.withDirectives(Vue.createElementVNode("input", {
                    class: "form-control",
                    id: "url",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((link.value.url) = $event)),
                    type: "url",
                    placeholder: " https://www."
                  }, null, 512 /* NEED_PATCH */), [
                    [Vue.vModelText, link.value.url]
                  ]),
                  ( checkValidation.value &&  !isUrlValid.value)
                    ? (Vue.openBlock(), Vue.createElementBlock("p", _hoisted_14$3, [..._hoisted_16$2]))
                    : Vue.createCommentVNode("v-if", true)
                ]),
                Vue.createElementVNode("div", _hoisted_17$2, [
                  _hoisted_18$2,
                  Vue.withDirectives(Vue.createElementVNode("input", {
                    class: "form-control",
                    id: "name",
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((link.value.name) = $event)),
                    type: "text",
                    placeholder: "example:SCBD website"
                  }, null, 512 /* NEED_PATCH */), [
                    [Vue.vModelText, link.value.name]
                  ])
                ]),
                Vue.createElementVNode("div", _hoisted_19$2, [
                  _hoisted_20$2,
                  Vue.withDirectives(Vue.createElementVNode("select", {
                    class: "form-select",
                    name: "language",
                    id: "language",
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((link.value.language) = $event))
                  }, [
                    (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(Vue.unref(languages), (language, key) => {
                      return (Vue.openBlock(), Vue.createElementBlock("option", {
                        value: key,
                        key: key
                      }, Vue.toDisplayString(language), 9 /* TEXT, PROPS */, _hoisted_21$1))
                    }), 128 /* KEYED_FRAGMENT */))
                  ], 512 /* NEED_PATCH */), [
                    [Vue.vModelSelect, link.value.language]
                  ]),
                  (checkValidation.value && !isLangValid.value)
                    ? (Vue.openBlock(), Vue.createElementBlock("p", _hoisted_22$1, [..._hoisted_24$1]))
                    : Vue.createCommentVNode("v-if", true)
                ])
              ])
            ]),
            Vue.createElementVNode("div", { class: "modal-footer" }, [
              Vue.createElementVNode("button", {
                type: "button",
                class: "btn btn-secondary",
                onClick: close
              }, "Cancel"),
              Vue.createElementVNode("button", {
                type: "button",
                class: "btn btn-primary",
                onClick: save
              }, "Save")
            ])
          ])
        ])
      ]))
    : Vue.createCommentVNode("v-if", true)
}
}

};

script$m.__file = "src/components/controls/link/link-editor.vue";

var script$l = {
  __name: 'km-add-link',
  props: {
    "modelValue": {type:Array, required:true, default:[]},
    "modelModifiers": {},
  },
  emits: ["update:modelValue"],
  setup(__props) {

  const linkEditorRef= Vue.shallowRef(null); 
  let editedLinkIndex = -1;   
  const links = Vue.useModel(__props, "modelValue");

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
  return (Vue.openBlock(), Vue.createElementBlock(Vue.Fragment, null, [
    Vue.createElementVNode("button", {
      type: "button",
      class: "btn btn-primary",
      onClick: _cache[0] || (_cache[0] = $event => (addLink()))
    }, [
      Vue.renderSlot(_ctx.$slots, "link-button-label", {}, () => [
        Vue.createTextVNode("+ Add Link")
      ])
    ]),
    Vue.createVNode(script$m, {
      ref_key: "linkEditorRef",
      ref: linkEditorRef,
      onOnClose: onLinkEditorClose
    }, {
      modalTitle: Vue.withCtx(() => [
        Vue.renderSlot(_ctx.$slots, "link-dialog-title", {}, () => [
          Vue.createTextVNode(" Edit link ")
        ])
      ]),
      _: 3 /* FORWARDED */
    }, 512 /* NEED_PATCH */),
    Vue.renderSlot(_ctx.$slots, "links-view", {}, () => [
      Vue.createVNode(script$n, {
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

script$l.__file = "src/components/controls/link/km-add-link.vue";

const _hoisted_1$k = {
  key: 0,
  class: "bi bi-question-circle-fill"
};
const _hoisted_2$e = { class: "webui-popover-content" };
const _hoisted_3$a = ["innerHTML"];


var script$k = {
  __name: 'km-help',
  props: {
    title: {type:String},
    content: {type:String, required: true}
},
  setup(__props) {

const helpAnchor = Vue.ref(null);
const props = __props;
const slots  = Vue.useSlots();

Vue.onMounted(()=>{    
    const settings = {
        trigger: 'hover',
        title: props.title || "Help",
        closeable: true,
        dismissible: true,
        padding: true,
        backdrop: false,
        style: 'inverse',
        delay: {
            show: null,
            hide: 200
        }
    };
    
    $__default["default"] (helpAnchor.value)
        .webuiPopover('destroy')
        .webuiPopover(settings);
});

Vue.onBeforeUnmount(()=>{
    $__default["default"](helpAnchor.value).webuiPopover('destroy');
});

return (_ctx, _cache) => {
  return (Vue.openBlock(), Vue.createElementBlock(Vue.Fragment, null, [
    Vue.createElementVNode("span", {
      ref_key: "helpAnchor",
      ref: helpAnchor,
      class: "show-pop",
      "data-animation": "pop"
    }, [
      Vue.renderSlot(_ctx.$slots, "default"),
      Vue.renderSlot(_ctx.$slots, "icon", {}, () => [
        Vue.createTextVNode(Vue.toDisplayString(" ")),
        (!Vue.unref(slots).icon && !Vue.unref(slots).default)
          ? (Vue.openBlock(), Vue.createElementBlock("i", _hoisted_1$k))
          : Vue.createCommentVNode("v-if", true)
      ])
    ], 512 /* NEED_PATCH */),
    Vue.createElementVNode("div", _hoisted_2$e, [
      Vue.renderSlot(_ctx.$slots, "content", {}, () => [
        Vue.createElementVNode("div", { innerHTML: __props.content }, null, 8 /* PROPS */, _hoisted_3$a)
      ])
    ])
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$k.__file = "src/components/controls/view/km-help.vue";

const _hoisted_1$j = ["id"];
const _hoisted_2$d = ["for", "name", "required"];


var script$j = {
  __name: 'km-form-group',
  props: {
    name      : { type:String, default:"" },
    caption   : { type:String, required: true },
    required  : { type:Boolean, default:false },
    isValid : { type:Function },
    helpContent: { type: String, required: true },
    helpTitle: { type:String }
},
  setup(__props) {

const props = __props;

let reviewError = Vue.inject('validationReview');

const hasError    = ()=>{
    return props.name && props.required && reviewError?.isValid(props.name);
};


return (_ctx, _cache) => {
  return (Vue.openBlock(), Vue.createElementBlock("div", {
    id: _ctx.$attrs.id,
    class: Vue.normalizeClass(["scbd-controls km-form-group form-group mb-3", {'has-error':hasError(), 'has-help':__props.helpContent, 'mandatory':__props.required}])
  }, [
    (__props.caption)
      ? (Vue.openBlock(), Vue.createElementBlock("label", {
          key: 0,
          class: "mb-1 km-form-group-label",
          for: __props.name,
          name: __props.name,
          required: __props.required ? true : null
        }, Vue.toDisplayString(__props.caption), 9 /* TEXT, PROPS */, _hoisted_2$d))
      : Vue.createCommentVNode("v-if", true),
    (__props.helpContent)
      ? (Vue.openBlock(), Vue.createBlock(script$k, {
          key: 1,
          title: __props.helpTitle,
          content: __props.helpContent,
          class: "ms-1 me-1"
        }, null, 8 /* PROPS */, ["title", "content"]))
      : Vue.createCommentVNode("v-if", true),
    Vue.createElementVNode("div", null, [
      Vue.renderSlot(_ctx.$slots, "default")
    ])
  ], 10 /* CLASS, PROPS */, _hoisted_1$j))
}
}

};

script$j.__scopeId = "data-v-2d33fbf8";
script$j.__file = "src/components/controls/km-form-group.vue";

function asArray(data) {
    return ___default["default"]([ data ])
      .flatten()
      .compact()
      .value();
}

function lstring$1(ltext, locale) {
  if (Number.isInteger(ltext))
    //is number to handle generic implementation of NR
    return ltext;

  if (!ltext) return "";

  if (typeof ltext === "string") return ltext;

  locale = locale || lstringLocale(ltext, locale);
  let sText = "";
  if (!sText && locale) sText = ltext[locale];
  if (!sText) sText = ltext.en;
  if (!sText) {
    var normalized = normalizeText$1(ltext);
    if (normalized[locale]) return normalized[locale];

    for (var key in ltext) {
      sText = ltext[key];
      if (sText) break;
    }
  }
  return sText || "";
}

const lstringLocale = (ltext, locale) => {
  // TODO: use thesaraus API

  // TODO: use thesaraus API, there was an OR case to get value from thesaraus API
  if (!ltext) return locale;

  if (typeof ltext == "string") return locale;

  if (ltext[locale]) return locale;

  // TODO: use thesaraus API, there was a conditional check to get value from 'defaultLocale.value'

  if (ltext.en) return "en";

  if (ltext.fr) return "fr";
  if (ltext.es) return "es";
  if (ltext.ru) return "ru";
  if (ltext.ar) return "ar";
  if (ltext.zh) return "zh";

  for (var key in ltext) {
    if (ltext[key]) return key;
  }

  return locale;
};

const direction = (text, locale) => {
  locale = lstringLocale(text, locale);

  return localeDirection(locale);
};

const localeDirection = (locale) => {
  // TODO: use thesaraus API
  return locale == "ar" ? "rtl" : "ltr";
};

function normalizeText$1(text) {
  if (!text) return null;

  var entry = {
    ar: text.ar,
    en: text.en,
    es: text.es,
    fr: text.fr,
    ru: text.ru,
    zh: text.zh,
  };

  if (!entry.en) entry.en = entry.fr;
  if (!entry.en) entry.en = entry.es;
  if (!entry.en) entry.en = entry.ru;
  if (!entry.en) entry.en = entry.ar;
  if (!entry.en) entry.en = entry.zh;

  if (!entry.fr) entry.fr = entry.en;
  if (!entry.es) entry.es = entry.en;
  if (!entry.ru) entry.ru = entry.en;
  if (!entry.ar) entry.ar = entry.en;
  if (!entry.zh) entry.zh = entry.en;
  return entry;
}

const removeEmpty = (obj)=> {
    return function remove(current) {
      ___default["default"].forOwn(current, function (value, key) {
        if (___default["default"].isUndefined(value) || ___default["default"].isNull(value) || ___default["default"].isNaN(value) ||
          (___default["default"].isString(value) && ___default["default"].isEmpty(value)) ||
          (___default["default"].isObject(value) && ___default["default"].isEmpty(remove(value)))) {
  
          delete current[key];
        }
      });

      if (___default["default"].isArray(current)) ___default["default"].pull(current, undefined);
  
      return current;
  
    }(___default["default"].cloneDeep(obj));
};

const useLogger = ()=>{
    return {
        error
    }
};



function error(appError, userMessage){

    if(![404, 401, 403].includes(appError?.status)){

        try{
            console.error(appError);
            
            const { ACCOUNTS_HOST_URL, TAG, COMMIT } = useRuntimeConfig().public;
            const realmConfStore  = useRealmConfStore();
            const realmConf = realmConfStore.realmConf; 
            //TODO: send error to server
            const errorLog = {
                stack : JSON.stringify(appError, Object.getOwnPropertyNames(appError)), 
                message: JSON.stringify(userMessage || appError?.message || 'unknown'),
                url      : window.location.href,
                userAgent: window.navigator.userAgent,
                ver      : TAG||COMMIT,
                timestamp: new Date(),
                realm : realmConf.realm
            }; 

            useAPIFetch('/error-logs', {method:'POST', body: errorLog});
        }
        catch(err){
            console.error(err, 'error sending error log to server.');
        }
    }
        
    if(userMessage){
        const $toast = useToast();
        $toast.error(userMessage, {position:'top-right'}); 
    }
}

const _hoisted_1$i = ["id"];
const _hoisted_2$c = ["dir"];
const _hoisted_3$9 = ["dir", "innerHTML"];
const _hoisted_4$9 = {
  class: "input-group-text",
  style: {"cursor":"default"}
};
const _hoisted_5$8 = ["title"];
const _hoisted_6$6 = {
  class: "d-inline-block",
  tabindex: 0
};


var script$i = {
  __name: 'km-lstring-value',
  props: {
  value: { type: Object, required: true },
  locale: { type: String, required: true },
  type: { type: String, default: 'string' },
},
  setup(__props) {

const { value, locale, type } = __props;

const valueLocale = Vue.computed(() => lstringLocale(value, locale));
const valueLstring = Vue.computed(() => lstring$1(value, locale));

const getTerm = Vue.computed(() => {
    // TODO: use thesaraus API
    return {
        title: valueLocale.value
    }
});

return (_ctx, _cache) => {
  return (Vue.openBlock(), Vue.createElementBlock("div", {
    id: _ctx.$attrs.id,
    class: "scbd-controls km-lstring-value"
  }, [
    Vue.createElementVNode("div", {
      class: Vue.normalizeClass(`input-group input-lang-${__props.locale}`)
    }, [
      (__props.type === 'string')
        ? (Vue.openBlock(), Vue.createElementBlock("div", {
            key: 0,
            class: "form-control km-value km-value-string",
            dir: Vue.unref(direction)(valueLstring.value, __props.locale)
          }, Vue.toDisplayString(valueLstring.value), 9 /* TEXT, PROPS */, _hoisted_2$c))
        : (__props.type === 'html')
          ? (Vue.openBlock(), Vue.createElementBlock("div", {
              key: 1,
              class: "form-control km-value km-value-lstring-html ck-content",
              dir: Vue.unref(direction)(valueLstring.value, __props.locale),
              innerHTML: valueLstring.value
            }, null, 8 /* PROPS */, _hoisted_3$9))
          : Vue.createCommentVNode("v-if", true),
      Vue.createElementVNode("span", _hoisted_4$9, [
        Vue.createElementVNode("div", {
          "data-toggle": "tooltip",
          "data-placement": "top",
          title: Vue.unref(lstring$1)(getTerm.value.title, __props.locale)
        }, [
          Vue.createElementVNode("span", _hoisted_6$6, Vue.toDisplayString(valueLocale.value.toUpperCase()), 1 /* TEXT */)
        ], 8 /* PROPS */, _hoisted_5$8)
      ])
    ], 2 /* CLASS */)
  ], 8 /* PROPS */, _hoisted_1$i))
}
}

};

script$i.__file = "src/components/controls/view/km-lstring-value.vue";

const _hoisted_1$h = ["id"];
const _hoisted_2$b = ["dir"];
const _hoisted_3$8 = { key: 0 };
const _hoisted_4$8 = { key: 1 };
const _hoisted_5$7 = {
  class: "input-group-text",
  style: {"cursor":"default"}
};


var script$h = {
  __name: 'km-value-bool',
  props: {
  value: { type: Boolean, required: true },
  locale: { type: String, required: true }
},
  setup(__props) {

function t(str){
    //use 'vue-i18n' library
    return str;
}

return (_ctx, _cache) => {
  return (Vue.openBlock(), Vue.createElementBlock("div", {
    class: "scbd-controls km-value-bool",
    id: _ctx.$attrs.id
  }, [
    Vue.createElementVNode("div", {
      class: Vue.normalizeClass(`input-group input-lang-${__props.locale}`)
    }, [
      Vue.createElementVNode("div", {
        class: "form-control km-value",
        dir: Vue.unref(direction)(__props.value, __props.locale)
      }, [
        (__props.value)
          ? (Vue.openBlock(), Vue.createElementBlock("span", _hoisted_3$8, Vue.toDisplayString(t('yes')), 1 /* TEXT */))
          : (Vue.openBlock(), Vue.createElementBlock("span", _hoisted_4$8, Vue.toDisplayString(t('no')), 1 /* TEXT */))
      ], 8 /* PROPS */, _hoisted_2$b),
      Vue.createElementVNode("span", _hoisted_5$7, Vue.toDisplayString(__props.locale.toUpperCase()), 1 /* TEXT */)
    ], 2 /* CLASS */)
  ], 8 /* PROPS */, _hoisted_1$h))
}
}

};

script$h.__scopeId = "data-v-cdc3e980";
script$h.__file = "src/components/controls/view/km-value-bool.vue";

const _hoisted_1$g = ["id"];



  
var script$g = {
  __name: 'km-value',
  props: {
    value: { type: String, required: true }
  },
  setup(__props) {

return (_ctx, _cache) => {
  return (Vue.openBlock(), Vue.createElementBlock("div", {
    id: _ctx.$attrs.id,
    class: "scbd-controls km-value form-control"
  }, [
    Vue.renderSlot(_ctx.$slots, "default", {}, () => [
      Vue.createTextVNode(Vue.toDisplayString(__props.value), 1 /* TEXT */)
    ])
  ], 8 /* PROPS */, _hoisted_1$g))
}
}

};

script$g.__scopeId = "data-v-1a165c67";
script$g.__file = "src/components/controls/view/km-value.vue";

const _hoisted_1$f = ["id"];
const _hoisted_2$a = ["onClick"];
const _hoisted_3$7 = ["title"];
const _hoisted_4$7 = { tabindex: "0" };

  
var script$f = {
  __name: 'km-locales',
  props: /*#__PURE__*/Vue.mergeModels({  
    locales: { type: Array, required: true },
  }, {
    "modelValue": {type:String, required: true},
    "modelModifiers": {},
  }),
  emits: ["update:modelValue"],
  setup(__props) {

  const model = Vue.useModel(__props, "modelValue");
  const props = __props;

  // TODO: use i18n
  // const { t, locale : appLocale } = useI18n();
  const appLocale = Vue.ref("en");

  function onLocaleSelected(locale) {
    model.value = locale;
  }

  function setDefaultLocale(languages) {
    if (languages?.length) {
      if (languages.length === 1 || languages.includes(appLocale.value)) {
        onLocaleSelected(appLocale.value);
      } else {
        onLocaleSelected(languages[0]);
      }
    }
  }

  Vue.watch(props.locales, (languages) => {
    setDefaultLocale(languages);
  });

  function getTerm(lang) {
    //TODO: Use thesaurus API
    // thesaurusStore.loadTerm(`lang-${lang}`)
    // return thesaurusStore.getTerm(`lang-${lang}`)||{};   
    return lang;   
  }

return (_ctx, _cache) => {
  return (Vue.openBlock(), Vue.createElementBlock("div", {
    class: "scbd-controls km-locales btn-group",
    role: "group",
    "aria-label": "Document locales",
    id: _ctx.$attrs.id
  }, [
    (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(__props.locales, (locale) => {
      return (Vue.openBlock(), Vue.createElementBlock("button", {
        key: locale,
        class: Vue.normalizeClass(['btn', 'btn-primary', { active: locale === __props.modelValue }]),
        onClick: $event => (onLocaleSelected(locale))
      }, [
        Vue.createElementVNode("div", {
          "data-bs-toggle": "tooltip",
          "data-bs-placement": "top",
          class: "d-inline-block",
          title: Vue.unref(lstring$1)(getTerm(locale), appLocale.value)
        }, [
          Vue.createElementVNode("span", _hoisted_4$7, Vue.toDisplayString(locale.toUpperCase()), 1 /* TEXT */)
        ], 8 /* PROPS */, _hoisted_3$7)
      ], 10 /* CLASS, PROPS */, _hoisted_2$a))
    }), 128 /* KEYED_FRAGMENT */))
  ], 8 /* PROPS */, _hoisted_1$f))
}
}

};

script$f.__file = "src/components/controls/view/km-locales.vue";

const _hoisted_1$e = { class: "scbd-controls km-term" };
const _hoisted_2$9 = {
  key: 0,
  class: "alert alert-danger",
  role: "alert"
};


var script$e = {
  __name: 'km-term',
  props: {
  value: { type: Object, required: true },
  locale: { type: String, required: true },
},
  emits: ['onTermLoad'],
  setup(__props, { emit: __emit }) {

const emit = __emit;
const props = __props;

const term = Vue.ref(null);
const error = Vue.ref(null);

if (!props.value?.identifier || props.value) {
    try {
      // TODO: Use thesaurus API
      // term = await  thesaurusStore.loadTerm(value.value?.identifier||value.value);
      term.value = { title: 'SCBD Term' }; 
      if (term.value) {
        emit('onTermLoad', term.value);
      }
      //TODO: Use Thesaurus API
    } catch (error) {
      error.value = error;
      console.error(`Error loading term ${value.value}`, error);
    }
  }

return (_ctx, _cache) => {
  return (Vue.openBlock(), Vue.createElementBlock("span", _hoisted_1$e, [
    (error.value)
      ? (Vue.openBlock(), Vue.createElementBlock("div", _hoisted_2$9, "Error loading term " + Vue.toDisplayString(__props.value.identifier), 1 /* TEXT */))
      : Vue.createCommentVNode("v-if", true),
    Vue.createTextVNode(" " + Vue.toDisplayString(Vue.unref(lstring$1)(term.value, __props.locale)) + " ", 1 /* TEXT */),
    Vue.renderSlot(_ctx.$slots, "help", { term: term.value })
  ]))
}
}

};

script$e.__scopeId = "data-v-35cfd734";
script$e.__file = "src/components/controls/view/km-term.vue";

const _hoisted_1$d = {
  key: 0,
  id: "linkEditorModal",
  class: "scbd-common file-upload-editor modal fade show overflow-auto d-block scbd-controls link-editor",
  tabindex: "-1",
  role: "dialog",
  "aria-labelledby": "fileUploadEditor"
};
const _hoisted_2$8 = {
  class: "modal-dialog",
  role: "document"
};
const _hoisted_3$6 = { class: "modal-content" };
const _hoisted_4$6 = { class: "modal-header" };
const _hoisted_5$6 = { class: "modal-title" };
const _hoisted_6$5 = /*#__PURE__*/Vue.createElementVNode("span", { "aria-hidden": "true" }, "×", -1 /* HOISTED */);
const _hoisted_7$3 = [
  _hoisted_6$5
];
const _hoisted_8$3 = { class: "modal-body" };
const _hoisted_9$3 = { key: 0 };
const _hoisted_10$2 = {
  key: 0,
  class: "alert alert-danger",
  role: "alert"
};
const _hoisted_11$2 = /*#__PURE__*/Vue.createElementVNode("h4", null, "An error has occured", -1 /* HOISTED */);
const _hoisted_12$2 = [
  _hoisted_11$2
];
const _hoisted_13$2 = /*#__PURE__*/Vue.createElementVNode("div", {
  class: "progress",
  role: "progressbar",
  "aria-valuenow": "100",
  "aria-valuemin": "0",
  "aria-valuemax": "100"
}, [
  /*#__PURE__*/Vue.createElementVNode("div", {
    class: "progress-bar",
    style: {"width":"100%"}
  }, "100%")
], -1 /* HOISTED */);
const _hoisted_14$2 = { class: "mb-3" };
const _hoisted_15$1 = /*#__PURE__*/Vue.createElementVNode("label", {
  for: "name",
  class: "col-form-label"
}, "File name", -1 /* HOISTED */);
const _hoisted_16$1 = { class: "mb-3" };
const _hoisted_17$1 = /*#__PURE__*/Vue.createElementVNode("label", {
  for: "language",
  class: "col-form-label"
}, [
  /*#__PURE__*/Vue.createTextVNode("Language "),
  /*#__PURE__*/Vue.createElementVNode("span", { class: "text-danger" }, " *")
], -1 /* HOISTED */);
const _hoisted_18$1 = ["value"];
const _hoisted_19$1 = { class: "mb-3" };
const _hoisted_20$1 = /*#__PURE__*/Vue.createElementVNode("label", {
  for: "tag",
  class: "col-form-label"
}, "Tags", -1 /* HOISTED */);
    
    //TODO: use km-form-control when its available   
    //TODO: upload file, uploading process bar, error msg , showing file.size 
    
    
var script$d = {
  __name: 'file-upload-editor',
  emits: ['onClose'],
  setup(__props, { expose: __expose, emit: __emit }) {

    const modalOpen = Vue.ref(false) ;
    const isAddingNewFile = Vue.ref(false);
    const isUploadingError= Vue.ref(false);
    const link = Vue.ref({});  
    const newFile = Vue.ref({});   
  
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
    ? (Vue.openBlock(), Vue.createElementBlock("div", _hoisted_1$d, [
        Vue.createElementVNode("div", _hoisted_2$8, [
          Vue.createElementVNode("div", _hoisted_3$6, [
            Vue.createElementVNode("div", _hoisted_4$6, [
              Vue.createElementVNode("h3", _hoisted_5$6, [
                Vue.renderSlot(_ctx.$slots, "modalTitle", {}, () => [
                  Vue.createTextVNode("Uploading File")
                ])
              ]),
              Vue.createElementVNode("button", {
                type: "button",
                class: "close",
                "data-dismiss": "modal",
                "aria-label": "Close",
                onClick: close
              }, [..._hoisted_7$3])
            ]),
            Vue.createElementVNode("div", _hoisted_8$3, [
              (isAddingNewFile.value)
                ? (Vue.openBlock(), Vue.createElementBlock("div", _hoisted_9$3, [
                    (isUploadingError.value)
                      ? (Vue.openBlock(), Vue.createElementBlock("div", _hoisted_10$2, [..._hoisted_12$2]))
                      : Vue.createCommentVNode("v-if", true),
                    Vue.createElementVNode("div", null, [
                      Vue.createElementVNode("label", null, [
                        Vue.createTextVNode("Uploading "),
                        Vue.createElementVNode("span", null, Vue.toDisplayString(link.value.name), 1 /* TEXT */)
                      ]),
                      _hoisted_13$2
                    ])
                  ]))
                : Vue.createCommentVNode("v-if", true),
              Vue.createElementVNode("form", null, [
                Vue.createElementVNode("div", _hoisted_14$2, [
                  _hoisted_15$1,
                  Vue.withDirectives(Vue.createElementVNode("input", {
                    class: "form-control",
                    id: "name",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((link.value.name) = $event)),
                    type: "text",
                    placeholder: "example:SCBD website"
                  }, null, 512 /* NEED_PATCH */), [
                    [Vue.vModelText, link.value.name]
                  ])
                ]),
                Vue.createElementVNode("div", _hoisted_16$1, [
                  _hoisted_17$1,
                  Vue.withDirectives(Vue.createElementVNode("select", {
                    class: "form-select",
                    name: "language",
                    id: "language",
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((link.value.language) = $event))
                  }, [
                    (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(Vue.unref(languages), (language, key) => {
                      return (Vue.openBlock(), Vue.createElementBlock("option", {
                        value: key,
                        key: key
                      }, Vue.toDisplayString(language), 9 /* TEXT, PROPS */, _hoisted_18$1))
                    }), 128 /* KEYED_FRAGMENT */))
                  ], 512 /* NEED_PATCH */), [
                    [Vue.vModelSelect, link.value.language]
                  ])
                ]),
                Vue.createElementVNode("div", _hoisted_19$1, [
                  _hoisted_20$1,
                  Vue.withDirectives(Vue.createElementVNode("input", {
                    class: "form-control",
                    id: "tag",
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((link.value.tag) = $event)),
                    type: "text",
                    placeholder: "example: Biodiversity, Aichi target"
                  }, null, 512 /* NEED_PATCH */), [
                    [Vue.vModelText, link.value.tag]
                  ])
                ])
              ])
            ]),
            Vue.createElementVNode("div", { class: "modal-footer" }, [
              Vue.createElementVNode("button", {
                type: "button",
                class: "btn btn-secondary",
                onClick: close
              }, "Cancel"),
              Vue.createElementVNode("button", {
                type: "button",
                class: "btn btn-primary",
                onClick: save
              }, "Save")
            ])
          ])
        ])
      ]))
    : Vue.createCommentVNode("v-if", true)
}
}

};

script$d.__file = "src/components/controls/link/file-upload-editor.vue";

const _hoisted_1$c = ["id"];
const _hoisted_2$7 = ["dir"];


var script$c = {
  __name: 'km-value-term',
  props: {
  value: { type: Object, required: true },
  locale: { type: String, required: true },
},
  setup(__props) {
const termValue = Vue.ref(null);

const onTermLoad = function(term){
    termValue.value = { title: 'SCBD Term' };
    // thesaurusStore.loadTerm(`lang-${term}`);
};

return (_ctx, _cache) => {
  return (Vue.openBlock(), Vue.createElementBlock("div", {
    id: _ctx.$attrs.id,
    class: "scbd-controls km-value-term"
  }, [
    Vue.createElementVNode("div", {
      class: Vue.normalizeClass(`input-group input-lang-${__props.locale}`)
    }, [
      Vue.createElementVNode("div", {
        class: "form-control km-value",
        dir: Vue.unref(direction)(termValue.value?.title, __props.locale)
      }, [
        Vue.createVNode(script$e, {
          value: __props.value,
          locale: __props.locale,
          onOnTermLoad: onTermLoad
        }, null, 8 /* PROPS */, ["value", "locale"])
      ], 8 /* PROPS */, _hoisted_2$7)
    ], 2 /* CLASS */)
  ], 8 /* PROPS */, _hoisted_1$c))
}
}

};

script$c.__scopeId = "data-v-49bcf87c";
script$c.__file = "src/components/controls/view/km-value-term.vue";

const _hoisted_1$b = ["id"];



var script$b = {
  __name: 'km-value-terms',
  props: {
  value: { type: Array, required: true },
  locale: { type: String, required: true },
},
  setup(__props) {

return (_ctx, _cache) => {
  return (Vue.openBlock(), Vue.createElementBlock("div", {
    id: _ctx.$attrs.id,
    class: "scbd-controls km-value-terms d-grid gap-1"
  }, [
    (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(__props.value, (term) => {
      return (Vue.openBlock(), Vue.createElementBlock("div", { key: term }, [
        Vue.createVNode(script$c, {
          value: term,
          locale: __props.locale
        }, null, 8 /* PROPS */, ["value", "locale"])
      ]))
    }), 128 /* KEYED_FRAGMENT */))
  ], 8 /* PROPS */, _hoisted_1$b))
}
}

};

script$b.__scopeId = "data-v-e68ad4be";
script$b.__file = "src/components/controls/view/km-value-terms.vue";

const _hoisted_1$a = { class: "row" };
const _hoisted_2$6 = { class: "col-12" };
const _hoisted_3$5 = { class: "card" };
const _hoisted_4$5 = { class: "card-header" };
const _hoisted_5$5 = { class: "card-body" };
const _hoisted_6$4 = { class: "row" };
const _hoisted_7$2 = {
  class: "col-6",
  ref: "wrap"
};
const _hoisted_8$2 = { class: "col-6" };
const _hoisted_9$2 = { class: "callout callout-warning" };

function render(_ctx, _cache) {
  return (Vue.openBlock(), Vue.createElementBlock("div", _hoisted_1$a, [
    Vue.createElementVNode("div", _hoisted_2$6, [
      Vue.createElementVNode("div", _hoisted_3$5, [
        Vue.createElementVNode("div", _hoisted_4$5, Vue.toDisplayString(_ctx.$attrs["card-header"]), 1 /* TEXT */),
        Vue.createElementVNode("div", _hoisted_5$5, [
          Vue.createElementVNode("div", _hoisted_6$4, [
            Vue.createElementVNode("div", _hoisted_7$2, [
              Vue.renderSlot(_ctx.$slots, "left")
            ], 512 /* NEED_PATCH */),
            Vue.createElementVNode("div", _hoisted_8$2, [
              Vue.createElementVNode("div", _hoisted_9$2, [
                Vue.createElementVNode("code", null, [
                  Vue.renderSlot(_ctx.$slots, "right")
                ])
              ])
            ])
          ])
        ])
      ])
    ])
  ]))
}

const script$a = {};


script$a.render = render;
script$a.__file = "src/components/controls/preview-component.vue";

const _hoisted_1$9 = { slot: "clear" };

var script$9 = {
  __name: 'multi-selector',
  props: {   
    modelValue     : {type:[ String, Array, Object ], required:true, default:() => []},
    options      : { type: Array, required: true },
    label        : { type: String },
    trackBy      : { type: String },  
    placeholder  : { type: String,  default: 'Select option' },
    openDirection: { type: String, default: 'below' },
    groupValues  : { type: String },
    groupLabel   : { type: String },
    groupSelect  : { type: Boolean, default: false },
    multiple     : { type: Boolean, default: false },
    clearOnSelect: { type: Boolean, default: true },  
    closeOnSelect: { type: Boolean, default: true },
    searchable   : { type: Boolean, default: true },
    disabled     : { type: Boolean, default: false },
    customLabel  : { type: Function,
      default (option, label) {
        // if (isEmpty(option)) return ''
        return label ? option[label] : option
      }
    },
    allowEmpty   : { type: Boolean, default: true },
    valueKey     : { type: String, required: true},
    customSelectedItem  : {type: Function,default (item) {return item;}},
    isValid      : { type: [ Boolean, Function ],  default: null },   
},
  emits: ['update:model-value', "on-select","on-remove","on-search-change","on-open", "on-close", "on-add-tag","on-value-change"],
  setup(__props, { emit: __emit }) {
  
const emit = __emit;

const props = __props;

const onEventTextChange=(...args)=>{
  this.$emit('on-search-change', ...args);
};
let selectItems = Vue.computed({  
    get() {
      const selected = asArray(props.modelValue).map((value) => {
        return props.options?.find((option) => {
          const customSelectedItem =props.customSelectedItem(option[props.valueKey], option);
          
          return _.isEqual(customSelectedItem, value);
        })
      });

      return _.compact(selected)
    },
    set(events) {
      let ids = asArray(events).map((event) => props.customSelectedItem(event[props.valueKey], event));     
      emit('update:model-value', props.multiple ? ids : ids[0]);
    },
  }
); 

return (_ctx, _cache) => {
  return (Vue.openBlock(), Vue.createBlock(Vue.unref(VueMultiselect__default["default"]), {
    modelValue: Vue.unref(selectItems),
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (Vue.isRef(selectItems) ? (selectItems).value = $event : selectItems = $event)),
    label: __props.label,
    "track-by": __props.trackBy,
    placeholder: __props.placeholder,
    "open-direction": __props.openDirection,
    options: __props.options,
    "group-values": __props.groupValues,
    "group-label": __props.groupLabel,
    "group-select": __props.groupSelect,
    multiple: __props.multiple,
    "clear-on-select": __props.clearOnSelect,
    "close-on-select": __props.closeOnSelect,
    searchable: __props.searchable,
    disabled: __props.disabled,
    onSearchChange: onEventTextChange,
    "custom-label": __props.customLabel,
    "allow-empty": __props.allowEmpty,
    "deselect-label": "Can't remove this value"
  }, {
    default: Vue.withCtx(() => [
      Vue.renderSlot(_ctx.$slots, "clear", {}, () => [
        Vue.createElementVNode("template", _hoisted_1$9, [
          (Vue.unref(selectItems).length && !__props.disabled)
            ? (Vue.openBlock(), Vue.createElementBlock("div", {
                key: 0,
                class: "multiselect__clear",
                onMousedown: _cache[0] || (_cache[0] = Vue.withModifiers($event => {Vue.isRef(selectItems) ? selectItems.value = null : selectItems = null; _ctx.$emit('change', null);}, ["prevent","stop"]))
              }, null, 32 /* NEED_HYDRATION */))
            : Vue.createCommentVNode("v-if", true)
        ])
      ])
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["modelValue", "label", "track-by", "placeholder", "open-direction", "options", "group-values", "group-label", "group-select", "multiple", "clear-on-select", "close-on-select", "searchable", "disabled", "custom-label", "allow-empty"]))
}
}

};

script$9.__file = "src/components/controls/multi-selector.vue";

const _hoisted_1$8 = ["id"];


var script$8 = {
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
  return (Vue.openBlock(), Vue.createElementBlock("button", {
    class: "scbd-common select-file-button btn btn-primary",
    type: "button",
    id: _ctx.$attrs.id,
    onClick: _cache[0] || (_cache[0] = Vue.withModifiers($event => (selectFile()), ["prevent","stop"]))
  }, [
    Vue.renderSlot(_ctx.$slots, "default")
  ], 8 /* PROPS */, _hoisted_1$8))
}
}

};

script$8.__file = "src/components/inputs/select-file-button.vue";

const _hoisted_1$7 = { class: "scbd-common km-add-file" };
  

    
var script$7 = {
  __name: 'km-add-file',
  props: /*#__PURE__*/Vue.mergeModels({multiple: { type: Boolean, require: false, default: false }}, {
    "modelValue": {type:Array, required:true, default:[]},
    "modelModifiers": {},
  }),
  emits: ["update:modelValue"],
  setup(__props) {

    const links = Vue.useModel(__props, "modelValue");

    const fileEditorRef= Vue.shallowRef (null); 
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
  return (Vue.openBlock(), Vue.createElementBlock("div", _hoisted_1$7, [
    Vue.createVNode(script$8, { onOnFileSelected: receiveFile }, {
      default: Vue.withCtx(() => [
        Vue.renderSlot(_ctx.$slots, "file-button-label", {}, () => [
          Vue.createTextVNode("+ Add Files")
        ])
      ]),
      _: 3 /* FORWARDED */
    }),
    Vue.createVNode(script$d, {
      ref_key: "fileEditorRef",
      ref: fileEditorRef,
      onOnClose: onFileUploadEditorClose
    }, {
      modalTitle: Vue.withCtx(() => [
        Vue.renderSlot(_ctx.$slots, "link-dialog-title", {}, () => [
          Vue.createTextVNode(" File Upload ")
        ])
      ]),
      _: 3 /* FORWARDED */
    }, 512 /* NEED_PATCH */),
    Vue.renderSlot(_ctx.$slots, "links-view", {}, () => [
      Vue.createVNode(script$n, {
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

script$7.__file = "src/components/controls/link/km-add-file.vue";

const _hoisted_1$6 = ["id"];
const _hoisted_2$5 = { class: "nav-header mb-2" };
const _hoisted_3$4 = { class: "nav nav-pills nav-fill" };
const _hoisted_4$4 = ["onClick"];
const _hoisted_5$4 = {
  class: "nav-link",
  href: "#"
};
const _hoisted_6$3 = { class: "tabStatus" };
const _hoisted_7$1 = { class: "tabLabel" };
const _hoisted_8$1 = { class: "nav-body" };
const _hoisted_9$1 = { class: "nav-footer mt-2" };
const _hoisted_10$1 = { class: "nav nav-pills nav-fill" };
const _hoisted_11$1 = ["onClick"];
const _hoisted_12$1 = {
  class: "nav-link",
  href: "#"
};
const _hoisted_13$1 = { class: "tabStatus" };
const _hoisted_14$1 = { class: "tabLabel" };


var script$6 = {
  __name: 'km-form-wizard',
  emits: ["onTabChange"],
  setup(__props, { emit: __emit }) {

const tabs = Vue.ref([]);
const emits = __emit;

const selectTab = (index) => {
  switchTab(index);
};
const switchTab = (index) => {
  tabs.value.forEach((tab) => {
    tab.isActive = false;
  });
  tabs.value[index].isActive = true;
  emits("onTabChange", index);
};
Vue.computed(() => this.tabs.length);
Vue.computed(() => this.tabs.find((e) => e.isActive));

Vue.onBeforeMount(() => {
   Vue.provide("addFormWizardTabKey", (tab) => {
    tabs.value.push(tab);
  });
});

return (_ctx, _cache) => {
  return (Vue.openBlock(), Vue.createElementBlock("div", {
    id: _ctx.$attrs.id,
    class: "sbcd-controls km-form-wizard"
  }, [
    Vue.createElementVNode("div", _hoisted_2$5, [
      Vue.createElementVNode("ul", _hoisted_3$4, [
        (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(tabs.value, (tab, index) => {
          return (Vue.openBlock(), Vue.createElementBlock("li", {
            onClick: Vue.withModifiers($event => (selectTab(index)), ["prevent","stop"]),
            class: Vue.normalizeClass(["nav-item", { active: tab.isActive }]),
            key: `tab-${index}`
          }, [
            Vue.createElementVNode("a", _hoisted_5$4, [
              Vue.createElementVNode("span", _hoisted_6$3, Vue.toDisplayString(index + 1), 1 /* TEXT */),
              Vue.createElementVNode("span", _hoisted_7$1, Vue.toDisplayString(tab.title), 1 /* TEXT */)
            ])
          ], 10 /* CLASS, PROPS */, _hoisted_4$4))
        }), 128 /* KEYED_FRAGMENT */))
      ])
    ]),
    Vue.createElementVNode("div", _hoisted_8$1, [
      Vue.createElementVNode("form", null, [
        Vue.renderSlot(_ctx.$slots, "default")
      ])
    ]),
    Vue.createElementVNode("div", _hoisted_9$1, [
      Vue.createElementVNode("ul", _hoisted_10$1, [
        (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(tabs.value, (tab, index) => {
          return (Vue.openBlock(), Vue.createElementBlock("li", {
            onClick: Vue.withModifiers($event => (selectTab(index)), ["prevent","stop"]),
            class: Vue.normalizeClass(["nav-item", { active: tab.isActive }]),
            key: `tab-${index}`
          }, [
            Vue.createElementVNode("a", _hoisted_12$1, [
              Vue.createElementVNode("span", _hoisted_13$1, Vue.toDisplayString(index + 1), 1 /* TEXT */),
              Vue.createElementVNode("span", _hoisted_14$1, Vue.toDisplayString(tab.title), 1 /* TEXT */)
            ])
          ], 10 /* CLASS, PROPS */, _hoisted_11$1))
        }), 128 /* KEYED_FRAGMENT */))
      ])
    ])
  ], 8 /* PROPS */, _hoisted_1$6))
}
}

};

script$6.__scopeId = "data-v-10e44f6d";
script$6.__file = "src/components/controls/km/km-form-wizard.vue";

const _hoisted_1$5 = ["id"];


var script$5 = {
  __name: 'km-form-wizard-tab-content',
  props: {
  isActive: { type:Boolean, default: false },
  title: { type: String, required: true },
},
  setup(__props) {

const props = __props;

Vue.onMounted(() => {
  const addTab = Vue.inject("addFormWizardTabKey");

  addTab({
    title: props.title,
    isActive: props.isActive,
  });
});

return (_ctx, _cache) => {
  return (__props.isActive)
    ? (Vue.openBlock(), Vue.createElementBlock("div", {
        key: 0,
        class: "scbd-controls km-form-wizard-tab-content",
        id: _ctx.$attrs.id
      }, [
        Vue.renderSlot(_ctx.$slots, "default")
      ], 8 /* PROPS */, _hoisted_1$5))
    : Vue.createCommentVNode("v-if", true)
}
}

};

script$5.__file = "src/components/controls/km/km-form-wizard-tab-content.vue";

const  useI18n = ()=>{
    return {
        t       : (key)=>key,
        locale  : 'en'
    }
};

const _hoisted_1$4 = {
  key: 0,
  class: "ms-2"
};
const _hoisted_2$4 = {
  key: 1,
  class: "ms-2"
};

    
var script$4 = {
  __name: 'spinner',
  props: { 
        message : { type: String },
        variant : { type: String, default:'spinner-border'}
    },
  setup(__props) {

    const { t } = useI18n();  
    const attrs = Vue.useAttrs();

    const alignCenter = Vue.computed(()=>attrs.hasOwnProperty('center'));  


return (_ctx, _cache) => {
  return (Vue.openBlock(), Vue.createElementBlock("div", {
    class: Vue.normalizeClass(["scbd-common spinner", {'d-flex justify-content-center' : alignCenter.value}])
  }, [
    Vue.createElementVNode("span", {
      class: Vue.normalizeClass(__props.variant),
      role: "status"
    }, null, 2 /* CLASS */),
    Vue.renderSlot(_ctx.$slots, "default", {}, () => [
      (__props.message)
        ? (Vue.openBlock(), Vue.createElementBlock("span", _hoisted_1$4, Vue.toDisplayString(__props.message), 1 /* TEXT */))
        : Vue.createCommentVNode("v-if", true),
      (!__props.message)
        ? (Vue.openBlock(), Vue.createElementBlock("span", _hoisted_2$4, Vue.toDisplayString(Vue.unref(t)('loading')) + "...", 1 /* TEXT */))
        : Vue.createCommentVNode("v-if", true)
    ])
  ], 2 /* CLASS */))
}
}

};

script$4.__file = "src/components/controls/spinner.vue";

const _hoisted_1$3 = {
  key: 0,
  class: "scbd-common spinner-modal",
  tabindex: "-1",
  role: "dialog"
};
const _hoisted_2$3 = {
  class: "modal-dialog",
  role: "document"
};
const _hoisted_3$3 = { class: "modal-content" };
const _hoisted_4$3 = { class: "modal-header" };
const _hoisted_5$3 = { class: "modal-title" };
const _hoisted_6$2 = { class: "modal-body" };

    
var script$3 = {
  __name: 'spinner-modal',
  props: {
        visible : { type:Boolean, default:false},
        title   : { type:String},
        message : { type:String}
    },
  setup(__props) {

    const {t, locale } = useI18n();  

    const props = __props;

return (_ctx, _cache) => {
  return (props.visible)
    ? (Vue.openBlock(), Vue.createElementBlock("div", _hoisted_1$3, [
        Vue.createElementVNode("div", _hoisted_2$3, [
          Vue.createElementVNode("div", _hoisted_3$3, [
            Vue.createElementVNode("div", _hoisted_4$3, [
              Vue.createElementVNode("h5", _hoisted_5$3, Vue.toDisplayString(props.title|| Vue.unref(t)('processing')), 1 /* TEXT */)
            ]),
            Vue.createElementVNode("div", _hoisted_6$2, [
              Vue.renderSlot(_ctx.$slots, "default", {}, () => [
                Vue.createVNode(script$4, {
                  message: __props.message || Vue.unref(t)('loading')
                }, null, 8 /* PROPS */, ["message"])
              ])
            ])
          ])
        ])
      ]))
    : Vue.createCommentVNode("v-if", true)
}
}

};

script$3.__file = "src/components/controls/spinner-modal.vue";

let sitePrefixUrl = 'https://api.cbd.int';

if(/\.cbd\.int$/i   .test(window?.location?.hostname || '')) sitePrefixUrl= 'https://api.cbd.int';
if(/\.cbddev\.xyz$/i.test(window?.location?.hostname || '')) sitePrefixUrl= 'https://api.cbddev.xyz';
if(/\localhost$/i   .test(window?.location?.hostname || '')) sitePrefixUrl= '/';

const defaultOptions = { 
   prefixUrl:  sitePrefixUrl, 
   timeout  : 30 * 1000,
   token: Vue__namespace?.prototype?.$auth?.strategy?.token?.get()  
};

class ApiBase
{
  constructor(options) {
    options = options || {};

    if(_.isFunction(options)) options = { token : options };

    const { token, prefixUrl, timeout, tokenType } = { ...defaultOptions, ...options };

    this.config = {
      baseURL : prefixUrl,
      timeout,
      tokenType,
      token,
    };

    const http = async function (...args) {   
      return (await loadAsyncHeaders(this.config))(...args);
    };

    http.get     = async (...args)=> (await loadAsyncHeaders(this.config)).get    (...args);
    http.head    = async (...args)=> (await loadAsyncHeaders(this.config)).head   (...args);
    http.post    = async (...args)=> (await loadAsyncHeaders(this.config)).post   (...args);
    http.put     = async (...args)=> (await loadAsyncHeaders(this.config)).put    (...args);
    http.patch   = async (...args)=> (await loadAsyncHeaders(this.config)).patch  (...args);
    http.delete  = async (...args)=> (await loadAsyncHeaders(this.config)).delete (...args);
    http.options = async (...args)=> (await loadAsyncHeaders(this.config)).options(...args);
    http.request = async (...args)=> (await loadAsyncHeaders(this.config)).request(...args);

    this.http = http;
  }
}

async function loadAsyncHeaders(baseConfig) {

  const { token, tokenType, ...config } = baseConfig || {};

  const headers = { ...(config.headers || {}) };

  if(token) {
      headers.Authorization = `${tokenType||'Bearer'} ${token}`;
  }

  return axios__default["default"].create({ ...config, headers } );

}

//////////////////////////
// Helpers
////////////////////////

function tryCastToApiError(error) {

  if(error && error.response && error.response.data && error.response.data.code) {
      error.response.data;
      throw error.response.data;
  }

  throw error
}

function stringifyUrlParam(value) {
  if (value instanceof(Date))   {return value.toISOString()}    
  if (value instanceof(Object)) {return JSON.stringify(value)}  
  return value; 
}

function stringifyUrlParams(valueObj) {
  const returnObj = {};

  for (const [key, value] of Object.entries(valueObj)) {
    if (isValid(value)){
      returnObj[key] = stringifyUrlParam(value);
    }
  }
  
  return returnObj;
}

function isValid(params){
  return ![undefined, null].includes(params);
}

const  serviceUrls$1 = { 
  documentQueryUrl      (                     ){ return "/api/v2013/documents" },
  documentUrl           (identifier           ){ return `/api/v2013/documents/${encodeURIComponent(identifier)}` },
  documentInfoUrl       (identifier           ){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/info` }, 
  validateUrl           (                     ){ return "/api/v2013/documents/x/validate" },
  attachmentUrl         (identifier, filename ){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/attachments/${encodeURIComponent(filename)}` },
  temporaryAttachmentUrl(                     ){ return `/api/v2015/temporary-files` },
  persistAttachmentUrl  (identifier, guid     ){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/attachments/persist-temporary/${encodeURIComponent(guid)}` },
  securityUrl           (identifier, operation){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/securities/${encodeURIComponent(operation)}` },
  documentVersionListUrl(identifier           ){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/versions` },
  documentVersionUrl    (identifier           ){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/versions/:revision` },
  documentVersionInfoUrl(identifier           ){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/versions/:revision/info` } 
};


class KmDocumentsApi extends ApiBase
{
  #realm;
  constructor(options) {  
    super(options );
    this.self = this;
    this.#realm = options.realm;
  }

  async query( {realm, q, s, l, sk }={}){
    const params = stringifyUrlParams( { 
      $filter:q, 
      $orderby:s,
      $skip:sk, 
      $top:l,
      collection : "my"
    });

    const headers =  { Realm : realm || this.#realm || undefined };
    
    return this.http.get(serviceUrls$1.documentQueryUrl(), { headers, params } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async get(identifier, {realm}={} ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 
        
    const headers =  { Realm : realm || this.#realm || undefined };

    return this.http.get(serviceUrls$1.documentUrl(identifier) ,{ headers } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }


  async getInfo(identifier, {realm}={} ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 
        
    const headers =  { Realm : realm || this.#realm || undefined };

    return this.http.get(serviceUrls$1.documentInfoUrl(identifier) ,{ headers } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async exists( identifier, {realm}={} ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 

    const headers =  { Realm : realm || this.#realm || undefined };

    return this.http.head(serviceUrls$1.documentUrl(identifier), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async put( identifier, body, {realm}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(body)) throw Error(`invalid value for body`);  
  
    const Realm =  { Realm : realm || this.#realm || undefined };  
    const ContentType = { 'Content-Type': 'application/json' };
    const headers =  { ...Realm , ...ContentType};
    
    return this.http.put(serviceUrls$1.documentUrl(identifier), body , { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async delete(identifier, {realm}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const headers =  { Realm : realm || this.#realm || undefined };  

    return this.http.delete(serviceUrls$1.documentUrl(identifier), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
   
  async validate(body, {realm, schema, metadata }={}){
    if(!isValid(body)) throw Error(`invalid value for body`);  

    const params = stringifyUrlParams( { schema, metadata });

    const headers =  { Realm : realm || this.#realm || undefined };  
   
    return this.http.put(serviceUrls$1.validateUrl(), body, { headers, params } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async canCreate(identifier, {realm, schema, metadata}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(schema)) throw Error(`invalid value for schema`);  

    const params = stringifyUrlParams({ schema, metadata });

    const headers =  { Realm : realm || this.#realm || undefined };  

    return this.http.get(serviceUrls$1.securityUrl(identifier, 'create'), { headers, params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async canUpdate(identifier,  {realm, metadata }={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const params = stringifyUrlParams( {metadata });

    const headers =  { Realm : realm || this.#realm || undefined };  

    return this.http.get(serviceUrls$1.securityUrl(identifier, 'update'), { headers, params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  } 
 
  async canDelete(identifier, {realm}={} ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 
    
    const headers =  { Realm : realm || this.#realm || undefined };  
   
    return this.http.get(serviceUrls$1.securityUrl(identifier, 'delete'), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
}

class KmDocumentsVersionApi extends ApiBase
{
  #realm;
  constructor(options) {    
    super(options);
    this.self = this;
    this.#realm = options.realm;
  }
  

  async query(identifier, {realm}={}){

    const headers =  { Realm : realm || this.#realm || undefined };  
    
    return this.http.get(serviceUrls$1. documentVersionListUrl(identifier) , { headers, params } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async get(identifier, {realm}={} ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 
        
    const headers =  { Realm : realm || this.#realm || undefined };  

    return this.http.get(serviceUrls$1.documentVersionUrl(identifier) ,{ headers } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }


  async getInfo(identifier, {realm}={} ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 
        
    const headers =  { Realm : realm || this.#realm || undefined };  

    return this.http.get(serviceUrls$1.documentVersionInfoUrl(identifier) ,{ headers } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async exists( identifier, {realm}={} ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`); 

    const headers =  { Realm : realm || this.#realm || undefined };  

    return this.http.head(serviceUrls$1.documentVersionUrl(identifier), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

}

class KmAttachmentsApi extends ApiBase
{
  #realm;
  constructor(options) {    
    super(options);
    this.self = this;
    this.#realm = options.realm;
  }

  async uploadTempFile(identifier, file, fileName, options)  {
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(file))       throw Error(`invalid value for file`);  
    if(!isValid(fileName))   throw Error(`invalid value for fileName`);  
    if(!isValid(options))    throw Error(`invalid value for options`);  
    
    
    const { timeout, onUploadProgress, onDownloadProgress }= { ...(options||{}) };

    const apiConfig = {
      headers: {},
      timeout: timeout || 60 * 60 * 1000,
      onUploadProgress, 
      onDownloadProgress
    };
    
    const tempSlotBody = {
        filename    : fileName,
    };

    //find the content type and validate with whitelist
    if(file instanceof FormData){
        const tempFile = formData.get('file');
        if(tempFile){
            tempSlotBody.contentType = this.getMimeType(file);
        }
    }
    else if(file instanceof File){
        tempSlotBody.contentType = this.getMimeType(file);
    }
    else {
        throw new Error('Unable to read file information.')
    }
    
    if (this.mimeTypeWhitelist().indexOf(tempSlotBody.contentType) < 0) {
        throw new Error("File type not supported: " + mimeType + "(" + file.name + ")");
    }

    //const key = S4();
    // get a temporary slot from S3 to upload the file
    const temporarySlot = this.http.put(serviceUrls$1.temporaryAttachmentUrl(),  tempSlotBody  )
                                   .then(res => res.data)
                                   .catch(tryCastToApiError);
    
    // upload the file to the temporary slot on S3    
    apiConfig.headers['Content-Type' ] = temporarySlot.contentType;
    //apiConfig.headers['Authorization'] = undefined;
    this.http.put(temporarySlot.url, file,  {  ...apiConfig} )
                                         .then(res => res.data)
                                         .catch(tryCastToApiError);

    //persists the file using the KM persists attachments endpoint
    const persistedAttachment =  this.http.post(serviceUrls$1.persistAttachmentUrl(identifier, temporarySlot.uid), fileName,  { params } )
                                          .then(res => res.data)
                                          .catch(tryCastToApiError);
    
    const config = useRuntimeConfig();
    return {
        ...persistedAttachment,
        url     : config.public.API_URL+persistedAttachment.url        
    };
  }

  async upload(identifier, file,  {contentType, headers  }={}) {
        if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
        if(!isValid(file)) throw Error(`invalid value for file`);  

        params = {contentType, identifier, filename } || {};
        params.identifier = identifier;
        params.filename = file.name;

        var contentType = params.contentType || this.getMimeType(file);

        // params.contentType = undefined;
        params.headers = params.header || {};
        params.headers["Content-Type"] = contentType;

        ////TEMP////////////////
            //upload to temp url
            const data = this.http.put(serviceUrls$1.attachmentUrl(identifier, file.name), body=file,  { params } )
                                  .then(res => res.data)
                                  .catch(tryCastToApiError);
            
            const config = useRuntimeConfig();
            data.url = config.public.API_URL+data.url;
            data.urls = {//required by ckeditor
                "default": data.url 
            };
            
            return data;
        ///////TEMP////////////////

      //TODO : use s3
      //1 request for temp file from s3
      //upload file 
      //return s3 location
      //persist temp file location in api
  }
  getMimeType(file) {
    if(!isValid(file)) throw Error(`invalid value for file`);  

    const filename = file.name;
    let  sMimeType = file.type || "application/octet-stream";     

    if (filename && sMimeType == "application/octet-stream") {
        var sExt = "";
        var iIndex = filename.lastIndexOf(".");

        if (iIndex >= 0)
            sExt = filename.substring(iIndex).toLowerCase();

        if (sExt == ".json") sMimeType = "application/json";
        if (sExt == ".geojson") sMimeType = "application/json";
        if (sExt == ".xml") sMimeType = "application/xml";
    }

    return sMimeType;
  }
  
}

const  serviceUrls = { 
  documentQueryUrl      (                     ){ return "/api/v2013/documents" },
  draftUrl              (identifier           ){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/versions/draft` },
  draftSecurityUrl      (identifier, operation){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/versions/draft/securities/${encodeURIComponent(operation)}` },
  draftLockUrl          (identifier, lockID   ){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/versions/draft/locks/${encodeURIComponent(lockID)}` },
  draftLockListUrl      (identifier           ){ return `/api/v2013/documents/${encodeURIComponent(identifier)}/versions/draft/locks` },
};

class KmDraftsApi extends ApiBase
{
  #realm;
  constructor(options) {    
    super(options);
    this.self = this;
    this.#realm = options.realm;
  }

  async query({realm, q, s, l, sk }={}){  
    const params = stringifyUrlParams( {    
      $filter:q, 
      $orderby:s,
      $top:l,
      $skip:sk, 
      collection : "mydraft"  
    });

    const headers =  { Realm : realm || this.#realm || undefined };

    const data =  this.http.get(serviceUrls.documentQueryUrl(), { headers, params} )
                           .then(res => res.data)
                           .catch(tryCastToApiError);
     
    if(data?.Items?.length){
      data.Items = data.Items.map(e=>{
            if(e.workingDocumentBody){
                e.body = e.workingDocumentBody;
            }
            return e;
      });
    }

    return data;
  }

  async get(identifier, {realm}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    
    const headers =  { Realm : realm || this.#realm || undefined };

    const data =  this.http.get(serviceUrls.draftUrl(identifier), { headers })
                           .then(res => res.data)
                           .catch(tryCastToApiError);
    
    if(data.workingDocumentBody){
        data.body = data.workingDocumentBody;
    }

    return data;
  }

  async exists( identifier, {realm}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const headers =  { Realm : realm || this.#realm || undefined };

     return this.http.head(serviceUrls.draftUrl(identifier), { headers })
                     .then(res => res.data)
                     .catch(tryCastToApiError);
  }

  async put( identifier, body, {realm, schema}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(body)) throw Error(`invalid value for body`);  

    const params = stringifyUrlParams( {schema}); 

    const Realm =  { Realm : realm || this.#realm || undefined };
    const ContentType = { 'Content-Type': 'application/json' };
    const headers =  { ...Realm , ...ContentType};

    return this.http.put(serviceUrls.draftUrl(identifier),  body , { headers, params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async delete(identifier, {realm}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const headers =  { Realm : realm || this.#realm || undefined };

    return this.http.delete(serviceUrls.draftUrl(identifier), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
  
  async canCreate(identifier, {realm, schema, metadata }={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const params = stringifyUrlParams( {schema, metadata }); 

    const headers =  { Realm : realm || this.#realm || undefined };

    return this.http.get(serviceUrls.draftSecurityUrl(identifier, 'create'), { headers, params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async canUpdate(identifier, {realm, metadata}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const headers =  { Realm : realm || this.#realm || undefined };

    const params = stringifyUrlParams( {metadata}); 
    return this.http.get(serviceUrls.draftSecurityUrl(identifier, 'update'), { headers, params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async canDelete(identifier, {realm}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const headers =  { Realm : realm || this.#realm || undefined };

    return this.http.get(serviceUrls.draftSecurityUrl(identifier, 'delete'), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
}


class KmLocksApi extends ApiBase
{
  #realm;
  constructor(options) {    
    super(options);
    this.self = this;
    this.#realm = options.realm;
  }

  async query(identifier, {realm}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  

    const headers =  { Realm : realm || this.#realm || undefined };
 
    return this.http.get(serviceUrls.draftLockListUrl(identifier), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async get(identifier, lockID, {realm}={} ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(lockID)) throw Error(`invalid value for lockID`); 

    const headers =  { Realm : realm || this.#realm || undefined };

    return this.http.get(serviceUrls.draftLockUrl(identifier, lockID), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async exists(identifier,lockID, {realm}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(lockID)) throw Error(`invalid value for lockID`); 

    const headers =  { Realm : realm || this.#realm || undefined };

    return this.http.head(serviceUrls.draftLockUrl(identifier, lockID), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }  
 
  async put(identifier,lockID, body, {realm}={}){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(lockID)) throw Error(`invalid value for lockID`); 

    const headers =  { Realm : realm || this.#realm || undefined };
    
    return this.http.put(serviceUrls.draftLockUrl(identifier,lockID), body, { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
 
  async delete(identifier,lockID, {realm}={} ){
    if(!isValid(identifier)) throw Error(`invalid value for identifier`);  
    if(!isValid(lockID)) throw Error(`invalid value for lockID`); 

    const headers =  { Realm : realm || this.#realm || undefined };

    return this.http.delete(serviceUrls.draftLockUrl(identifier,lockID), { headers })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
}

class KmStorageApi extends ApiBase 
{
  constructor(options) {
    super(options);
    
    this.documents           = new KmDocumentsApi(options);
    this.documentsVersion    = new KmDocumentsVersionApi(options);
    this.drafts              = new KmDraftsApi(options);
    this.locks               = new KmLocksApi(options);
    this.attachments         = new KmAttachmentsApi(options);    
  }
}

const _hoisted_1$2 = {
  key: 0,
  style: {"border":"1px solid #eee"},
  class: "vld-parent"
};
const _hoisted_2$2 = { style: {"border":"1px solid #eee","border-top":"none"} };
const _hoisted_3$2 = {
  class: "float-end",
  id: "wordCountSec",
  style: {"padding-right":"5px"}
};
const _hoisted_4$2 = {
  key: 1,
  style: {"border":"1px solid #eee","border-top":"none"}
};
const _hoisted_5$2 = {
  class: "alert alert-danger",
  role: "alert"
};

    //   import OverlayLoading from 'vue3-loading-overlay';
    //   import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
    //   import KmSpinner from '../KmSpinner.vue';
    
    
var script$2 = {
  __name: 'ck-editor',
  props: /*#__PURE__*/Vue.mergeModels({     
        tagName  : { type: String, required: false,default: 'div'},     
        uploadUrl: { type: String, required: false},
        config   : { type: Object, required: true},
        identifier: { type: String, required: true}  
    }, {
    "modelValue": {type:String, required:true, default:''},
    "modelModifiers": {},
  }),
  emits: /*#__PURE__*/Vue.mergeModels(['update:modelValue', 'onFileUpload', 'onEditorDestroy'], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
 
    const model    = Vue.useModel(__props, "modelValue");

    const props = __props;    

 
    const emit     = __emit;

    const api          = new KmStorageApi({});
    const ckeditor     = CKEditor__default["default"].component;
    const editor       = ClassicEditor__default["default"];
    const uploadErrors = [];

    const {t, locale }    = useI18n();
    const wordCount       = Vue.ref(0);
    const isUploadingFile = Vue.ref(false);

    const  binding  = Vue.computed({       
        get()      {  return model.value;  },        
        set(value) {  emit('update:modelValue', value);  }
    });      
  
     
    const onEditorReady=(ed)  =>{    
        class UploadAdapter {
          constructor(loader) {
            this.loader = loader;
          }
          upload() {
            const loader = this.loader;
            return this.loader.file.then(function(file){
              
              isUploadingFile.value = true;  
              return api.attachments.uploadTempFile(props.identifier, file, file.name)   
                  .then(function(success) {                 
                      success.urls = { "default": success.url };
                      loader.uploaded = success;
                      return success;
                  })
                  .catch(function(error) {                   
                      uploadErrors.push({file:file.name });  
                      useLogger().error(error);                     
                      throw error;
                  })
                  .finally(()=>{
                      isUploadingFile.value = false;  
                  });
            })
          }
          abort() {
          }
        }
        ed.plugins.get('FileRepository').createUploadAdapter = function(loader){
            const uploadAdapter = new UploadAdapter(loader);
            uploadAdapter.loader.on('change:uploaded' , onEditorImageUploaded);
            return uploadAdapter;
        };
  
        ed.editing.view.document.on('paste', function (eventInfo, data) {
          // console.debug('paste', eventInfo, data)
        });
  
        ed.editing.view.document.on('drop', async function (eventInfo, data) {
          if(data.dataTransfer){
              isUploadingFile.value = true;   
  
              const fileUploads = data.dataTransfer.files.map(function(file, i){
                  const formData = new FormData();
                  const fileType = file.type.substring( 0, 5 );
                  const mimeType = api.attachments.getMimeType(file);   
  
                  if(fileType == "image")
                      return;
                  if (api.attachments.mimeTypeWhitelist().indexOf(mimeType) < 0) {   
                      alert("File type not supported: " + mimeType + "(" + file.name + ")");
                      return;
                  }
  
                  formData.append('file', file);
                  return api.attachments.uploadTempFile(props.identifier, file, file.name)   
                      .then(function(success) {
                          const viewFragment = ed.data.processor.toView('<span class="me-2">&nbsp;<a rel="noopener noreferrer" target="_blank" href="'+success.url+'">'+success.filename+ '</a>&nbsp;</span>' );
                          const modelFragment = ed.data.toModel(viewFragment);
                          ed.model.insertContent( modelFragment);
                          onFileUpload({file:success});   
                      })
                      .catch(e=>{
                          uploadErrors.push({file:file.name });   
                          useLogger().error(e);
                      })
              });
  
              try{
                  await Promise.all(fileUploads);
              }
              catch(e){
                  useLogger().error(e);
                }
              finally{
                  isUploadingFile.value = false;   
                }            }
        });
  
        ed.model.document.on('change:data', function (eventInfo, data) {
          // console.debug('change', eventInfo, data)
        });
  
        function onEditorImageUploaded(eventInfo, name, value, oldValue){
          // console.log((eventInfo, name, value, oldValue))
          //TODO: check why url is not in event args
            if(value.url){
                onFileUpload({file:value});    
            }
        }  
        emit('onEditorReady', ed);      
    };
     
    const onEditorFocus=( event, editor )=> {
        // console.debug( 'Editor focused.', { event, editor } );
        emit('onEditorFocus', event, editor);
    };

    const onEditorBlur=( event, editor ) =>{
        // console.debug( 'Editor blurred.', { event, editor } );
        emit('onEditorBlur', event, editor);
    };

    const onEditorInput=( data, event, editor )=> {       
        emit('onEditorInput', event, editor);     
    };
    
    const  onEditorDestroy=( editor )=> {
        // console.debug( 'Editor destroyed.', { editor } );
        emit('onEditorDestroy', editor);
    };
    
    const onFileUpload=(params)=>{
        emit('onFileUpload', params);
    };

    const editorConfig = Vue.computed(()=>{     
          return {
            ...props.config,  
            language: { ui: locale, content: locale },
            wordCount: {
                onUpdate: function (stats) {
                    wordCount.value = stats.words;
                },
            }
        }          
    });
 
  
  
return (_ctx, _cache) => {
  return (Vue.openBlock(), Vue.createElementBlock("div", null, [
    (editorConfig.value)
      ? (Vue.openBlock(), Vue.createElementBlock("div", _hoisted_1$2, [
          Vue.createCommentVNode(" <overlay-loading :active=\"isUploadingFile\" \r\n          :can-cancel=\"false\" background-color=\"rgb(9 9 9)\"\r\n          :is-full-page=\"false\">\r\n          <km-spinner size=\"lg\" \r\n              :message=\"t('uploadingFile')\"></km-spinner>\r\n      </overlay-loading>\r\n   "),
          Vue.createVNode(Vue.unref(ckeditor), {
            modelValue: binding.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((binding).value = $event)),
            editor: Vue.unref(editor),
            config: editorConfig.value,
            tagName: __props.tagName,
            disabled: _ctx.$attrs.disabled,
            onReady: onEditorReady,
            onFocus: onEditorFocus,
            onBlur: onEditorBlur,
            onInput: onEditorInput,
            onDestroy: onEditorDestroy
          }, null, 8 /* PROPS */, ["modelValue", "editor", "config", "tagName", "disabled"])
        ]))
      : Vue.createCommentVNode("v-if", true),
    Vue.createElementVNode("p", _hoisted_2$2, [
      Vue.createTextVNode(Vue.toDisplayString(Vue.unref(t)('attachmentMessage')) + " ", 1 /* TEXT */),
      Vue.createElementVNode("span", _hoisted_3$2, [
        Vue.createElementVNode("strong", null, Vue.toDisplayString(Vue.unref(t)('wordCount')) + ": " + Vue.toDisplayString(wordCount.value), 1 /* TEXT */)
      ])
    ]),
    (uploadErrors.length)
      ? (Vue.openBlock(), Vue.createElementBlock("p", _hoisted_4$2, [
          Vue.createElementVNode("div", _hoisted_5$2, [
            Vue.createTextVNode(Vue.toDisplayString(Vue.unref(t)('uploadError')) + " ", 1 /* TEXT */),
            Vue.createElementVNode("ul", null, [
              (Vue.openBlock(), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(uploadErrors, (error) => {
                return Vue.createElementVNode("li", { key: error }, Vue.toDisplayString(error.file), 1 /* TEXT */)
              }), 64 /* STABLE_FRAGMENT */))
            ])
          ])
        ]))
      : Vue.createCommentVNode("v-if", true)
  ]))
}
}

};

script$2.__file = "src/components/inputs/ck-editor/ck-editor.vue";

function lstring(ltext, locale) {
  
    if(Number.isInteger(ltext)) //is number to handle generic implementation of NR
      return ltext;
  
    if (!ltext)
      return "";
    if (typeof(ltext) == 'string')
      return ltext;
    let sText="";
    if (!sText && locale)
      sText = ltext[locale];
    if (!sText)
      sText = ltext.en;
    if (!sText) {
      var normalized = normalizeText(ltext);
      if(normalized[locale])
        return normalized[locale];

      for (var key in ltext) {
        sText = ltext[key];
        if (sText)
          break;
      }
    }
    return sText || "";
}


function normalizeText(text) {
  if(!text) return null;

  var entry = { ar: text.ar, en: text.en, es: text.es, fr: text.fr, ru: text.ru, zh: text.zh };

  if(!entry.en) entry.en = entry.fr;
  if(!entry.en) entry.en = entry.es;
  if(!entry.en) entry.en = entry.ru;
  if(!entry.en) entry.en = entry.ar;
  if(!entry.en) entry.en = entry.zh;

  if(!entry.fr) entry.fr = entry.en;
  if(!entry.es) entry.es = entry.en;
  if(!entry.ru) entry.ru = entry.en;
  if(!entry.ar) entry.ar = entry.en;
  if(!entry.zh) entry.zh = entry.en;
  return entry;
}

const allPluginsConfig= {  
     toolbar: {
            items: ['heading', 'fontSize', 'fontColor', '|', 'bold', 'italic', 'link', '|',
            'indent', 'outdent', 'alignment', '|', 'bulletedList', 'numberedList', 'blockQuote', '|',
            'highlight', 'insertTable', '|', 'imageInsert', 'mediaEmbed', '|', 'horizontalLine', '|',
            'removeFormat', 'undo', 'redo', '|', 'pageBreak'],
            shouldNotGroupWhenFull: true
        },
        alignment: { options: ['left', 'right', 'center', 'justify'] },
        fontColor: {
            colors: [
            { color: 'hsl(0, 0%, 0%)', label: 'Black' },
            { color: 'hsl(0, 0%, 30%)', label: 'Dim grey' },
            { color: 'hsl(0, 0%, 60%)', label: 'Grey' },
            { color: 'hsl(0, 0%, 90%)', label: 'Light grey' },
            { color: 'hsl(0, 0%, 100%)', label: 'White', hasBorder: true }
            ],
        },
        list: { properties: { styles: true, startIndex: true, reversed: true } },
        image: {
            styles: ['alignCenter', 'alignLeft', 'alignRight'],
            resizeOptions: [
                            { name: 'imageResize:original', label: 'Original', value: null },
                            { name: 'imageResize:25', label: '25%', value: '25' },
                            { name: 'imageResize:50', label: '50%', value: '50' },
                            { name: 'imageResize:75', label: '75%', value: '75' },
                            ],
            toolbar: ['imageTextAlternative', 'toggleImageCaption', '|',
                    'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText',
                    'imageStyle:side', '|', 'resizeImage'],
            insert: { integrations: ['insertImageViaUrl'] },
        },
        heading: {
            options: [{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                      { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                      { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                      { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }],
        },
        fontSize: {
            options: [8, 10, 12, 14, 'default', 18, 20, 22],
            supportAllValues: true,
        },
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties', 'toggleTableCaption']
        },
        link: {
            addTargetToExternalLinks: false,
            defaultProtocol: 'https://',
            decorators: [
            { mode: 'manual', label: 'Downloadable', attributes: { download: 'download', }, },
            { mode: 'manual', label: 'Open in a new tab', attributes: { target: '_blank', rel: 'noopener noreferrer', }, },
            ],
        },
        mediaEmbed: {
            previewsInData: false,
            removeProviders: ['youtube'],
            extraProviders: [
            {
                name: 'youtubePlaylist',
                url: [/^youtube\.com\/embed\/videoseries\?list=([\w-]+)/],
                html: (match) => {
                const id = match[1];
    
                return (
                    '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' +
                    `<iframe src="https://www.youtube.com/embed/videoseries?list=${id}" ` +
                    'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
                    'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
                    '</iframe>' +
                    '</div>'
                )
                },
            },
            {
                name: 'youtube',
                url: [
                /^(?:m\.)?youtube\.com\/watch\?v=([\w-]+)/,
                /^(?:m\.)?youtube\.com\/v\/([\w-]+)/,
                /^youtube\.com\/embed\/([\w-]+)/,
                /^youtu\.be\/([\w-]+)/,
                ],
                html: (match) => {
                const id = match[1];
    
                return (
                    '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' +
                    `<iframe src="https://www.youtube.com/embed/${id}" ` +
                    'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
                    'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
                    '</iframe>' +
                    '</div>'
                )
                },
            },
            {
                name: 'customEmbed',
                url: [
                /cdn\.knightlab\.com\/libs\/timeline3\/.*/,
                /uploads\.knightlab\.com\/storymapjs\/.*/,
                /cdn\.knightlab\.com\/libs\/juxtapose\/.*/,
                /uploads\.knightlab\.com\/scenevr\/.*/,
                /cdn\.knightlab\.com\/libs\/storyline\/.*/,
                /theydrawit\.mucollective\.co\/vis\/.*/,
                /youtube\.com\/embed\/videoseries.*/,
                ],
                html: function (id) {
                return (
                    '<figure class="media">' + '	<oembed url="' + id.input + '">' +
                    '<a href="' + id.input + '">' + id.input + '</a>' + '	</oembed>' + '</figure>'
                )
                },
            },
            ],
        }      
};

const _hoisted_1$1 = { class: "scbd-common km-input-rich-lstring" };
const _hoisted_2$1 = ["id"];
const _hoisted_3$1 = { class: "nav nav-tabs" };
const _hoisted_4$1 = ["id"];
const _hoisted_5$1 = ["onClick"];
const _hoisted_6$1 = ["aria-labelledby", "id"];
  
  
    
var script$1 = {
  __name: 'km-input-rich-lstring',
  props: /*#__PURE__*/Vue.mergeModels({
        locales:    { type: Array,    required: true  }, 
        disabled:   { type: Boolean,  required: false },
        identifier: { type: String,   required: true  }
    }, {
    "modelValue": { type: Object, required: false, default:{}},
    "modelModifiers": {},
  }),
  emits: /*#__PURE__*/Vue.mergeModels(['update:modelValue', 'onFileUpload', 'onLanguageFocus'], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {

    const model = Vue.useModel(__props, "modelValue");
  
    const props = __props;

    const emit = __emit;

    const activeLocale = Vue.ref('');
    const uid = index.makeSmallUid();  

    Vue.watch(props.locales,  (newVal, oldVal) => {
        const deleted = _.without(oldVal, ...newVal);
        if(deleted?.length){      
            deleted.forEach(e=>{
                binding.value[e] = undefined;
            });
            onChange();
        }
        if(!newVal.includes(activeLocale.value)){        
        onTabChange(newVal[0]);
        }
        loadLanguages();
    });     

    const  binding  = Vue.computed(()=>{
        return model.value||{};
    });
     
    const selectedLocale  = Vue.computed(()=>{           
        return activeLocale.value;
    });

    const onChange=(value)=>{
        const clean = removeEmpty({...binding.value}); 
        emit('update:modelValue', clean);
    };

    const onFileUpload=({file})=>{
        emit('onFileUpload', {file, locale : activeLocale.value});
    };

    const loadLanguages=()=>{   
        const thesaurusService  = thesaurus.useThesaurus();
        props.locales?.forEach(e=>{
            thesaurusService.loadDomainTerms (`lang-${e}`);
        });   
    };

    const  getTerm=(term)=>{     
        const thesaurusService  = thesaurus.useThesaurus();
        return thesaurusService.getDomainTerms(`lang-${term}`)||{};
    };

    const  onTabChange=(locale)=>{
        activeLocale.value = locale;
        emit('onLanguageFocus', locale);
   }; 

    Vue.onMounted(() => {
        activeLocale.value =props.locales[0];        
        if(model.value){
            binding.value = {...model.value||{}};
        }
        loadLanguages();
    }); 

return (_ctx, _cache) => {
  return (Vue.openBlock(), Vue.createElementBlock("div", _hoisted_1$1, [
    Vue.createElementVNode("div", {
      id: `km-rich-lstring-${Vue.unref(uid)}`
    }, [
      Vue.createElementVNode("ul", _hoisted_3$1, [
        (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(props.locales, (locale) => {
          return (Vue.openBlock(), Vue.createElementBlock("li", {
            class: "nav-item",
            key: locale,
            id: `lstringTab-${Vue.unref(uid)}`
          }, [
            Vue.createElementVNode("a", {
              class: Vue.normalizeClass(["nav-link", {'active': selectedLocale.value === locale}]),
              "aria-current": "page",
              href: "javascript:void(0);",
              onClick: $event => (onTabChange(locale))
            }, Vue.toDisplayString(Vue.unref(lstring)(getTerm(locale).title||locale)), 11 /* TEXT, CLASS, PROPS */, _hoisted_5$1)
          ], 8 /* PROPS */, _hoisted_4$1))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(__props.locales, (locale) => {
        return (Vue.openBlock(), Vue.createElementBlock("div", {
          class: Vue.normalizeClass(["mt-2", {'d-none': selectedLocale.value != locale}]),
          "aria-labelledby": `tabContent-${locale}-${Vue.unref(uid)}`,
          key: locale,
          id: `lstringTabContent-${Vue.unref(uid)}`
        }, [
          (selectedLocale.value==locale)
            ? (Vue.openBlock(), Vue.createBlock(script$2, {
                key: 0,
                modelValue: binding.value[selectedLocale.value],
                "onUpdate:modelValue": [
                  _cache[0] || (_cache[0] = $event => ((binding.value[selectedLocale.value]) = $event)),
                  onChange
                ],
                identifier: __props.identifier,
                locale: selectedLocale.value,
                config: Vue.unref(allPluginsConfig),
                onOnFileUpload: onFileUpload
              }, null, 8 /* PROPS */, ["modelValue", "identifier", "locale", "config"]))
            : Vue.createCommentVNode("v-if", true)
        ], 10 /* CLASS, PROPS */, _hoisted_6$1))
      }), 128 /* KEYED_FRAGMENT */))
    ], 8 /* PROPS */, _hoisted_2$1)
  ]))
}
}

};

script$1.__file = "src/components/controls/km/km-input-rich-lstring.vue";

const _hoisted_1 = /*#__PURE__*/Vue.createElementVNode("h3", null, "CBD controls components", -1 /* HOISTED */);
const _hoisted_2 = { class: "btn-group" };
const _hoisted_3 = ["onClick"];
const _hoisted_4 = /*#__PURE__*/Vue.createElementVNode("i", { class: "bi bi-trash" }, null, -1 /* HOISTED */);
const _hoisted_5 = /*#__PURE__*/Vue.createElementVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6 = /*#__PURE__*/Vue.createElementVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_7 = /*#__PURE__*/Vue.createElementVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_8 = /*#__PURE__*/Vue.createElementVNode("p", null, null, -1 /* HOISTED */);
const _hoisted_9 = /*#__PURE__*/Vue.createElementVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_10 = /*#__PURE__*/Vue.createElementVNode("input", {
  name: "government-input",
  class: "form-control"
}, null, -1 /* HOISTED */);
const _hoisted_11 = /*#__PURE__*/Vue.createElementVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_12 = /*#__PURE__*/Vue.createElementVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_13 = /*#__PURE__*/Vue.createElementVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_14 = /*#__PURE__*/Vue.createElementVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_15 = /*#__PURE__*/Vue.createElementVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_16 = /*#__PURE__*/Vue.createElementVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_17 = /*#__PURE__*/Vue.createElementVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_18 = /*#__PURE__*/Vue.createElementVNode("p", null, null, -1 /* HOISTED */);
const _hoisted_19 = /*#__PURE__*/Vue.createElementVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_20 = /*#__PURE__*/Vue.createElementVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_21 = /*#__PURE__*/Vue.createElementVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_22 = /*#__PURE__*/Vue.createElementVNode("form", {
  class: "mx-auto",
  style: {"width":"18rem"}
}, [
  /*#__PURE__*/Vue.createElementVNode("div", { class: "form-group" }, [
    /*#__PURE__*/Vue.createElementVNode("label", { for: "exampleInputEmail1" }, "Email address"),
    /*#__PURE__*/Vue.createElementVNode("input", {
      type: "email",
      class: "form-control",
      id: "exampleInputEmail1",
      "aria-describedby": "emailHelp",
      placeholder: "Enter email"
    })
  ]),
  /*#__PURE__*/Vue.createElementVNode("div", { class: "form-group" }, [
    /*#__PURE__*/Vue.createElementVNode("label", { for: "exampleInputPassword1" }, "Password"),
    /*#__PURE__*/Vue.createElementVNode("input", {
      type: "password",
      class: "form-control",
      id: "exampleInputPassword1",
      placeholder: "Password"
    })
  ]),
  /*#__PURE__*/Vue.createElementVNode("button", {
    type: "submit",
    class: "btn btn-primary"
  }, "Submit")
], -1 /* HOISTED */);
const _hoisted_23 = /*#__PURE__*/Vue.createElementVNode("div", {
  class: "card mx-auto my-2",
  style: {"width":"18rem"}
}, [
  /*#__PURE__*/Vue.createElementVNode("div", { class: "card-body" }, [
    /*#__PURE__*/Vue.createElementVNode("h5", { class: "card-title" }, "Card title"),
    /*#__PURE__*/Vue.createElementVNode("h6", { class: "card-subtitle mb-2 text-muted" }, "Card subtitle"),
    /*#__PURE__*/Vue.createElementVNode("p", { class: "card-text" }, "Some quick example text to build on the card title and make up the bulk of the card's content."),
    /*#__PURE__*/Vue.createElementVNode("a", {
      href: "#",
      class: "card-link"
    }, "Card link"),
    /*#__PURE__*/Vue.createElementVNode("a", {
      href: "#",
      class: "card-link"
    }, "Another link")
  ])
], -1 /* HOISTED */);
const _hoisted_24 = /*#__PURE__*/Vue.createElementVNode("code", null, /*#__PURE__*/Vue.toDisplayString(`<spinner></spinner>`), -1 /* HOISTED */);
const _hoisted_25 = /*#__PURE__*/Vue.createElementVNode("code", null, /*#__PURE__*/Vue.toDisplayString(`<spinner-modal :visible="true" title="Title" message="Please wait"></spinner-modal>`), -1 /* HOISTED */);
const _hoisted_26 = /*#__PURE__*/Vue.createElementVNode("code", null, /*#__PURE__*/Vue.toDisplayString(` <km-input-rich-lstring :locales="locales" v-model="richLstringModel"></km-input-rich-lstring>`), -1 /* HOISTED */);

    const label = "language";
    const placeholder = "please select one";
    const trackBy = "name";
    const valueKey = "name";
    const multiple= true;
    const openDirection = ""; 
    const searchable="true";    
    const disabled=false;   
    
var script = {
  __name: 'preview',
  setup(__props) {

    const kmValueTermsModel = [
            {
                identifier:"lang-ar"
            },
            {
                identifier:"lang-zh"
            },
            {
                identifier:"lang-ru"
            },
        ];

    const kmTermModel = {
            identifier:"lang-zh"
        };
    const kmLocalesModel = Vue.ref('zh');
   
    const kmInputLStringModel = Vue.ref({});
    const locales = Vue.ref(["en", "fr", 'zh', 'ru']);
    const kmInitializeTerm = Vue.ref(null);
    const activeTab = Vue.ref(0);

    const onTermLoad = function(term){
        kmInitializeTerm.value = term;
        // thesaurusStore.loadTerm(`lang-${term}`);
    };

    const linkEditorRef = Vue.shallowRef();
    const fileUploadEditorRef = Vue.shallowRef();
    const kmAddLinkModel1 = Vue.ref([ { "url": "http://cbd.int", "name": "CBD website", "language": "en" } ]);
    const kmAddLinkModel2 = Vue.ref([ ]);
    const kmAddFileModel1 = Vue.ref([ { "url": "http://api.cbd.int/api/2013", "name": "report.pdf", "language": "en" ,tag:"Biodiversity"} ]);
    const kmAddFileModel2 = Vue.ref([ { "url": "http://api.cbd.int/api/2013", "name": "report.pdf", "language": "en" ,tag:"Biodiversity"} ]);
    const links = Vue.ref([
        { "url": "http://cbd.int", "name": "CBD website", "language": "en" ,tag:"Biodiversity"},
        { "url": "http://cbd.int", "name": "CBD website", "language": "en" ,tag:"Biodiversity"},
        { "url": "http://cbd.int", "name": "CBD website", "language": "en" ,tag:"Biodiversity"}]);
  
     const validationReview = {
        "identifier": "4DE6D968-FBB4-135A-3D23-DA52FB705939",
        "schema": "authority",
        "locales": [
            "en"
        ],
        "title": {},
        "summary": {},
        "errors": [
            {
            "code": "Error.Mandatory",
            "property": "government"
            },
            {
            "code": "Error.Mandatory",
            "property": "name"
            },
            {
            "code": "Error.Mandatory",
            "property": "city"
            },
            {
            "code": "Error.Mandatory",
            "property": "country"
            },
            {
            "code": "Error.Mandatory",
            "property": "phones"
            },
            {
            "code": "Error.Mandatory",
            "property": "emails"
            },
            {
            "code": "Error.Mandatory",
            "property": "responsibleForAll"
            }
        ]
    };

    const removeLocale = (index) => {
        locales.value.splice(index, 1);
    };
    
    const isValid = (name)=>{
        console.log(name);
        return !!validationReview?.errors?.find(e=>e.property == name)
    };

    // link Editor   
    const newLink = Vue.ref({url: 'https://cbd.int', name: 'CDB website', language: 'es'}); 

    const showLinkEditor = ()=>{
        linkEditorRef.value.show(newLink.value);
    };  
    function onLinkEditorClose(newValue) {    
        newLink.value = newValue;     
    }

    // file upload editor
    const newFile = Vue.ref({url: 'https://api/cbd.int/api/2013', name: 'report.pdf', language: 'en', tag : "Biodiversity"}); 
    const showFileUploadEditor=() =>{
        fileUploadEditorRef.value.show(newFile.value);
    };

    function onFileUploadEditorClose(newValue) {    
        newFile.value = newValue;    
    }

    const onChangeCurrentTab = (index) => {
        activeTab.value = index;
    };

   
    Vue.onMounted(()=>{
        
    });
    Vue.onBeforeMount(()=>{
        Vue.provide("validationReview", {
            isValid
        });
    });
    // for select-file-button
    let files = Vue.ref([]);
    const receiveFile = (receiveFiles) => {
        if (receiveFiles instanceof Array) {
            files.value = receiveFiles;   
        }
        else {
        if (receiveFiles instanceof Object){         
            files.value=[receiveFiles];   
        }   }      

    };

   
    // for multi-selector            
    const customLabel =(item)=>{
        return item.name + '-' + item.language;
    };     
    const selectedItem= Vue.ref("");
    const options= [
        { name: 'Vue.js', language: 'JavaScript' },
        { name: 'Rails', language: 'Ruby' },
        { name: 'Sinatra', language: 'Ruby' },
        { name: 'Laravel', language: 'PHP', $isDisabled: true },
        { name: 'Phoenix', language: 'Elixir' }
    ];

    // km-input-rich-lstring
    const richLstringModel = Vue.ref({});
   

return (_ctx, _cache) => {
  const _component_select_file_button = Vue.resolveComponent("select-file-button");

  return (Vue.openBlock(), Vue.createElementBlock("div", null, [
    _hoisted_1,
    Vue.createVNode(script$a, { "card-header": "Available locales" }, {
      left: Vue.withCtx(() => [
        Vue.createElementVNode("div", _hoisted_2, [
          (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(locales.value, (locale, index) => {
            return (Vue.openBlock(), Vue.createElementBlock("button", {
              class: "btn btn-danger",
              key: locale,
              onClick: $event => (removeLocale(index))
            }, [
              _hoisted_4,
              Vue.createTextVNode(" " + Vue.toDisplayString(locale), 1 /* TEXT */)
            ], 8 /* PROPS */, _hoisted_3))
          }), 128 /* KEYED_FRAGMENT */))
        ])
      ]),
      right: Vue.withCtx(() => [
        Vue.createTextVNode(Vue.toDisplayString(`<button class="btn btn-danger" v-for="(locale, index) in locales" :key="locale" @click="removeLocale(index)">
                    <i class="bi bi-trash"></i></button> `), 1 /* TEXT */)
      ]),
      _: 1 /* STABLE */
    }),
    Vue.createVNode(script$a, { "card-header": "Link editor" }, {
      left: Vue.withCtx(() => [
        Vue.createElementVNode("button", {
          class: "btn btn-default",
          onClick: _cache[0] || (_cache[0] = $event => (showLinkEditor()))
        }, "Show Link editor"),
        Vue.createVNode(script$m, {
          ref_key: "linkEditorRef",
          ref: linkEditorRef,
          onOnClose: onLinkEditorClose
        }, null, 512 /* NEED_PATCH */),
        Vue.createTextVNode(" " + Vue.toDisplayString(newLink.value), 1 /* TEXT */)
      ]),
      right: Vue.withCtx(() => [
        Vue.createTextVNode(" <button class=\"btn btn-default\" @click=\"showLinkEditor()\">Show Link editor</button> <link-editor ref=\"linkEditorRef\" @close=\"onLinkEditorClose\"></link-editor> ")
      ]),
      _: 1 /* STABLE */
    }),
    Vue.createVNode(script$a, { "card-header": "Km view links" }, {
      left: Vue.withCtx(() => [
        Vue.createVNode(script$n, {
          modelValue: links.value,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((links).value = $event)),
          onOnEdit: _cache[2] || (_cache[2] = $event => (_ctx.edit($event))),
          onOnDelete: _cache[3] || (_cache[3] = $event => (_ctx.remove($event)))
        }, null, 8 /* PROPS */, ["modelValue"])
      ]),
      right: Vue.withCtx(() => [
        Vue.createTextVNode(" <km-view-links v-model=\"links\" @on-edit = \"edit($event)\" @on-delete = \"remove($event)\"></km-view-links> ")
      ]),
      _: 1 /* STABLE */
    }),
    Vue.createVNode(script$a, { "card-header": "Km value bool" }, {
      left: Vue.withCtx(() => [
        Vue.createVNode(script$h, {
          value: "true",
          locale: "en"
        })
      ]),
      right: Vue.withCtx(() => [
        Vue.createTextVNode(Vue.toDisplayString(`<km-value-bool value="true" locale="en"></km-value-bool>`))
      ]),
      _: 1 /* STABLE */
    }),
    Vue.createVNode(script$a, { "card-header": "KmInputLString" }, {
      left: Vue.withCtx(() => [
        Vue.createVNode(script$o, {
          modelValue: kmInputLStringModel.value,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((kmInputLStringModel).value = $event)),
          locales: locales.value,
          placeholder: "Please enter ..."
        }, null, 8 /* PROPS */, ["modelValue", "locales"]),
        _hoisted_5,
        Vue.createTextVNode(" " + Vue.toDisplayString(kmInputLStringModel.value), 1 /* TEXT */)
      ]),
      right: Vue.withCtx(() => [
        Vue.createElementVNode("code", null, Vue.toDisplayString(`<km-input-lstring v-model="kmInputLStringModel" :locales="locales" placeholder="Please enter ..." >
                    </km-input-lstring>`), 1 /* TEXT */)
      ]),
      _: 1 /* STABLE */
    }),
    Vue.createVNode(script$a, { "card-header": "KmInputLString " }, {
      left: Vue.withCtx(() => [
        Vue.createVNode(script$o, {
          modelValue: kmInputLStringModel.value,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((kmInputLStringModel).value = $event)),
          locales: locales.value,
          rows: "5",
          placeholder: "Please enter ..."
        }, null, 8 /* PROPS */, ["modelValue", "locales"]),
        _hoisted_6,
        Vue.createTextVNode(" " + Vue.toDisplayString(kmInputLStringModel.value), 1 /* TEXT */)
      ]),
      right: Vue.withCtx(() => [
        Vue.createElementVNode("code", null, Vue.toDisplayString(`<km-input-lstring v-model="kmInputLStringModel" :locales="locales"  rows="5" placeholder="Please enter ..." >
                    </km-input-lstring>`), 1 /* TEXT */)
      ]),
      _: 1 /* STABLE */
    }),
    Vue.createVNode(script$a, { "card-header": "Add Link" }, {
      left: Vue.withCtx(() => [
        Vue.createVNode(script$l, {
          modelValue: kmAddLinkModel1.value,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((kmAddLinkModel1).value = $event))
        }, null, 8 /* PROPS */, ["modelValue"]),
        Vue.createTextVNode("Parent links : " + Vue.toDisplayString(kmAddLinkModel1.value) + " ", 1 /* TEXT */),
        _hoisted_7
      ]),
      right: Vue.withCtx(() => [
        Vue.createTextVNode(" <km-add-link/> ")
      ]),
      _: 1 /* STABLE */
    }),
    Vue.createVNode(script$a, { "card-header": "Add Websites" }, {
      left: Vue.withCtx(() => [
        Vue.createVNode(script$l, {
          modelValue: kmAddLinkModel2.value,
          "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((kmAddLinkModel2).value = $event))
        }, {
          "link-button-label": Vue.withCtx(() => [
            Vue.createTextVNode(" Add Websites ")
          ]),
          "link-dialog-title": Vue.withCtx(() => [
            Vue.createTextVNode(" My custom title ")
          ]),
          "links-view": Vue.withCtx(() => [
            _hoisted_8
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["modelValue"]),
        Vue.createTextVNode(" Parent links : " + Vue.toDisplayString(kmAddLinkModel2.value) + " ", 1 /* TEXT */),
        _hoisted_9
      ]),
      right: Vue.withCtx(() => [
        Vue.createTextVNode(" <km-add-link> <template #link-button-label> Add Websites </template> <template #link-dialog-title> my custom title </template> <template #links-view> <p> </p> </template> </km-add-link> ")
      ]),
      _: 1 /* STABLE */
    }),
    Vue.createVNode(script$a, { "card-header": "Km form group" }, {
      left: Vue.withCtx(() => [
        Vue.createVNode(script$j, {
          required: "",
          name: "government",
          caption: "SCBD Control help",
          "help-content": "This is a preview of simple help, it also supports <h3>html</h3>"
        }, {
          default: Vue.withCtx(() => [
            _hoisted_10
          ]),
          _: 1 /* STABLE */
        })
      ]),
      right: Vue.withCtx(() => [
        Vue.createTextVNode(Vue.toDisplayString(` <km-form-group required name="government" caption="SCBD Control help" help-content="This is a preview of simple help, it also supports <h3>html</h3>">
                    <input name="government-input" class="form-control" />
                </km-form-group>    `) + " "),
        _hoisted_11,
        _hoisted_12,
        Vue.createVNode(_component_select_file_button, {
          multiple: "",
          onOnFileSelected: receiveFile
        }, {
          default: Vue.withCtx(() => [
            Vue.renderSlot(_ctx.$slots, "file-button-label", {}, () => [
              Vue.createTextVNode("+ Add Multiple File")
            ])
          ]),
          _: 3 /* FORWARDED */
        }),
        _hoisted_13,
        _hoisted_14,
        Vue.createVNode(_component_select_file_button, { onOnFileSelected: receiveFile }, {
          default: Vue.withCtx(() => [
            Vue.renderSlot(_ctx.$slots, "file-button-label", {}, () => [
              Vue.createTextVNode("+ Add File")
            ])
          ]),
          _: 3 /* FORWARDED */
        }),
        (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(Vue.unref(files), (item, index) => {
          return (Vue.openBlock(), Vue.createElementBlock("div", { key: index }, Vue.toDisplayString(item.name), 1 /* TEXT */))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      _: 3 /* FORWARDED */
    }),
    Vue.createVNode(script$a, { "card-header": "Km lstring value" }, {
      left: Vue.withCtx(() => [
        Vue.createVNode(script$i, {
          value: "Test Value",
          locale: "en"
        })
      ]),
      right: Vue.withCtx(() => [
        Vue.createTextVNode(Vue.toDisplayString(`<km-lstring-value value="Test Value" locale="en"></km-lstring-value>`))
      ]),
      _: 1 /* STABLE */
    }),
    Vue.createVNode(script$a, { "card-header": "Km Value" }, {
      left: Vue.withCtx(() => [
        Vue.createVNode(script$g, { value: "Test Value" })
      ]),
      right: Vue.withCtx(() => [
        Vue.createTextVNode(Vue.toDisplayString(`<km-value value="Test Value"></km-value>`))
      ]),
      _: 1 /* STABLE */
    }),
    Vue.createVNode(script$a, { "card-header": "Km Locales" }, {
      left: Vue.withCtx(() => [
        Vue.createTextVNode(Vue.toDisplayString(kmLocalesModel.value) + " ", 1 /* TEXT */),
        Vue.createVNode(script$f, {
          locales: locales.value,
          modelValue: kmLocalesModel.value,
          "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => ((kmLocalesModel).value = $event))
        }, null, 8 /* PROPS */, ["locales", "modelValue"])
      ]),
      right: Vue.withCtx(() => [
        Vue.createTextVNode(Vue.toDisplayString(`<km-locales :locales="locales" v-model="kmLocalesModel"></km-locales>`))
      ]),
      _: 1 /* STABLE */
    }),
    Vue.createVNode(script$a, { "card-header": "Km Term" }, {
      left: Vue.withCtx(() => [
        Vue.createTextVNode(Vue.toDisplayString(kmInitializeTerm.value) + " ", 1 /* TEXT */),
        Vue.createVNode(script$e, {
          value: kmTermModel,
          locale: kmLocalesModel.value,
          onOnTermLoad: onTermLoad
        }, null, 8 /* PROPS */, ["locale"])
      ]),
      right: Vue.withCtx(() => [
        Vue.createTextVNode(Vue.toDisplayString(`<km-term
                    :value="kmTermModel" :locale="kmLocalesModel" @on-term-load="onTermLoad"                                           
                    >
                </km-term>`))
      ]),
      _: 1 /* STABLE */
    }),
    Vue.createVNode(script$a, { "card-header": "Km value term" }, {
      left: Vue.withCtx(() => [
        Vue.createTextVNode(Vue.toDisplayString(kmTermModel) + " - " + Vue.toDisplayString(kmLocalesModel.value) + " ", 1 /* TEXT */),
        Vue.createVNode(script$c, {
          value: kmTermModel,
          locale: kmLocalesModel.value
        }, null, 8 /* PROPS */, ["locale"])
      ]),
      right: Vue.withCtx(() => [
        Vue.createTextVNode(Vue.toDisplayString(` <km-value-term
                :value="kmTermModel" :locale="kmLocalesModel"                                          
                >
                </km-value-term>`))
      ]),
      _: 1 /* STABLE */
    }),
    Vue.createVNode(script$a, { "card-header": "File Upload Editor" }, {
      left: Vue.withCtx(() => [
        Vue.createElementVNode("button", {
          class: "btn btn-default",
          onClick: _cache[9] || (_cache[9] = $event => (showFileUploadEditor()))
        }, "Show File Upload editor"),
        Vue.createVNode(script$d, {
          ref_key: "fileUploadEditorRef",
          ref: fileUploadEditorRef,
          onOnClose: onFileUploadEditorClose
        }, null, 512 /* NEED_PATCH */),
        Vue.createTextVNode(" " + Vue.toDisplayString(newFile.value), 1 /* TEXT */)
      ]),
      right: Vue.withCtx(() => [
        Vue.createTextVNode(" <button class=\"btn btn-default\" @click=\"showFileUploadEditor()\">Show File Upload editor</button> <file-upload-editor ref=\"fileUploadEditorRef\" @on-close=\"onFileUploadEditorClose\"></file-upload-editor> ")
      ]),
      _: 1 /* STABLE */
    }),
    Vue.createVNode(script$a, { "card-header": "Km value terms" }, {
      left: Vue.withCtx(() => [
        Vue.createVNode(script$b, {
          value: kmValueTermsModel,
          locale: kmLocalesModel.value
        }, null, 8 /* PROPS */, ["locale"]),
        _hoisted_15
      ]),
      right: Vue.withCtx(() => [
        Vue.createTextVNode(Vue.toDisplayString(`<km-value-terms :value="kmValueTermsModel" :locale="kmLocalesModel"></km-value-terms>`))
      ]),
      _: 1 /* STABLE */
    }),
    Vue.createVNode(script$a, { "card-header": "Add File" }, {
      left: Vue.withCtx(() => [
        Vue.createVNode(script$7, {
          modelValue: kmAddFileModel1.value,
          "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => ((kmAddFileModel1).value = $event)),
          multiple: false
        }, null, 8 /* PROPS */, ["modelValue"]),
        _hoisted_16,
        Vue.createTextVNode("Parent links : " + Vue.toDisplayString(kmAddFileModel1.value) + " ", 1 /* TEXT */),
        _hoisted_17
      ]),
      right: Vue.withCtx(() => [
        Vue.createTextVNode(Vue.toDisplayString(`<km-add-file v-model="kmAddFileModel1" :multiple="false"/>`))
      ]),
      _: 1 /* STABLE */
    }),
    Vue.createVNode(script$a, { "card-header": "Add File" }, {
      left: Vue.withCtx(() => [
        Vue.createVNode(script$7, {
          modelValue: kmAddFileModel2.value,
          "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => ((kmAddFileModel2).value = $event))
        }, {
          "link-button-label": Vue.withCtx(() => [
            Vue.createTextVNode(" Add File ")
          ]),
          "link-dialog-title": Vue.withCtx(() => [
            Vue.createTextVNode(" My custom title ")
          ]),
          "links-view": Vue.withCtx(() => [
            _hoisted_18
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["modelValue"]),
        Vue.createTextVNode(" Parent links : " + Vue.toDisplayString(kmAddFileModel2.value) + " ", 1 /* TEXT */),
        _hoisted_19
      ]),
      right: Vue.withCtx(() => [
        Vue.createTextVNode(Vue.toDisplayString(` <km-add-file v-model="kmAddFileModel2" >                                                                  
                    <template #link-button-label>
                        Add File
                    </template>
                    <template #link-dialog-title>
                        My custom title
                    </template>                                  
                    <template #links-view>     
                        <p></p>                                  
                    </template> 
                </km-add-file>`))
      ]),
      _: 1 /* STABLE */
    }),
    Vue.createVNode(script$a, { "card-header": "multi-selector" }, {
      left: Vue.withCtx(() => [
        Vue.createVNode(script$9, {
          modelValue: selectedItem.value,
          "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => ((selectedItem).value = $event)),
          options: options,
          label: label,
          "value-key": valueKey,
          "custom-label": customLabel,
          placeholder: placeholder,
          "track-by": trackBy,
          multiple: multiple,
          disabled: disabled,
          "open-direction": openDirection,
          searchable: searchable,
          onOnSearchChange: _ctx.onSearchChange
        }, null, 8 /* PROPS */, ["modelValue", "onOnSearchChange"]),
        _hoisted_20,
        Vue.createTextVNode("selected: " + Vue.toDisplayString(selectedItem.value) + " ", 1 /* TEXT */),
        _hoisted_21
      ]),
      right: Vue.withCtx(() => [
        Vue.createTextVNode(Vue.toDisplayString(`<multi-selector
                    v-model="selectedItem"       
                    :options="options"
                    :label="label"
                    :value-key="valueKey"
                    :custom-label="customLabel"
                    :placeholder = "placeholder"
                    :track-by = "trackBy"
                    :multiple="multiple"
                    :disabled = "disabled"
                    :open-direction="openDirection" 
                    :searchable="searchable"   
                    @on-search-change="onSearchChange">                                   
                </multi-selector> `))
      ]),
      _: 1 /* STABLE */
    }),
    Vue.createVNode(script$a, { "card-header": "Km Form Wizard Tab Content" }, {
      left: Vue.withCtx(() => [
        Vue.createVNode(script$6, { onOnTabChange: onChangeCurrentTab }, {
          default: Vue.withCtx(() => [
            Vue.createCommentVNode(" Tab 1 "),
            Vue.createVNode(script$5, {
              isActive: activeTab.value === 0,
              title: "Tab 1"
            }, {
              default: Vue.withCtx(() => [
                _hoisted_22
              ]),
              _: 1 /* STABLE */
            }, 8 /* PROPS */, ["isActive"]),
            Vue.createCommentVNode(" End of Tab 1 "),
            Vue.createCommentVNode(" Tab 2 "),
            Vue.createVNode(script$5, {
              isActive: activeTab.value === 1,
              title: "Tab 2"
            }, {
              default: Vue.withCtx(() => [
                _hoisted_23
              ]),
              _: 1 /* STABLE */
            }, 8 /* PROPS */, ["isActive"]),
            Vue.createCommentVNode(" End of Tab 2 ")
          ]),
          _: 1 /* STABLE */
        })
      ]),
      right: Vue.withCtx(() => [
        Vue.createTextVNode(Vue.toDisplayString(`
                    <km-form-wizard-tab-content :isActive="activeTab === 0" title="Tab 1"></km-form-wizard-tab-content>
                `))
      ]),
      _: 1 /* STABLE */
    }),
    Vue.createVNode(script$a, { "card-header": "Spinner" }, {
      left: Vue.withCtx(() => [
        Vue.createVNode(script$4, { variant: "spinner-grow spinner-grow-sm" }, {
          default: Vue.withCtx(() => [
            Vue.createTextVNode("New loading")
          ]),
          _: 1 /* STABLE */
        })
      ]),
      right: Vue.withCtx(() => [
        _hoisted_24
      ]),
      _: 1 /* STABLE */
    }),
    Vue.createVNode(script$a, { "card-header": "spinner modal" }, {
      left: Vue.withCtx(() => [
        Vue.createVNode(script$3, {
          visible: true,
          title: "Title",
          message: "Please wait"
        })
      ]),
      right: Vue.withCtx(() => [
        _hoisted_25
      ]),
      _: 1 /* STABLE */
    }),
    Vue.createVNode(script$a, { "card-header": "km input rich lstring" }, {
      left: Vue.withCtx(() => [
        Vue.createVNode(script$1, {
          locales: locales.value,
          modelValue: richLstringModel.value,
          "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => ((richLstringModel).value = $event))
        }, null, 8 /* PROPS */, ["locales", "modelValue"]),
        Vue.createTextVNode(" data: " + Vue.toDisplayString(richLstringModel.value), 1 /* TEXT */)
      ]),
      right: Vue.withCtx(() => [
        _hoisted_26
      ]),
      _: 1 /* STABLE */
    }),
    Vue.createTextVNode(" - "),
    Vue.createCommentVNode(" <preview-component card-header=\"Link editor\">\r\n            <template #left></template>\r\n            <template #right>\r\n                <code></code>\r\n            </template>\r\n        </preview-component> ")
  ]))
}
}

};

script.__file = "src/components/controls/preview.vue";

module.exports = script;
//# sourceMappingURL=preview.cjs.map
