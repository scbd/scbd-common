import { ref, useSlots, onMounted, onBeforeUnmount, openBlock, createElementBlock, Fragment, createElementVNode, renderSlot, createTextVNode, toDisplayString, unref, createCommentVNode } from 'vue';
import 'webui-popover';
import 'webui-popover/dist/jquery.webui-popover.css';
import $ from 'jquery';

const _hoisted_1 = {
  key: 0,
  class: "bi bi-question-circle-fill"
};
const _hoisted_2 = { class: "webui-popover-content" };
const _hoisted_3 = ["innerHTML"];


var script = {
  __name: 'km-help',
  props: {
    title: {type:String},
    content: {type:String, required: true}
},
  setup(__props) {

const helpAnchor = ref(null);
const props = __props;
const slots  = useSlots();

onMounted(()=>{    
    const settings = {
        trigger: 'hover',
        title: props.title || "Help",
        closeable: true,
        dismissible: true,
        padding: true,
        backdrop: false,
        style: 'inverse',
        delay: {
            show: null,
            hide: 200
        }
    };
    
    $ (helpAnchor.value)
        .webuiPopover('destroy')
        .webuiPopover(settings);
});

onBeforeUnmount(()=>{
    $(helpAnchor.value).webuiPopover('destroy');
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createElementVNode("span", {
      ref_key: "helpAnchor",
      ref: helpAnchor,
      class: "show-pop",
      "data-animation": "pop"
    }, [
      renderSlot(_ctx.$slots, "default"),
      renderSlot(_ctx.$slots, "icon", {}, () => [
        createTextVNode(toDisplayString(" ")),
        (!unref(slots).icon && !unref(slots).default)
          ? (openBlock(), createElementBlock("i", _hoisted_1))
          : createCommentVNode("v-if", true)
      ])
    ], 512 /* NEED_PATCH */),
    createElementVNode("div", _hoisted_2, [
      renderSlot(_ctx.$slots, "content", {}, () => [
        createElementVNode("div", { innerHTML: __props.content }, null, 8 /* PROPS */, _hoisted_3)
      ])
    ])
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script.__file = "src/components/controls/view/km-help.vue";

export { script as default };
//# sourceMappingURL=km-help.js.map
