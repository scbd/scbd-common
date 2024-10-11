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

export { direction, localeDirection, lstring, lstringLocale };
//# sourceMappingURL=lstring.js.map
