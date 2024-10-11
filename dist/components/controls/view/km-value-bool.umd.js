(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue'), require('lodash'), require('@/services/composables/i18n'), require('@/services/filters/lstring')) : typeof define === 'function' && define.amd ? define(['vue', 'lodash', '@/services/composables/i18n', '@/services/filters/lstring'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScbdCommonComponentsControlsViewKmValueBool = factory(global.vue));
})(this, function (vue) {
  'use strict';

  const lstringLocale = (ltext, locale) => {
    // TODO: use thesaraus API

    // TODO: use thesaraus API, there was an OR case to get value from thesaraus API
    if (!ltext) return locale;
    if (typeof ltext == "string") return locale;
    if (ltext[locale]) return locale;

    // TODO: use thesaraus API, there was a conditional check to get value from 'defaultLocale.value'

    if (ltext.en) return "en";
    if (ltext.fr) return "fr";
    if (ltext.es) return "es";
    if (ltext.ru) return "ru";
    if (ltext.ar) return "ar";
    if (ltext.zh) return "zh";
    for (var key in ltext) {
      if (ltext[key]) return key;
    }
    return locale;
  };
  const direction = (text, locale) => {
    locale = lstringLocale(text, locale);
    return localeDirection(locale);
  };
  const localeDirection = locale => {
    // TODO: use thesaraus API
    return locale == "ar" ? "rtl" : "ltr";
  };
  const _hoisted_1 = ["id"];
  const _hoisted_2 = ["dir"];
  const _hoisted_3 = {
    key: 0
  };
  const _hoisted_4 = {
    key: 1
  };
  const _hoisted_5 = {
    class: "input-group-text",
    style: {
      "cursor": "default"
    }
  };
  var script = {
    __name: 'km-value-bool',
    props: {
      value: {
        type: Boolean,
        required: true
      },
      locale: {
        type: String,
        required: true
      }
    },
    setup(__props) {
      function t(str) {
        //use 'vue-i18n' library
        return str;
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: "scbd-controls km-value-bool",
          id: _ctx.$attrs.id
        }, [vue.createElementVNode("div", {
          class: vue.normalizeClass("input-group input-lang-".concat(__props.locale))
        }, [vue.createElementVNode("div", {
          class: "form-control km-value",
          dir: vue.unref(direction)(__props.value, __props.locale)
        }, [__props.value ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_3, vue.toDisplayString(t('yes')), 1 /* TEXT */)) : (vue.openBlock(), vue.createElementBlock("span", _hoisted_4, vue.toDisplayString(t('no')), 1 /* TEXT */))], 8 /* PROPS */, _hoisted_2), vue.createElementVNode("span", _hoisted_5, vue.toDisplayString(__props.locale.toUpperCase()), 1 /* TEXT */)], 2 /* CLASS */)], 8 /* PROPS */, _hoisted_1);
      };
    }
  };
  script.__scopeId = "data-v-cdc3e980";
  script.__file = "src/components/controls/view/km-value-bool.vue";
  return script;
});
//# sourceMappingURL=km-value-bool.umd.js.map
