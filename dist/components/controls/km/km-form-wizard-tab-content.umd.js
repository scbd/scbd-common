(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) : typeof define === 'function' && define.amd ? define(['vue'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScbdCommonComponentsControlsKmKmFormWizardTabContent = factory(global.vue));
})(this, function (vue) {
  'use strict';

  const _hoisted_1 = ["id"];
  var script = {
    __name: 'km-form-wizard-tab-content',
    props: {
      isActive: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        required: true
      }
    },
    setup(__props) {
      const props = __props;
      vue.onMounted(() => {
        const addTab = vue.inject("addFormWizardTabKey");
        addTab({
          title: props.title,
          isActive: props.isActive
        });
      });
      return (_ctx, _cache) => {
        return __props.isActive ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: "scbd-controls km-form-wizard-tab-content",
          id: _ctx.$attrs.id
        }, [vue.renderSlot(_ctx.$slots, "default")], 8 /* PROPS */, _hoisted_1)) : vue.createCommentVNode("v-if", true);
      };
    }
  };
  script.__file = "src/components/controls/km/km-form-wizard-tab-content.vue";
  return script;
});
//# sourceMappingURL=km-form-wizard-tab-content.umd.js.map
