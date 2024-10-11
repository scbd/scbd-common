(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue'), require('lodash'), require('@/services/composables/i18n'), require('@/services/filters/lstring')) : typeof define === 'function' && define.amd ? define(['vue', 'lodash', '@/services/composables/i18n', '@/services/filters/lstring'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScbdCommonComponentsControlsViewKmLocales = factory(global.vue));
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
  const _hoisted_2 = ["onClick"];
  const _hoisted_3 = ["title"];
  const _hoisted_4 = {
    tabindex: "0"
  };
  var script = {
    __name: 'km-locales',
    props: /*#__PURE__*/vue.mergeModels({
      locales: {
        type: Array,
        required: true
      }
    }, {
      "modelValue": {
        type: String,
        required: true
      },
      "modelModifiers": {}
    }),
    emits: ["update:modelValue"],
    setup(__props) {
      const model = vue.useModel(__props, "modelValue");
      const props = __props;

      // TODO: use i18n
      // const { t, locale : appLocale } = useI18n();
      const appLocale = vue.ref("en");
      function onLocaleSelected(locale) {
        model.value = locale;
      }
      function setDefaultLocale(languages) {
        if (languages !== null && languages !== void 0 && languages.length) {
          if (languages.length === 1 || languages.includes(appLocale.value)) {
            onLocaleSelected(appLocale.value);
          } else {
            onLocaleSelected(languages[0]);
          }
        }
      }
      vue.watch(props.locales, languages => {
        setDefaultLocale(languages);
      });
      function getTerm(lang) {
        //TODO: Use thesaurus API
        // thesaurusStore.loadTerm(`lang-${lang}`)
        // return thesaurusStore.getTerm(`lang-${lang}`)||{};   
        return lang;
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: "scbd-controls km-locales btn-group",
          role: "group",
          "aria-label": "Document locales",
          id: _ctx.$attrs.id
        }, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.locales, locale => {
          return vue.openBlock(), vue.createElementBlock("button", {
            key: locale,
            class: vue.normalizeClass(['btn', 'btn-primary', {
              active: locale === __props.modelValue
            }]),
            onClick: $event => onLocaleSelected(locale)
          }, [vue.createElementVNode("div", {
            "data-bs-toggle": "tooltip",
            "data-bs-placement": "top",
            class: "d-inline-block",
            title: vue.unref(lstring)(getTerm(locale), appLocale.value)
          }, [vue.createElementVNode("span", _hoisted_4, vue.toDisplayString(locale.toUpperCase()), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_3)], 10 /* CLASS, PROPS */, _hoisted_2);
        }), 128 /* KEYED_FRAGMENT */))], 8 /* PROPS */, _hoisted_1);
      };
    }
  };
  script.__file = "src/components/controls/view/km-locales.vue";
  return script;
});
//# sourceMappingURL=km-locales.umd.js.map
