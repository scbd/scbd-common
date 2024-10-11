import { useAttrs, computed, openBlock, createElementBlock, normalizeClass, createElementVNode, renderSlot, toDisplayString, createCommentVNode, unref, createVNode } from 'vue';

const  useI18n = ()=>{
    return {
        t       : (key)=>key,
        locale  : 'en'
    }
};

const _hoisted_1$1 = {
  key: 0,
  class: "ms-2"
};
const _hoisted_2$1 = {
  key: 1,
  class: "ms-2"
};

    
var script$1 = {
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
        ? (openBlock(), createElementBlock("span", _hoisted_1$1, toDisplayString(__props.message), 1 /* TEXT */))
        : createCommentVNode("v-if", true),
      (!__props.message)
        ? (openBlock(), createElementBlock("span", _hoisted_2$1, toDisplayString(unref(t)('loading')) + "...", 1 /* TEXT */))
        : createCommentVNode("v-if", true)
    ])
  ], 2 /* CLASS */))
}
}

};

script$1.__file = "src/components/controls/spinner.vue";

const _hoisted_1 = {
  key: 0,
  class: "scbd-common spinner-modal",
  tabindex: "-1",
  role: "dialog"
};
const _hoisted_2 = {
  class: "modal-dialog",
  role: "document"
};
const _hoisted_3 = { class: "modal-content" };
const _hoisted_4 = { class: "modal-header" };
const _hoisted_5 = { class: "modal-title" };
const _hoisted_6 = { class: "modal-body" };

    
var script = {
  __name: 'spinner-modal',
  props: {
        visible : { type:Boolean, default:false},
        title   : { type:String},
        message : { type:String}
    },
  setup(__props) {

    const {t, locale } = useI18n();  

    const props = __props;

return (_ctx, _cache) => {
  return (props.visible)
    ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("div", _hoisted_2, [
          createElementVNode("div", _hoisted_3, [
            createElementVNode("div", _hoisted_4, [
              createElementVNode("h5", _hoisted_5, toDisplayString(props.title|| unref(t)('processing')), 1 /* TEXT */)
            ]),
            createElementVNode("div", _hoisted_6, [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createVNode(script$1, {
                  message: __props.message || unref(t)('loading')
                }, null, 8 /* PROPS */, ["message"])
              ])
            ])
          ])
        ])
      ]))
    : createCommentVNode("v-if", true)
}
}

};

script.__file = "src/components/controls/spinner-modal.vue";

export { script as default };
//# sourceMappingURL=spinner-modal.js.map
