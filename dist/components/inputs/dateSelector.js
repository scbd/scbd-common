import { mergeModels, useModel, withDirectives, openBlock, createElementBlock, normalizeClass, vModelDynamic } from 'vue';

const _hoisted_1 = ["id", "required", "placeholder", "disabled", "type"];


var script = {
  __name: 'dateSelector',
  props: /*#__PURE__*/mergeModels({
        type:{
            type:String,
            default:"date",
            validator(value) { 
                return ['date', 'month'].includes(value)
            }
        }   
    }, {
    "modelValue": {},
    "modelModifiers": {},
  }),
  emits: ["update:modelValue"],
  setup(__props) {

    //TODO: check if browser support datepicker
    //https://stackoverflow.com/questions/10193294/how-can-i-tell-if-a-browser-supports-input-type-date
    const model = useModel(__props, "modelValue");    

return (_ctx, _cache) => {
  return withDirectives((openBlock(), createElementBlock("input", {
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((model).value = $event)),
    class: normalizeClass(_ctx.$attrs.class),
    id: _ctx.$attrs.id,
    required: _ctx.$attrs.required,
    placeholder: _ctx.$attrs.placeholder,
    disabled: _ctx.$attrs.disabled,
    type: __props.type
  }, null, 10 /* CLASS, PROPS */, _hoisted_1)), [
    [vModelDynamic, model.value]
  ])
}
}

};

script.__file = "src/components/inputs/dateSelector.vue";

export { script as default };
//# sourceMappingURL=dateSelector.js.map
