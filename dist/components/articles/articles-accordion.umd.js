(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) : typeof define === 'function' && define.amd ? define(['vue'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScbdCommonComponentsArticlesArticlesAccordion = factory(global.vue));
})(this, function (vue) {
  'use strict';

  function render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("div", null, " this component is done in other branch ");
  }
  const script = {};
  script.render = render;
  script.__file = "src/components/articles/articles-accordion.vue";
  return script;
});
//# sourceMappingURL=articles-accordion.umd.js.map
