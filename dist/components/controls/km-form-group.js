import { ref, useSlots, onMounted, onBeforeUnmount, openBlock, createElementBlock, Fragment, createElementVNode, renderSlot, createTextVNode, toDisplayString, unref, createCommentVNode, inject, normalizeClass, createBlock } from 'vue';
import 'webui-popover';
import 'webui-popover/dist/jquery.webui-popover.css';
import $ from 'jquery';

const _hoisted_1$1 = {
  key: 0,
  class: "bi bi-question-circle-fill"
};
const _hoisted_2$1 = { class: "webui-popover-content" };
const _hoisted_3 = ["innerHTML"];


var script$1 = {
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
          ? (openBlock(), createElementBlock("i", _hoisted_1$1))
          : createCommentVNode("v-if", true)
      ])
    ], 512 /* NEED_PATCH */),
    createElementVNode("div", _hoisted_2$1, [
      renderSlot(_ctx.$slots, "content", {}, () => [
        createElementVNode("div", { innerHTML: __props.content }, null, 8 /* PROPS */, _hoisted_3)
      ])
    ])
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$1.__file = "src/components/controls/view/km-help.vue";

const _hoisted_1 = ["id"];
const _hoisted_2 = ["for", "name", "required"];


var script = {
  __name: 'km-form-group',
  props: {
    name      : { type:String, default:"" },
    caption   : { type:String, required: true },
    required  : { type:Boolean, default:false },
    isValid : { type:Function },
    helpContent: { type: String, required: true },
    helpTitle: { type:String }
},
  setup(__props) {

const props = __props;

let reviewError = inject('validationReview');

const hasError    = ()=>{
    return props.name && props.required && reviewError?.isValid(props.name);
};


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", {
    id: _ctx.$attrs.id,
    class: normalizeClass(["scbd-controls km-form-group form-group mb-3", {'has-error':hasError(), 'has-help':__props.helpContent, 'mandatory':__props.required}])
  }, [
    (__props.caption)
      ? (openBlock(), createElementBlock("label", {
          key: 0,
          class: "mb-1 km-form-group-label",
          for: __props.name,
          name: __props.name,
          required: __props.required ? true : null
        }, toDisplayString(__props.caption), 9 /* TEXT, PROPS */, _hoisted_2))
      : createCommentVNode("v-if", true),
    (__props.helpContent)
      ? (openBlock(), createBlock(script$1, {
          key: 1,
          title: __props.helpTitle,
          content: __props.helpContent,
          class: "ms-1 me-1"
        }, null, 8 /* PROPS */, ["title", "content"]))
      : createCommentVNode("v-if", true),
    createElementVNode("div", null, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 10 /* CLASS, PROPS */, _hoisted_1))
}
}

};

script.__scopeId = "data-v-2d33fbf8";
script.__file = "src/components/controls/km-form-group.vue";

export { script as default };
//# sourceMappingURL=km-form-group.js.map
