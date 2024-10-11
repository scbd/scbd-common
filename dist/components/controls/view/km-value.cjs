'use strict';

var vue = require('vue');

const _hoisted_1 = ["id"];



  
var script = {
  __name: 'km-value',
  props: {
    value: { type: String, required: true }
  },
  setup(__props) {

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("div", {
    id: _ctx.$attrs.id,
    class: "scbd-controls km-value form-control"
  }, [
    vue.renderSlot(_ctx.$slots, "default", {}, () => [
      vue.createTextVNode(vue.toDisplayString(__props.value), 1 /* TEXT */)
    ])
  ], 8 /* PROPS */, _hoisted_1))
}
}

};

script.__scopeId = "data-v-1a165c67";
script.__file = "src/components/controls/view/km-value.vue";

module.exports = script;
//# sourceMappingURL=km-value.cjs.map
