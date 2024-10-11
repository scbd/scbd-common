(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) : typeof define === 'function' && define.amd ? define(['vue'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScbdCommonComponentsControlsPreviewComponent = factory(global.vue));
})(this, function (vue) {
  'use strict';

  const _hoisted_1 = {
    class: "row"
  };
  const _hoisted_2 = {
    class: "col-12"
  };
  const _hoisted_3 = {
    class: "card"
  };
  const _hoisted_4 = {
    class: "card-header"
  };
  const _hoisted_5 = {
    class: "card-body"
  };
  const _hoisted_6 = {
    class: "row"
  };
  const _hoisted_7 = {
    class: "col-6",
    ref: "wrap"
  };
  const _hoisted_8 = {
    class: "col-6"
  };
  const _hoisted_9 = {
    class: "callout callout-warning"
  };
  function render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [vue.createElementVNode("div", _hoisted_2, [vue.createElementVNode("div", _hoisted_3, [vue.createElementVNode("div", _hoisted_4, vue.toDisplayString(_ctx.$attrs["card-header"]), 1 /* TEXT */), vue.createElementVNode("div", _hoisted_5, [vue.createElementVNode("div", _hoisted_6, [vue.createElementVNode("div", _hoisted_7, [vue.renderSlot(_ctx.$slots, "left")], 512 /* NEED_PATCH */), vue.createElementVNode("div", _hoisted_8, [vue.createElementVNode("div", _hoisted_9, [vue.createElementVNode("code", null, [vue.renderSlot(_ctx.$slots, "right")])])])])])])])]);
  }
  const script = {};
  script.render = render;
  script.__file = "src/components/controls/preview-component.vue";
  return script;
});
//# sourceMappingURL=preview-component.umd.js.map
