'use strict';

var vue = require('vue');
require('webui-popover');
require('webui-popover/dist/jquery.webui-popover.css');
var $ = require('jquery');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var $__default = /*#__PURE__*/_interopDefaultLegacy($);

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

const helpAnchor = vue.ref(null);
const props = __props;
const slots  = vue.useSlots();

vue.onMounted(()=>{    
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
    
    $__default["default"] (helpAnchor.value)
        .webuiPopover('destroy')
        .webuiPopover(settings);
});

vue.onBeforeUnmount(()=>{
    $__default["default"](helpAnchor.value).webuiPopover('destroy');
});

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
    vue.createElementVNode("span", {
      ref_key: "helpAnchor",
      ref: helpAnchor,
      class: "show-pop",
      "data-animation": "pop"
    }, [
      vue.renderSlot(_ctx.$slots, "default"),
      vue.renderSlot(_ctx.$slots, "icon", {}, () => [
        vue.createTextVNode(vue.toDisplayString(" ")),
        (!vue.unref(slots).icon && !vue.unref(slots).default)
          ? (vue.openBlock(), vue.createElementBlock("i", _hoisted_1))
          : vue.createCommentVNode("v-if", true)
      ])
    ], 512 /* NEED_PATCH */),
    vue.createElementVNode("div", _hoisted_2, [
      vue.renderSlot(_ctx.$slots, "content", {}, () => [
        vue.createElementVNode("div", { innerHTML: __props.content }, null, 8 /* PROPS */, _hoisted_3)
      ])
    ])
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script.__file = "src/components/controls/view/km-help.vue";

module.exports = script;
//# sourceMappingURL=km-help.cjs.map
