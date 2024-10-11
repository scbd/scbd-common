(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) : typeof define === 'function' && define.amd ? define(['vue'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScbdCommonComponentsControlsViewKmValue = factory(global.vue));
})(this, function (vue) {
  'use strict';

  const _hoisted_1 = ["id"];
  var script = {
    __name: 'km-value',
    props: {
      value: {
        type: String,
        required: true
      }
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          id: _ctx.$attrs.id,
          class: "scbd-controls km-value form-control"
        }, [vue.renderSlot(_ctx.$slots, "default", {}, () => [vue.createTextVNode(vue.toDisplayString(__props.value), 1 /* TEXT */)])], 8 /* PROPS */, _hoisted_1);
      };
    }
  };
  script.__scopeId = "data-v-1a165c67";
  script.__file = "src/components/controls/view/km-value.vue";
  return script;
});
//# sourceMappingURL=km-value.umd.js.map
