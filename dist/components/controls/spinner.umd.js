(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) : typeof define === 'function' && define.amd ? define(['vue'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScbdCommonComponentsControlsSpinner = factory(global.vue));
})(this, function (vue) {
  'use strict';

  const useI18n = () => {
    return {
      t: key => key,
      locale: 'en'
    };
  };
  const _hoisted_1 = {
    key: 0,
    class: "ms-2"
  };
  const _hoisted_2 = {
    key: 1,
    class: "ms-2"
  };
  var script = {
    __name: 'spinner',
    props: {
      message: {
        type: String
      },
      variant: {
        type: String,
        default: 'spinner-border'
      }
    },
    setup(__props) {
      const {
        t
      } = useI18n();
      const attrs = vue.useAttrs();
      const alignCenter = vue.computed(() => attrs.hasOwnProperty('center'));
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(["scbd-common spinner", {
            'd-flex justify-content-center': alignCenter.value
          }])
        }, [vue.createElementVNode("span", {
          class: vue.normalizeClass(__props.variant),
          role: "status"
        }, null, 2 /* CLASS */), vue.renderSlot(_ctx.$slots, "default", {}, () => [__props.message ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_1, vue.toDisplayString(__props.message), 1 /* TEXT */)) : vue.createCommentVNode("v-if", true), !__props.message ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_2, vue.toDisplayString(vue.unref(t)('loading')) + "...", 1 /* TEXT */)) : vue.createCommentVNode("v-if", true)])], 2 /* CLASS */);
      };
    }
  };
  script.__file = "src/components/controls/spinner.vue";
  return script;
});
//# sourceMappingURL=spinner.umd.js.map
