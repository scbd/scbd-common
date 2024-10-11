(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue'), require('lodash')) : typeof define === 'function' && define.amd ? define(['vue', 'lodash'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScbdCommonComponentsControlsKmInputLstring = factory(global.vue, global.lodash));
})(this, function (vue, lodash) {
  'use strict';

  const _hoisted_1 = {
    class: "scbd-controls km-input-lstring"
  };
  const _hoisted_2 = ["placeholder", "onUpdate:modelValue", "dir"];
  const _hoisted_3 = ["rows", "placeholder", "onUpdate:modelValue", "dir"];
  const _hoisted_4 = {
    class: "input-group-append"
  };
  const _hoisted_5 = ["title"];
  var script = {
    __name: 'km-input-lstring',
    props: /*#__PURE__*/vue.mergeModels({
      locales: {
        type: Array,
        required: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      rows: {
        type: Number,
        required: false,
        default: 1
      },
      placeholder: {
        type: String,
        required: false
      }
    }, {
      "modelValue": {
        type: Object,
        required: true,
        default: {}
      },
      "modelModifiers": {}
    }),
    emits: ["update:modelValue"],
    setup(__props) {
      const model = vue.useModel(__props, "modelValue");
      const props = __props;
      const loadLanguages = () => {
        var _props$locales;
        (_props$locales = props.locales) === null || _props$locales === void 0 || _props$locales.forEach(e => {
          //TODO: call thesaurus service API
        });
      };
      const getTerm = term => {
        //TODO: call thesaurus service API
        return {
          title: term
        };
      };
      vue.watch(() => props.locales, (newVal, oldVal) => {
        const deleted = lodash.without(Object.keys(model.value), ...newVal);
        if (deleted !== null && deleted !== void 0 && deleted.length) {
          deleted.forEach(e => {
            model.value[e] = undefined;
          });
        }
        loadLanguages();
      }, {
        deep: true
      });
      vue.onMounted(() => {
        loadLanguages();
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [vue.renderSlot(_ctx.$slots, "default"), (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.locales, locale => {
          return vue.openBlock(), vue.createElementBlock("div", {
            class: vue.normalizeClass(["input-group mb-1", "km-input-lstring-".concat(locale)]),
            key: locale
          }, [__props.rows == 1 ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
            key: 0,
            type: "text",
            class: "form-control",
            placeholder: __props.placeholder,
            "aria-describedby": "lstring-text",
            "onUpdate:modelValue": $event => model.value[locale] = $event,
            dir: locale == 'ar' ? 'rtl' : 'ltr',
            onInput: _cache[0] || (_cache[0] = $event => _ctx.$emit('update:modelValue', model.value))
          }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_2)), [[vue.vModelText, model.value[locale]]]) : vue.createCommentVNode("v-if", true), __props.rows > 1 ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("textarea", {
            key: 1,
            rows: __props.rows,
            class: "form-control",
            placeholder: __props.placeholder,
            "aria-describedby": "lstring-textarea",
            "onUpdate:modelValue": $event => model.value[locale] = $event,
            dir: locale == 'ar' ? 'rtl' : 'ltr',
            onInput: _cache[1] || (_cache[1] = $event => _ctx.$emit('update:modelValue', model.value))
          }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_3)), [[vue.vModelText, model.value[locale]]]) : vue.createCommentVNode("v-if", true), vue.createElementVNode("div", _hoisted_4, [vue.createElementVNode("button", {
            class: "btn btn-outline-primary",
            type: "button",
            id: "basic-addon2",
            "data-bs-toggle": 'tooltip',
            "data-bs-placement": 'top',
            title: getTerm(locale).title
          }, vue.toDisplayString(locale.toUpperCase()), 9 /* TEXT, PROPS */, _hoisted_5)])], 2 /* CLASS */);
        }), 128 /* KEYED_FRAGMENT */))]);
      };
    }
  };
  script.__file = "src/components/controls/km-input-lstring.vue";
  return script;
});
//# sourceMappingURL=km-input-lstring.umd.js.map
