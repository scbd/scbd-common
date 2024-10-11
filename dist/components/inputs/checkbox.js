import { mergeModels, useModel, openBlock, createElementBlock, normalizeClass, withDirectives, createElementVNode, vModelCheckbox, renderSlot, createTextVNode, toDisplayString } from 'vue';

const _hoisted_1 = ["id", "value", "required", "disabled"];
const _hoisted_2 = ["for"];


var script = {
  __name: 'checkbox',
  props: /*#__PURE__*/mergeModels({ label: { type: String,  required: true }}, {
    "modelValue": { type: Boolean,required: true },
    "modelModifiers": {},
  }),
  emits: ["update:modelValue"],
  setup(__props) {

    const model = useModel(__props, "modelValue");

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(["scbd-common checkbox form-check", {'form-check-inline' : _ctx.$attrs.inline}])
  }, [
    withDirectives(createElementVNode("input", {
      type: "checkbox",
      id: _ctx.$attrs.id,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((model).value = $event)),
      value: _ctx.$attrs.value,
      required: _ctx.$attrs.required,
      disabled: _ctx.$attrs.disabled,
      class: normalizeClass([_ctx.$attrs.class, "form-check-input"])
    }, null, 10 /* CLASS, PROPS */, _hoisted_1), [
      [vModelCheckbox, model.value]
    ]),
    createElementVNode("label", {
      for: _ctx.$attrs.id,
      class: "form-check-label"
    }, [
      renderSlot(_ctx.$slots, "label", {}, () => [
        createTextVNode(toDisplayString(__props.label), 1 /* TEXT */)
      ])
    ], 8 /* PROPS */, _hoisted_2)
  ], 2 /* CLASS */))
}
}

};

script.__file = "src/components/inputs/checkbox.vue";

export { script as default };
//# sourceMappingURL=checkbox.js.map
