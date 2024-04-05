export const useI18n = (options = {}) => {
  const locale = options.locale || "en";
  let { messages } = options || {};
  if (!messages[locale]) {
    messages = { [locale]: messages };
  }
  return {
    t: (key) => messages[locale][key],
    tc: (key, count) => {
      if (count == 1) {
        return key;
      } else {
        return key + "s";
      }
    },
    locale: "en",
  };
};
