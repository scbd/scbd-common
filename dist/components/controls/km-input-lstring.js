import { mergeModels, useModel, watch, onMounted, openBlock, createElementBlock, renderSlot, Fragment, renderList, normalizeClass, withDirectives, vModelText, createCommentVNode, createElementVNode, toDisplayString } from 'vue';
import { without } from 'lodash';

const _hoisted_1 = { class: "scbd-controls km-input-lstring" };
const _hoisted_2 = ["placeholder", "onUpdate:modelValue", "dir"];
const _hoisted_3 = ["rows", "placeholder", "onUpdate:modelValue", "dir"];
const _hoisted_4 = { class: "input-group-append" };
const _hoisted_5 = ["title"];

    
var script = {
  __name: 'km-input-lstring',
  props: /*#__PURE__*/mergeModels({
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

    const model = useModel(__props, "modelValue");
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

    watch(()=>props.locales,
      (newVal, oldVal) => {
        const deleted = without(Object.keys(model.value), ...newVal);
        if (deleted?.length) {
          deleted.forEach((e) => {
            model.value[e] = undefined;
          });
        }
        loadLanguages();
      }, {deep:true}
    );

    onMounted(() => {
      loadLanguages();
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    renderSlot(_ctx.$slots, "default"),
    (openBlock(true), createElementBlock(Fragment, null, renderList(__props.locales, (locale) => {
      return (openBlock(), createElementBlock("div", {
        class: normalizeClass(["input-group mb-1", `km-input-lstring-${locale}`]),
        key: locale
      }, [
        (__props.rows==1)
          ? withDirectives((openBlock(), createElementBlock("input", {
              key: 0,
              type: "text",
              class: "form-control",
              placeholder: __props.placeholder,
              "aria-describedby": "lstring-text",
              "onUpdate:modelValue": $event => ((model.value[locale]) = $event),
              dir: locale == 'ar' ? 'rtl' : 'ltr',
              onInput: _cache[0] || (_cache[0] = $event => (_ctx.$emit('update:modelValue', model.value)))
            }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_2)), [
              [vModelText, model.value[locale]]
            ])
          : createCommentVNode("v-if", true),
        (__props.rows>1)
          ? withDirectives((openBlock(), createElementBlock("textarea", {
              key: 1,
              rows: __props.rows,
              class: "form-control",
              placeholder: __props.placeholder,
              "aria-describedby": "lstring-textarea",
              "onUpdate:modelValue": $event => ((model.value[locale]) = $event),
              dir: locale == 'ar' ? 'rtl' : 'ltr',
              onInput: _cache[1] || (_cache[1] = $event => (_ctx.$emit('update:modelValue', model.value)))
            }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_3)), [
              [vModelText, model.value[locale]]
            ])
          : createCommentVNode("v-if", true),
        createElementVNode("div", _hoisted_4, [
          createElementVNode("button", {
            class: "btn btn-outline-primary",
            type: "button",
            id: "basic-addon2",
            "data-bs-toggle": 'tooltip',
            "data-bs-placement": 'top',
            title: getTerm(locale).title
          }, toDisplayString(locale.toUpperCase()), 9 /* TEXT, PROPS */, _hoisted_5)
        ])
      ], 2 /* CLASS */))
    }), 128 /* KEYED_FRAGMENT */))
  ]))
}
}

};

script.__file = "src/components/controls/km-input-lstring.vue";

export { script as default };
//# sourceMappingURL=km-input-lstring.js.map
