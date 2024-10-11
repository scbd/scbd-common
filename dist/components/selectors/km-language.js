import { ref, useSlots, onMounted, onBeforeUnmount, openBlock, createElementBlock, Fragment, createElementVNode, renderSlot, createTextVNode, toDisplayString, unref, createCommentVNode, inject, normalizeClass, createBlock, computed, isRef, withCtx, withModifiers, mergeModels, useModel, createVNode, withDirectives, vModelRadio } from 'vue';
import 'webui-popover';
import 'webui-popover/dist/jquery.webui-popover.css';
import $ from 'jquery';
import VueMultiselect from 'vue-multiselect';
import _, { isEqual, compact } from 'lodash';
import { useI18n as useI18n$1 } from '@/services/composables/i18n';
import { lstring } from '@/services/filters/lstring';
import { useThesaurus } from '@/services/composables/thesaurus';

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

const helpAnchor = ref(null);
const props = __props;
const slots  = useSlots();

onMounted(()=>{    
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
    
    $ (helpAnchor.value)
        .webuiPopover('destroy')
        .webuiPopover(settings);
});

onBeforeUnmount(()=>{
    $(helpAnchor.value).webuiPopover('destroy');
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createElementVNode("span", {
      ref_key: "helpAnchor",
      ref: helpAnchor,
      class: "show-pop",
      "data-animation": "pop"
    }, [
      renderSlot(_ctx.$slots, "default"),
      renderSlot(_ctx.$slots, "icon", {}, () => [
        createTextVNode(toDisplayString(" ")),
        (!unref(slots).icon && !unref(slots).default)
          ? (openBlock(), createElementBlock("i", _hoisted_1$3))
          : createCommentVNode("v-if", true)
      ])
    ], 512 /* NEED_PATCH */),
    createElementVNode("div", _hoisted_2$2, [
      renderSlot(_ctx.$slots, "content", {}, () => [
        createElementVNode("div", { innerHTML: __props.content }, null, 8 /* PROPS */, _hoisted_3$1)
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

let reviewError = inject('validationReview');

const hasError    = ()=>{
    return props.name && props.required && reviewError?.isValid(props.name);
};


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", {
    id: _ctx.$attrs.id,
    class: normalizeClass(["scbd-controls km-form-group form-group mb-3", {'has-error':hasError(), 'has-help':__props.helpContent, 'mandatory':__props.required}])
  }, [
    (__props.caption)
      ? (openBlock(), createElementBlock("label", {
          key: 0,
          class: "mb-1 km-form-group-label",
          for: __props.name,
          name: __props.name,
          required: __props.required ? true : null
        }, toDisplayString(__props.caption), 9 /* TEXT, PROPS */, _hoisted_2$1))
      : createCommentVNode("v-if", true),
    (__props.helpContent)
      ? (openBlock(), createBlock(script$3, {
          key: 1,
          title: __props.helpTitle,
          content: __props.helpContent,
          class: "ms-1 me-1"
        }, null, 8 /* PROPS */, ["title", "content"]))
      : createCommentVNode("v-if", true),
    createElementVNode("div", null, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 10 /* CLASS, PROPS */, _hoisted_1$2))
}
}

};

script$2.__scopeId = "data-v-2d33fbf8";
script$2.__file = "src/components/controls/km-form-group.vue";

function asArray(data) {
    return _([ data ])
      .flatten()
      .compact()
      .value();
}

function sortBy(list, property){    
  //const { locale } = useNuxtApp().$i18n;
  const {t, locale }    = useI18n$1();  
  return list.sort((a ,b )=>{
      let valueA = a[property];
      let valueB = b[property];

      if(isLString(valueA)){
          valueA = lstring(valueA, locale.value);
          valueB = lstring(valueB, locale.value);
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
let selectItems = computed({  
    get() {
      const selected = asArray(props.modelValue).map((value) => {
        return props.options?.find((option) => {
          const customSelectedItem =props.customSelectedItem(option[props.valueKey], option);
          
          return isEqual(customSelectedItem, value);
        })
      });

      return compact(selected)
    },
    set(events) {
      let ids = asArray(events).map((event) => props.customSelectedItem(event[props.valueKey], event));     
      emit('update:model-value', props.multiple ? ids : ids[0]);
    },
  }
); 

return (_ctx, _cache) => {
  return (openBlock(), createBlock(unref(VueMultiselect), {
    modelValue: unref(selectItems),
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (isRef(selectItems) ? (selectItems).value = $event : selectItems = $event)),
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
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "clear", {}, () => [
        createElementVNode("template", _hoisted_1$1, [
          (unref(selectItems).length && !__props.disabled)
            ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "multiselect__clear",
                onMousedown: _cache[0] || (_cache[0] = withModifiers($event => {isRef(selectItems) ? selectItems.value = null : selectItems = null; _ctx.$emit('change', null);}, ["prevent","stop"]))
              }, null, 32 /* NEED_HYDRATION */))
            : createCommentVNode("v-if", true)
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
const _hoisted_3 = /*#__PURE__*/createElementVNode("label", {
  class: "form-check-label",
  for: "yes"
}, "Yes", -1 /* HOISTED */);
const _hoisted_4 = { class: "form-check" };
const _hoisted_5 = /*#__PURE__*/createElementVNode("label", {
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
  emits: /*#__PURE__*/mergeModels(['update:modelValue'], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    useModel(__props, "modelValue");  
    const emit  = __emit;    
    const {t, locale }              = useI18n();  
    const otherLanguageOption       = ref(false);  
    const thesaurusService          = useThesaurus();
      
    const selectedLanguages      = ref([]);
    const otherSelectedLanguages = ref([]);
   
    const formattedLanguages      = computed(()=> Object.entries(languages).map(([code, title]) => ({ code, title })));    
    const formattedOtherLanguages = computed(()=>{
        let otherLanguages = thesaurusService.getDomainTerms(THESAURUS.OTHER_LANGUAGES)||[];
        otherLanguages = otherLanguages
                            .filter(e=>!isUNLanguage(e.identifier.replace('lang-', '')))
                            .map(e=>{ 
                                return { code : e.identifier.replace('lang-', ''), title : lstring(e.title)}
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
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(script$1, {
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
      placeholder: unref(t)('languageOfRecord')
    }, null, 8 /* PROPS */, ["modelValue", "options", "placeholder"]),
    createVNode(script$2, {
      name: "otherLanguageOption",
      class: "mt-2",
      caption: "Would like to submit this information in any other language(s)?"
    }, {
      default: withCtx(() => [
        createElementVNode("div", _hoisted_2, [
          withDirectives(createElementVNode("input", {
            class: "form-check-input",
            type: "radio",
            id: "yes",
            value: true,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((otherLanguageOption).value = $event))
          }, null, 512 /* NEED_PATCH */), [
            [vModelRadio, otherLanguageOption.value]
          ]),
          _hoisted_3
        ]),
        createElementVNode("div", _hoisted_4, [
          withDirectives(createElementVNode("input", {
            class: "form-check-input",
            type: "radio",
            id: "no",
            value: false,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((otherLanguageOption).value = $event))
          }, null, 512 /* NEED_PATCH */), [
            [vModelRadio, otherLanguageOption.value]
          ]),
          _hoisted_5
        ])
      ]),
      _: 1 /* STABLE */
    }),
    (otherLanguageOption.value)
      ? (openBlock(), createBlock(script$2, {
          key: 0,
          name: "otherLanguages",
          class: "mt-2",
          caption: unref(t)('otherLanguage')
        }, {
          default: withCtx(() => [
            createVNode(script$1, {
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
              placeholder: unref(t)('otherLanguageOfRecord')
            }, null, 8 /* PROPS */, ["modelValue", "options", "placeholder"])
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["caption"]))
      : createCommentVNode("v-if", true)
  ]))
}
}

};

script.__file = "src/components/selectors/km-language.vue";

export { script as default };
//# sourceMappingURL=km-language.js.map
