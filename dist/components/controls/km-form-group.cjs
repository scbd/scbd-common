'use strict';

var vue = require('vue');
require('webui-popover');
require('webui-popover/dist/jquery.webui-popover.css');
var $ = require('jquery');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var $__default = /*#__PURE__*/_interopDefaultLegacy($);

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
          ? (vue.openBlock(), vue.createElementBlock("i", _hoisted_1$1))
          : vue.createCommentVNode("v-if", true)
      ])
    ], 512 /* NEED_PATCH */),
    vue.createElementVNode("div", _hoisted_2$1, [
      vue.renderSlot(_ctx.$slots, "content", {}, () => [
        vue.createElementVNode("div", { innerHTML: __props.content }, null, 8 /* PROPS */, _hoisted_3)
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

let reviewError = vue.inject('validationReview');

const hasError    = ()=>{
    return props.name && props.required && reviewError?.isValid(props.name);
};


return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("div", {
    id: _ctx.$attrs.id,
    class: vue.normalizeClass(["scbd-controls km-form-group form-group mb-3", {'has-error':hasError(), 'has-help':__props.helpContent, 'mandatory':__props.required}])
  }, [
    (__props.caption)
      ? (vue.openBlock(), vue.createElementBlock("label", {
          key: 0,
          class: "mb-1 km-form-group-label",
          for: __props.name,
          name: __props.name,
          required: __props.required ? true : null
        }, vue.toDisplayString(__props.caption), 9 /* TEXT, PROPS */, _hoisted_2))
      : vue.createCommentVNode("v-if", true),
    (__props.helpContent)
      ? (vue.openBlock(), vue.createBlock(script$1, {
          key: 1,
          title: __props.helpTitle,
          content: __props.helpContent,
          class: "ms-1 me-1"
        }, null, 8 /* PROPS */, ["title", "content"]))
      : vue.createCommentVNode("v-if", true),
    vue.createElementVNode("div", null, [
      vue.renderSlot(_ctx.$slots, "default")
    ])
  ], 10 /* CLASS, PROPS */, _hoisted_1))
}
}

};

script.__scopeId = "data-v-2d33fbf8";
script.__file = "src/components/controls/km-form-group.vue";

module.exports = script;
//# sourceMappingURL=km-form-group.cjs.map
