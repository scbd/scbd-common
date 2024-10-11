(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) : typeof define === 'function' && define.amd ? define(['vue'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScbdCommonComponentsInputsRadio = factory(global.vue));
})(this, function (vue) {
  'use strict';

  const _hoisted_1 = ["id", "value", "required", "disabled"];
  const _hoisted_2 = ["for"];
  var script = {
    __name: 'radio',
    props: /*#__PURE__*/vue.mergeModels({
      label: {
        type: String,
        required: true
      }
    }, {
      "modelValue": {
        type: Boolean,
        required: true
      },
      "modelModifiers": {}
    }),
    emits: ["update:modelValue"],
    setup(__props) {
      const model = vue.useModel(__props, "modelValue");
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(["scbd-common radio form-check", {
            'form-check-inline': _ctx.$attrs.inline
          }])
        }, [vue.withDirectives(vue.createElementVNode("input", {
          type: "radio",
          id: _ctx.$attrs.id,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => model.value = $event),
          value: _ctx.$attrs.value,
          required: _ctx.$attrs.required,
          disabled: _ctx.$attrs.disabled,
          class: vue.normalizeClass([_ctx.$attrs.class, "form-check-input"])
        }, null, 10 /* CLASS, PROPS */, _hoisted_1), [[vue.vModelRadio, model.value]]), vue.createElementVNode("label", {
          for: _ctx.$attrs.id,
          class: "form-check-label"
        }, [vue.renderSlot(_ctx.$slots, "label", {}, () => [vue.createTextVNode(vue.toDisplayString(__props.label), 1 /* TEXT */)])], 8 /* PROPS */, _hoisted_2)], 2 /* CLASS */);
      };
    }
  };
  script.__file = "src/components/inputs/radio.vue";
  return script;
});
//# sourceMappingURL=radio.umd.js.map
