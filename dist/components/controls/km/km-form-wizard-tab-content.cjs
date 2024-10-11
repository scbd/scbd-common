'use strict';

var vue = require('vue');

const _hoisted_1 = ["id"];


var script = {
  __name: 'km-form-wizard-tab-content',
  props: {
  isActive: { type:Boolean, default: false },
  title: { type: String, required: true },
},
  setup(__props) {

const props = __props;

vue.onMounted(() => {
  const addTab = vue.inject("addFormWizardTabKey");

  addTab({
    title: props.title,
    isActive: props.isActive,
  });
});

return (_ctx, _cache) => {
  return (__props.isActive)
    ? (vue.openBlock(), vue.createElementBlock("div", {
        key: 0,
        class: "scbd-controls km-form-wizard-tab-content",
        id: _ctx.$attrs.id
      }, [
        vue.renderSlot(_ctx.$slots, "default")
      ], 8 /* PROPS */, _hoisted_1))
    : vue.createCommentVNode("v-if", true)
}
}

};

script.__file = "src/components/controls/km/km-form-wizard-tab-content.vue";

module.exports = script;
//# sourceMappingURL=km-form-wizard-tab-content.cjs.map
