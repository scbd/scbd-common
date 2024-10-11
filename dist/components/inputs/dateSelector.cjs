'use strict';

var vue = require('vue');

const _hoisted_1 = ["id", "required", "placeholder", "disabled", "type"];


var script = {
  __name: 'dateSelector',
  props: /*#__PURE__*/vue.mergeModels({
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
    const model = vue.useModel(__props, "modelValue");    

return (_ctx, _cache) => {
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((model).value = $event)),
    class: vue.normalizeClass(_ctx.$attrs.class),
    id: _ctx.$attrs.id,
    required: _ctx.$attrs.required,
    placeholder: _ctx.$attrs.placeholder,
    disabled: _ctx.$attrs.disabled,
    type: __props.type
  }, null, 10 /* CLASS, PROPS */, _hoisted_1)), [
    [vue.vModelDynamic, model.value]
  ])
}
}

};

script.__file = "src/components/inputs/dateSelector.vue";

module.exports = script;
//# sourceMappingURL=dateSelector.cjs.map
