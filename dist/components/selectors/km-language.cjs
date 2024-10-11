'use strict';

var vue = require('vue');
require('webui-popover');
require('webui-popover/dist/jquery.webui-popover.css');
var $ = require('jquery');
var VueMultiselect = require('vue-multiselect');
var _ = require('lodash');
var i18n = require('@/services/composables/i18n');
var lstring = require('@/services/filters/lstring');
var thesaurus = require('@/services/composables/thesaurus');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var $__default = /*#__PURE__*/_interopDefaultLegacy($);
var VueMultiselect__default = /*#__PURE__*/_interopDefaultLegacy(VueMultiselect);
var ___default = /*#__PURE__*/_interopDefaultLegacy(_);

const _hoisted_1$3 = {
  key: 0,
  class: "bi bi-question-circle-fill"
};
const _hoisted_2$2 = { class: "webui-popover-content" };
const _hoisted_3$1 = ["innerHTML"];


var script$3 = {
  __name: 'km-help',
  props: {
    title: {type:String},
    content: {type:String, required: true}
},
  setup(__props) {

const helpAnchor = vue.ref(null);
const props = __props;
const slots  = vue.useSlots();

vue.onMounted(()=>{    
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

vue.onBeforeUnmount(()=>{
    $__default["default"](helpAnchor.value).webuiPopover('destroy');
});

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
    vue.createElementVNode("span", {
      ref_key: "helpAnchor",
      ref: helpAnchor,
      class: "show-pop",
      "data-animation": "pop"
    }, [
      vue.renderSlot(_ctx.$slots, "default"),
      vue.renderSlot(_ctx.$slots, "icon", {}, () => [
        vue.createTextVNode(vue.toDisplayString(" ")),
        (!vue.unref(slots).icon && !vue.unref(slots).default)
          ? (vue.openBlock(), vue.createElementBlock("i", _hoisted_1$3))
          : vue.createCommentVNode("v-if", true)
      ])
    ], 512 /* NEED_PATCH */),
    vue.createElementVNode("div", _hoisted_2$2, [
      vue.renderSlot(_ctx.$slots, "content", {}, () => [
        vue.createElementVNode("div", { innerHTML: __props.content }, null, 8 /* PROPS */, _hoisted_3$1)
      ])
    ])
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$3.__file = "src/components/controls/view/km-help.vue";

const _hoisted_1$2 = ["id"];
const _hoisted_2$1 = ["for", "name", "required"];


var script$2 = {
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

let reviewError = vue.inject('validationReview');

const hasError    = ()=>{
    return props.name && props.required && reviewError?.isValid(props.name);
};


return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("div", {
    id: _ctx.$attrs.id,
    class: vue.normalizeClass(["scbd-controls km-form-group form-group mb-3", {'has-error':hasError(), 'has-help':__props.helpContent, 'mandatory':__props.required}])
  }, [
    (__props.caption)
      ? (vue.openBlock(), vue.createElementBlock("label", {
          key: 0,
          class: "mb-1 km-form-group-label",
          for: __props.name,
          name: __props.name,
          required: __props.required ? true : null
        }, vue.toDisplayString(__props.caption), 9 /* TEXT, PROPS */, _hoisted_2$1))
      : vue.createCommentVNode("v-if", true),
    (__props.helpContent)
      ? (vue.openBlock(), vue.createBlock(script$3, {
          key: 1,
          title: __props.helpTitle,
          content: __props.helpContent,
          class: "ms-1 me-1"
        }, null, 8 /* PROPS */, ["title", "content"]))
      : vue.createCommentVNode("v-if", true),
    vue.createElementVNode("div", null, [
      vue.renderSlot(_ctx.$slots, "default")
    ])
  ], 10 /* CLASS, PROPS */, _hoisted_1$2))
}
}

};

script$2.__scopeId = "data-v-2d33fbf8";
script$2.__file = "src/components/controls/km-form-group.vue";

function asArray(data) {
    return ___default["default"]([ data ])
      .flatten()
      .compact()
      .value();
}

function sortBy(list, property){    
  //const { locale } = useNuxtApp().$i18n;
  const {t, locale }    = i18n.useI18n();  
  return list.sort((a ,b )=>{
      let valueA = a[property];
      let valueB = b[property];

      if(isLString(valueA)){
          valueA = lstring.lstring(valueA, locale.value);
          valueB = lstring.lstring(valueB, locale.value);
      }

      return valueA.localeCompare(valueB);

  })
}

const _hoisted_1$1 = { slot: "clear" };

var script$1 = {
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
let selectItems = vue.computed({  
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
  return (vue.openBlock(), vue.createBlock(vue.unref(VueMultiselect__default["default"]), {
    modelValue: vue.unref(selectItems),
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (vue.isRef(selectItems) ? (selectItems).value = $event : selectItems = $event)),
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
    default: vue.withCtx(() => [
      vue.renderSlot(_ctx.$slots, "clear", {}, () => [
        vue.createElementVNode("template", _hoisted_1$1, [
          (vue.unref(selectItems).length && !__props.disabled)
            ? (vue.openBlock(), vue.createElementBlock("div", {
                key: 0,
                class: "multiselect__clear",
                onMousedown: _cache[0] || (_cache[0] = vue.withModifiers($event => {vue.isRef(selectItems) ? selectItems.value = null : selectItems = null; _ctx.$emit('change', null);}, ["prevent","stop"]))
              }, null, 32 /* NEED_HYDRATION */))
            : vue.createCommentVNode("v-if", true)
        ])
      ])
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["modelValue", "label", "track-by", "placeholder", "open-direction", "options", "group-values", "group-label", "group-select", "multiple", "clear-on-select", "close-on-select", "searchable", "disabled", "custom-label", "allow-empty"]))
}
}

};

script$1.__file = "src/components/controls/multi-selector.vue";

const THESAURUS = {  
    OTHER_LANGUAGES:'ISO639-2'  
};

const  useI18n = ()=>{
    return {
        t       : (key)=>key,
        locale  : 'en'
    }
};

const languages = {
    "ar" : "العربية",
    "zh" : "中文",
    "en" : "English",
    "es" : "Español",
    "fr" : "Français",
    "ru" : "Русский"
};

const _hoisted_1 = { class: "scbd-common km-language" };
const _hoisted_2 = { class: "form-check" };
const _hoisted_3 = /*#__PURE__*/vue.createElementVNode("label", {
  class: "form-check-label",
  for: "yes"
}, "Yes", -1 /* HOISTED */);
const _hoisted_4 = { class: "form-check" };
const _hoisted_5 = /*#__PURE__*/vue.createElementVNode("label", {
  class: "form-check-label",
  for: "no"
}, "No", -1 /* HOISTED */);
     
    //TODO:add i18m support 
    
var script = {
  __name: 'km-language',
  props: {
    "modelValue": { type: Array,required: true, default: []},
    "modelModifiers": {},
  },
  emits: /*#__PURE__*/vue.mergeModels(['update:modelValue'], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    vue.useModel(__props, "modelValue");  
    const emit  = __emit;    
    const {t, locale }              = useI18n();  
    const otherLanguageOption       = vue.ref(false);  
    const thesaurusService          = thesaurus.useThesaurus();
      
    const selectedLanguages      = vue.ref([]);
    const otherSelectedLanguages = vue.ref([]);
   
    const formattedLanguages      = vue.computed(()=> Object.entries(languages).map(([code, title]) => ({ code, title })));    
    const formattedOtherLanguages = vue.computed(()=>{
        let otherLanguages = thesaurusService.getDomainTerms(THESAURUS.OTHER_LANGUAGES)||[];
        otherLanguages = otherLanguages
                            .filter(e=>!isUNLanguage(e.identifier.replace('lang-', '')))
                            .map(e=>{ 
                                return { code : e.identifier.replace('lang-', ''), title : lstring.lstring(e.title)}
                            });       
     
       return sortBy(otherLanguages, 'title');         
    }); 

    function onChange(code){
        const languages = [...selectedLanguages.value||[], ...otherSelectedLanguages.value||[]];
        emit('update:modelValue', languages);
    }

    function isUNLanguage(code){
        return formattedLanguages.value.find(un=>un.code == code)
    }


return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
    vue.createVNode(script$1, {
      modelValue: selectedLanguages.value,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = $event => ((selectedLanguages).value = $event)),
        onChange
      ],
      label: "title",
      "track-by": "code",
      "value-key": "code",
      options: formattedLanguages.value,
      multiple: true,
      "allow-empty": false,
      placeholder: vue.unref(t)('languageOfRecord')
    }, null, 8 /* PROPS */, ["modelValue", "options", "placeholder"]),
    vue.createVNode(script$2, {
      name: "otherLanguageOption",
      class: "mt-2",
      caption: "Would like to submit this information in any other language(s)?"
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode("div", _hoisted_2, [
          vue.withDirectives(vue.createElementVNode("input", {
            class: "form-check-input",
            type: "radio",
            id: "yes",
            value: true,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((otherLanguageOption).value = $event))
          }, null, 512 /* NEED_PATCH */), [
            [vue.vModelRadio, otherLanguageOption.value]
          ]),
          _hoisted_3
        ]),
        vue.createElementVNode("div", _hoisted_4, [
          vue.withDirectives(vue.createElementVNode("input", {
            class: "form-check-input",
            type: "radio",
            id: "no",
            value: false,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((otherLanguageOption).value = $event))
          }, null, 512 /* NEED_PATCH */), [
            [vue.vModelRadio, otherLanguageOption.value]
          ]),
          _hoisted_5
        ])
      ]),
      _: 1 /* STABLE */
    }),
    (otherLanguageOption.value)
      ? (vue.openBlock(), vue.createBlock(script$2, {
          key: 0,
          name: "otherLanguages",
          class: "mt-2",
          caption: vue.unref(t)('otherLanguage')
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(script$1, {
              modelValue: otherSelectedLanguages.value,
              "onUpdate:modelValue": [
                _cache[3] || (_cache[3] = $event => ((otherSelectedLanguages).value = $event)),
                onChange
              ],
              label: "title",
              "track-by": "code",
              "value-key": "code",
              options: formattedOtherLanguages.value,
              multiple: true,
              "close-on-select": false,
              placeholder: vue.unref(t)('otherLanguageOfRecord')
            }, null, 8 /* PROPS */, ["modelValue", "options", "placeholder"])
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["caption"]))
      : vue.createCommentVNode("v-if", true)
  ]))
}
}

};

script.__file = "src/components/selectors/km-language.vue";

module.exports = script;
//# sourceMappingURL=km-language.cjs.map
