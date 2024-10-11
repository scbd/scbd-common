(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue'), require('lodash'), require('@/services/composables/i18n'), require('@/services/filters/lstring')) : typeof define === 'function' && define.amd ? define(['vue', 'lodash', '@/services/composables/i18n', '@/services/filters/lstring'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScbdCommonComponentsControlsViewKmLstringValue = factory(global.vue));
})(this, function (vue) {
  'use strict';

  function lstring(ltext, locale) {
    if (Number.isInteger(ltext))
      //is number to handle generic implementation of NR
      return ltext;
    if (!ltext) return "";
    if (typeof ltext === "string") return ltext;
    locale = locale || lstringLocale(ltext, locale);
    let sText = "";
    if (!sText && locale) sText = ltext[locale];
    if (!sText) sText = ltext.en;
    if (!sText) {
      var normalized = normalizeText(ltext);
      if (normalized[locale]) return normalized[locale];
      for (var key in ltext) {
        sText = ltext[key];
        if (sText) break;
      }
    }
    return sText || "";
  }
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
  function normalizeText(text) {
    if (!text) return null;
    var entry = {
      ar: text.ar,
      en: text.en,
      es: text.es,
      fr: text.fr,
      ru: text.ru,
      zh: text.zh
    };
    if (!entry.en) entry.en = entry.fr;
    if (!entry.en) entry.en = entry.es;
    if (!entry.en) entry.en = entry.ru;
    if (!entry.en) entry.en = entry.ar;
    if (!entry.en) entry.en = entry.zh;
    if (!entry.fr) entry.fr = entry.en;
    if (!entry.es) entry.es = entry.en;
    if (!entry.ru) entry.ru = entry.en;
    if (!entry.ar) entry.ar = entry.en;
    if (!entry.zh) entry.zh = entry.en;
    return entry;
  }
  const _hoisted_1 = ["id"];
  const _hoisted_2 = ["dir"];
  const _hoisted_3 = ["dir", "innerHTML"];
  const _hoisted_4 = {
    class: "input-group-text",
    style: {
      "cursor": "default"
    }
  };
  const _hoisted_5 = ["title"];
  const _hoisted_6 = {
    class: "d-inline-block",
    tabindex: 0
  };
  var script = {
    __name: 'km-lstring-value',
    props: {
      value: {
        type: Object,
        required: true
      },
      locale: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: 'string'
      }
    },
    setup(__props) {
      const {
        value,
        locale,
        type
      } = __props;
      const valueLocale = vue.computed(() => lstringLocale(value, locale));
      const valueLstring = vue.computed(() => lstring(value, locale));
      const getTerm = vue.computed(() => {
        // TODO: use thesaraus API
        return {
          title: valueLocale.value
        };
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          id: _ctx.$attrs.id,
          class: "scbd-controls km-lstring-value"
        }, [vue.createElementVNode("div", {
          class: vue.normalizeClass("input-group input-lang-".concat(__props.locale))
        }, [__props.type === 'string' ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: "form-control km-value km-value-string",
          dir: vue.unref(direction)(valueLstring.value, __props.locale)
        }, vue.toDisplayString(valueLstring.value), 9 /* TEXT, PROPS */, _hoisted_2)) : __props.type === 'html' ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 1,
          class: "form-control km-value km-value-lstring-html ck-content",
          dir: vue.unref(direction)(valueLstring.value, __props.locale),
          innerHTML: valueLstring.value
        }, null, 8 /* PROPS */, _hoisted_3)) : vue.createCommentVNode("v-if", true), vue.createElementVNode("span", _hoisted_4, [vue.createElementVNode("div", {
          "data-toggle": "tooltip",
          "data-placement": "top",
          title: vue.unref(lstring)(getTerm.value.title, __props.locale)
        }, [vue.createElementVNode("span", _hoisted_6, vue.toDisplayString(valueLocale.value.toUpperCase()), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_5)])], 2 /* CLASS */)], 8 /* PROPS */, _hoisted_1);
      };
    }
  };
  script.__file = "src/components/controls/view/km-lstring-value.vue";
  return script;
});
//# sourceMappingURL=km-lstring-value.umd.js.map
