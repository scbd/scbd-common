'use strict';

var vue = require('vue');
require('lodash');
require('@/services/composables/i18n');
require('@/services/filters/lstring');

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

const _hoisted_1$2 = { class: "scbd-controls km-term" };
const _hoisted_2$1 = {
  key: 0,
  class: "alert alert-danger",
  role: "alert"
};


var script$2 = {
  __name: 'km-term',
  props: {
  value: { type: Object, required: true },
  locale: { type: String, required: true },
},
  emits: ['onTermLoad'],
  setup(__props, { emit: __emit }) {

const emit = __emit;
const props = __props;

const term = vue.ref(null);
const error = vue.ref(null);

if (!props.value?.identifier || props.value) {
    try {
      // TODO: Use thesaurus API
      // term = await  thesaurusStore.loadTerm(value.value?.identifier||value.value);
      term.value = { title: 'SCBD Term' }; 
      if (term.value) {
        emit('onTermLoad', term.value);
      }
      //TODO: Use Thesaurus API
    } catch (error) {
      error.value = error;
      console.error(`Error loading term ${value.value}`, error);
    }
  }

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("span", _hoisted_1$2, [
    (error.value)
      ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$1, "Error loading term " + vue.toDisplayString(__props.value.identifier), 1 /* TEXT */))
      : vue.createCommentVNode("v-if", true),
    vue.createTextVNode(" " + vue.toDisplayString(vue.unref(lstring)(term.value, __props.locale)) + " ", 1 /* TEXT */),
    vue.renderSlot(_ctx.$slots, "help", { term: term.value })
  ]))
}
}

};

script$2.__scopeId = "data-v-35cfd734";
script$2.__file = "src/components/controls/view/km-term.vue";

const _hoisted_1$1 = ["id"];
const _hoisted_2 = ["dir"];


var script$1 = {
  __name: 'km-value-term',
  props: {
  value: { type: Object, required: true },
  locale: { type: String, required: true },
},
  setup(__props) {
const termValue = vue.ref(null);

const onTermLoad = function(term){
    termValue.value = { title: 'SCBD Term' };
    // thesaurusStore.loadTerm(`lang-${term}`);
};

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("div", {
    id: _ctx.$attrs.id,
    class: "scbd-controls km-value-term"
  }, [
    vue.createElementVNode("div", {
      class: vue.normalizeClass(`input-group input-lang-${__props.locale}`)
    }, [
      vue.createElementVNode("div", {
        class: "form-control km-value",
        dir: vue.unref(direction)(termValue.value?.title, __props.locale)
      }, [
        vue.createVNode(script$2, {
          value: __props.value,
          locale: __props.locale,
          onOnTermLoad: onTermLoad
        }, null, 8 /* PROPS */, ["value", "locale"])
      ], 8 /* PROPS */, _hoisted_2)
    ], 2 /* CLASS */)
  ], 8 /* PROPS */, _hoisted_1$1))
}
}

};

script$1.__scopeId = "data-v-49bcf87c";
script$1.__file = "src/components/controls/view/km-value-term.vue";

const _hoisted_1 = ["id"];



var script = {
  __name: 'km-value-terms',
  props: {
  value: { type: Array, required: true },
  locale: { type: String, required: true },
},
  setup(__props) {

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("div", {
    id: _ctx.$attrs.id,
    class: "scbd-controls km-value-terms d-grid gap-1"
  }, [
    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.value, (term) => {
      return (vue.openBlock(), vue.createElementBlock("div", { key: term }, [
        vue.createVNode(script$1, {
          value: term,
          locale: __props.locale
        }, null, 8 /* PROPS */, ["value", "locale"])
      ]))
    }), 128 /* KEYED_FRAGMENT */))
  ], 8 /* PROPS */, _hoisted_1))
}
}

};

script.__scopeId = "data-v-e68ad4be";
script.__file = "src/components/controls/view/km-value-terms.vue";

module.exports = script;
//# sourceMappingURL=km-value-terms.cjs.map
