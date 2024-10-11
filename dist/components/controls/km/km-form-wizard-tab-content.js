import { onMounted, inject, openBlock, createElementBlock, renderSlot, createCommentVNode } from 'vue';

const _hoisted_1 = ["id"];


var script = {
  __name: 'km-form-wizard-tab-content',
  props: {
  isActive: { type:Boolean, default: false },
  title: { type: String, required: true },
},
  setup(__props) {

const props = __props;

onMounted(() => {
  const addTab = inject("addFormWizardTabKey");

  addTab({
    title: props.title,
    isActive: props.isActive,
  });
});

return (_ctx, _cache) => {
  return (__props.isActive)
    ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "scbd-controls km-form-wizard-tab-content",
        id: _ctx.$attrs.id
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 8 /* PROPS */, _hoisted_1))
    : createCommentVNode("v-if", true)
}
}

};

script.__file = "src/components/controls/km/km-form-wizard-tab-content.vue";

export { script as default };
//# sourceMappingURL=km-form-wizard-tab-content.js.map
