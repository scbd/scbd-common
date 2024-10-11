(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) : typeof define === 'function' && define.amd ? define(['vue'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScbdCommonComponentsPreview = factory(global.vue));
})(this, function (vue) {
  'use strict';

  const _hoisted_1 = /*#__PURE__*/vue.createElementVNode("h3", null, "Welcome to the SCBD common project ", -1 /* HOISTED */);
  const _hoisted_2 = /*#__PURE__*/vue.createElementVNode("p", null, "Please navigate components using the tabs", -1 /* HOISTED */);
  const _hoisted_3 = [_hoisted_1, _hoisted_2];
  function render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("div", null, [..._hoisted_3]);
  }
  const script = {};
  script.render = render;
  script.__file = "src/components/preview.vue";
  return script;
});
//# sourceMappingURL=preview.umd.js.map
