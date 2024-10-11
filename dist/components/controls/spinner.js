import { useAttrs, computed, openBlock, createElementBlock, normalizeClass, createElementVNode, renderSlot, toDisplayString, createCommentVNode, unref } from 'vue';

const  useI18n = ()=>{
    return {
        t       : (key)=>key,
        locale  : 'en'
    }
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
        message : { type: String },
        variant : { type: String, default:'spinner-border'}
    },
  setup(__props) {

    const { t } = useI18n();  
    const attrs = useAttrs();

    const alignCenter = computed(()=>attrs.hasOwnProperty('center'));  


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(["scbd-common spinner", {'d-flex justify-content-center' : alignCenter.value}])
  }, [
    createElementVNode("span", {
      class: normalizeClass(__props.variant),
      role: "status"
    }, null, 2 /* CLASS */),
    renderSlot(_ctx.$slots, "default", {}, () => [
      (__props.message)
        ? (openBlock(), createElementBlock("span", _hoisted_1, toDisplayString(__props.message), 1 /* TEXT */))
        : createCommentVNode("v-if", true),
      (!__props.message)
        ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(unref(t)('loading')) + "...", 1 /* TEXT */))
        : createCommentVNode("v-if", true)
    ])
  ], 2 /* CLASS */))
}
}

};

script.__file = "src/components/controls/spinner.vue";

export { script as default };
//# sourceMappingURL=spinner.js.map
