(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) : typeof define === 'function' && define.amd ? define(['vue'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScbdCommonComponentsArticlesCbdAddNewArticle = factory(global.vue));
})(this, function (vue) {
  'use strict';

  var script = {
    name: 'cbdAddNewArticle',
    props: {
      tags: {
        type: Array,
        required: false,
        default: []
      },
      // [] of tag id's
      customTags: {
        type: Array,
        required: false,
        default: []
      },
      // [] of customTag id's
      adminTags: {
        type: Array,
        required: false,
        default: []
      },
      // [] of adminTag text
      target: {
        type: String,
        required: false,
        default: '_blank'
      },
      id: {
        type: String,
        required: false,
        default: undefined
      }
    },
    computed: {
      newArticleUrl: function () {
        const domain = window.location.hostname.replace(/[^\.]+\./, '');
        let baseUrl = 'https://www.cbd.int/management';
        if (domain == 'localhost' || domain == 'cbddev.xyz') baseUrl = 'https://oasis.cbddev.xyz';
        const queryString = [];
        if (!this.id) {
          var _this$tags, _this$customTags, _this$adminTags;
          if ((_this$tags = this.tags) !== null && _this$tags !== void 0 && _this$tags.length) queryString.push('tags=' + this.tags.map(encodeURIComponent).join(','));
          if ((_this$customTags = this.customTags) !== null && _this$customTags !== void 0 && _this$customTags.length) queryString.push('customTags=' + this.customTags.map(encodeURIComponent).join(','));
          if ((_this$adminTags = this.adminTags) !== null && _this$adminTags !== void 0 && _this$adminTags.length) queryString.push('adminTags=' + this.adminTags.map(encodeURIComponent).join(','));
        }
        queryString.push('returnUrl=' + encodeURI(window.location.href));
        if (!this.id) return "".concat(baseUrl, "/articles/new?").concat(queryString.join('&'));
        return "".concat(baseUrl, "/articles/").concat(encodeURIComponent(this.id), "/edit?").concat(queryString.join('&'));
      }
    }
  };
  const _hoisted_1 = ["href", "target"];
  const _hoisted_2 = {
    key: 0
  };
  const _hoisted_3 = /*#__PURE__*/vue.createElementVNode("i", {
    class: "fa fa-plus"
  }, null, -1 /* HOISTED */);
  const _hoisted_4 = {
    key: 1
  };
  const _hoisted_5 = /*#__PURE__*/vue.createElementVNode("i", {
    class: "fa fa-edit"
  }, null, -1 /* HOISTED */);
  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("a", {
      href: $options.newArticleUrl,
      target: $props.target
    }, [vue.renderSlot(_ctx.$slots, "default", {}, () => [!$props.id ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_2, [_hoisted_3, vue.createTextVNode(" Add Content")])) : vue.createCommentVNode("v-if", true), $props.id ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_4, [_hoisted_5, vue.createTextVNode(" Edit Content")])) : vue.createCommentVNode("v-if", true)])], 8 /* PROPS */, _hoisted_1);
  }
  script.render = render;
  script.__file = "src/components/articles/cbd-add-new-article.vue";
  return script;
});
//# sourceMappingURL=cbd-add-new-article.umd.js.map
