import { openBlock, createElementBlock, createElementVNode, normalizeClass, unref, toDisplayString } from 'vue';
import 'lodash';
import '@/services/composables/i18n';
import '@/services/filters/lstring';

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

const _hoisted_1 = ["id"];
const _hoisted_2 = ["dir"];
const _hoisted_3 = { key: 0 };
const _hoisted_4 = { key: 1 };
const _hoisted_5 = {
  class: "input-group-text",
  style: {"cursor":"default"}
};


var script = {
  __name: 'km-value-bool',
  props: {
  value: { type: Boolean, required: true },
  locale: { type: String, required: true }
},
  setup(__props) {

function t(str){
    //use 'vue-i18n' library
    return str;
}

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", {
    class: "scbd-controls km-value-bool",
    id: _ctx.$attrs.id
  }, [
    createElementVNode("div", {
      class: normalizeClass(`input-group input-lang-${__props.locale}`)
    }, [
      createElementVNode("div", {
        class: "form-control km-value",
        dir: unref(direction)(__props.value, __props.locale)
      }, [
        (__props.value)
          ? (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString(t('yes')), 1 /* TEXT */))
          : (openBlock(), createElementBlock("span", _hoisted_4, toDisplayString(t('no')), 1 /* TEXT */))
      ], 8 /* PROPS */, _hoisted_2),
      createElementVNode("span", _hoisted_5, toDisplayString(__props.locale.toUpperCase()), 1 /* TEXT */)
    ], 2 /* CLASS */)
  ], 8 /* PROPS */, _hoisted_1))
}
}

};

script.__scopeId = "data-v-cdc3e980";
script.__file = "src/components/controls/view/km-value-bool.vue";

export { script as default };
//# sourceMappingURL=km-value-bool.js.map
