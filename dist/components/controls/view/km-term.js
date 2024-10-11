import { ref, openBlock, createElementBlock, toDisplayString, createCommentVNode, createTextVNode, unref, renderSlot } from 'vue';
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

const _hoisted_1 = { class: "scbd-controls km-term" };
const _hoisted_2 = {
  key: 0,
  class: "alert alert-danger",
  role: "alert"
};


var script = {
  __name: 'km-term',
  props: {
  value: { type: Object, required: true },
  locale: { type: String, required: true },
},
  emits: ['onTermLoad'],
  setup(__props, { emit: __emit }) {

const emit = __emit;
const props = __props;

const term = ref(null);
const error = ref(null);

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
  return (openBlock(), createElementBlock("span", _hoisted_1, [
    (error.value)
      ? (openBlock(), createElementBlock("div", _hoisted_2, "Error loading term " + toDisplayString(__props.value.identifier), 1 /* TEXT */))
      : createCommentVNode("v-if", true),
    createTextVNode(" " + toDisplayString(unref(lstring)(term.value, __props.locale)) + " ", 1 /* TEXT */),
    renderSlot(_ctx.$slots, "help", { term: term.value })
  ]))
}
}

};

script.__scopeId = "data-v-35cfd734";
script.__file = "src/components/controls/view/km-term.vue";

export { script as default };
//# sourceMappingURL=km-term.js.map
