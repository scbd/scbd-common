(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) : typeof define === 'function' && define.amd ? define(['vue'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScbdCommonComponentsControlsLinkKmViewLinks = factory(global.vue));
})(this, function (vue) {
  'use strict';

  const languages = {
    "ar": "العربية",
    "zh": "中文",
    "en": "English",
    "es": "Español",
    "fr": "Français",
    "ru": "Русский"
  };
  const _hoisted_1 = {
    class: "scbd-common km-view-links"
  };
  const _hoisted_2 = {
    key: 0,
    class: "table table-striped"
  };
  const _hoisted_3 = {
    class: "align-middle"
  };
  const _hoisted_4 = {
    class: "align-middle"
  };
  const _hoisted_5 = ["href"];
  const _hoisted_6 = {
    class: "align-middle"
  };
  const _hoisted_7 = {
    key: 0
  };
  const _hoisted_8 = {
    class: "text-nowrap text-right align-middle"
  };
  const _hoisted_9 = ["onClick"];
  const _hoisted_10 = /*#__PURE__*/vue.createElementVNode("i", {
    class: "bi bi-pencil-square"
  }, null, -1 /* HOISTED */);
  const _hoisted_11 = [_hoisted_10];
  const _hoisted_12 = ["onClick"];
  const _hoisted_13 = /*#__PURE__*/vue.createElementVNode("i", {
    class: "bi bi-trash3"
  }, null, -1 /* HOISTED */);
  const _hoisted_14 = [_hoisted_13];
  var script = {
    __name: 'km-view-links',
    props: {
      "modelValue": {
        type: Array,
        required: true
      },
      "modelModifiers": {}
    },
    emits: /*#__PURE__*/vue.mergeModels(['onDelete', 'onEdit'], ["update:modelValue"]),
    setup(__props, _ref) {
      let {
        emit: __emit
      } = _ref;
      const model = vue.useModel(__props, "modelValue");
      const emit = __emit;
      let links = vue.computed(() => {
        if (model.value) return model.value;
        return [];
      });
      const remove = index => {
        emit("onDelete", index);
      };
      const edit = index => {
        emit("onEdit", index);
      };
      return (_ctx, _cache) => {
        var _vue$unref;
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [(_vue$unref = vue.unref(links)) !== null && _vue$unref !== void 0 && _vue$unref.length ? (vue.openBlock(), vue.createElementBlock("table", _hoisted_2, [vue.createElementVNode("tbody", null, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(links), (item, index) => {
          return vue.openBlock(), vue.createElementBlock("tr", {
            key: index
          }, [vue.createElementVNode("td", _hoisted_3, [vue.createElementVNode("span", null, vue.toDisplayString(vue.unref(languages)[item.language]), 1 /* TEXT */)]), vue.createElementVNode("td", _hoisted_4, [vue.createElementVNode("a", {
            href: item.url
          }, vue.toDisplayString(item.name), 9 /* TEXT, PROPS */, _hoisted_5)]), vue.createElementVNode("td", _hoisted_6, [item.tag ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_7, " (" + vue.toDisplayString(item.tag) + ") ", 1 /* TEXT */)) : vue.createCommentVNode("v-if", true)]), vue.createElementVNode("td", _hoisted_8, [vue.createElementVNode("button", {
            class: "btn btn-outline-secondary",
            onClick: $event => edit(index)
          }, [..._hoisted_11], 8 /* PROPS */, _hoisted_9), vue.createElementVNode("button", {
            class: "btn btn-outline-secondary",
            onClick: $event => remove(index)
          }, [..._hoisted_14], 8 /* PROPS */, _hoisted_12)])]);
        }), 128 /* KEYED_FRAGMENT */))])])) : vue.createCommentVNode("v-if", true)]);
      };
    }
  };
  script.__file = "src/components/controls/link/km-view-links.vue";
  return script;
});
//# sourceMappingURL=km-view-links.umd.js.map
