import { computed, openBlock, createElementBlock, createElementVNode, normalizeClass, unref, toDisplayString, createCommentVNode } from 'vue';
import 'lodash';
import '@/services/composables/i18n';
import '@/services/filters/lstring';

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

const localeDirection = (locale) => {
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
    zh: text.zh,
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
  style: {"cursor":"default"}
};
const _hoisted_5 = ["title"];
const _hoisted_6 = {
  class: "d-inline-block",
  tabindex: 0
};


var script = {
  __name: 'km-lstring-value',
  props: {
  value: { type: Object, required: true },
  locale: { type: String, required: true },
  type: { type: String, default: 'string' },
},
  setup(__props) {

const { value, locale, type } = __props;

const valueLocale = computed(() => lstringLocale(value, locale));
const valueLstring = computed(() => lstring(value, locale));

const getTerm = computed(() => {
    // TODO: use thesaraus API
    return {
        title: valueLocale.value
    }
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", {
    id: _ctx.$attrs.id,
    class: "scbd-controls km-lstring-value"
  }, [
    createElementVNode("div", {
      class: normalizeClass(`input-group input-lang-${__props.locale}`)
    }, [
      (__props.type === 'string')
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "form-control km-value km-value-string",
            dir: unref(direction)(valueLstring.value, __props.locale)
          }, toDisplayString(valueLstring.value), 9 /* TEXT, PROPS */, _hoisted_2))
        : (__props.type === 'html')
          ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: "form-control km-value km-value-lstring-html ck-content",
              dir: unref(direction)(valueLstring.value, __props.locale),
              innerHTML: valueLstring.value
            }, null, 8 /* PROPS */, _hoisted_3))
          : createCommentVNode("v-if", true),
      createElementVNode("span", _hoisted_4, [
        createElementVNode("div", {
          "data-toggle": "tooltip",
          "data-placement": "top",
          title: unref(lstring)(getTerm.value.title, __props.locale)
        }, [
          createElementVNode("span", _hoisted_6, toDisplayString(valueLocale.value.toUpperCase()), 1 /* TEXT */)
        ], 8 /* PROPS */, _hoisted_5)
      ])
    ], 2 /* CLASS */)
  ], 8 /* PROPS */, _hoisted_1))
}
}

};

script.__file = "src/components/controls/view/km-lstring-value.vue";

export { script as default };
//# sourceMappingURL=km-lstring-value.js.map
