(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) : typeof define === 'function' && define.amd ? define(['vue'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScbdCommonComponentsCountdownPreview = factory(global.vue));
})(this, function (vue) {
  'use strict';

  const _hoisted_1 = /*#__PURE__*/vue.createElementVNode("h3", null, "CBD count-down components", -1 /* HOISTED */);
  const _hoisted_2 = [_hoisted_1];
  function render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("div", null, [..._hoisted_2]);
  }
  const script = {};
  script.render = render;
  script.__file = "src/components/countdown/preview.vue";
  return script;
});
//# sourceMappingURL=preview.umd.js.map
