export const useI18n = (options = {}) => {
  const locale = options.locale || "en";
  let { messages } = options || {};
  if (!messages[locale]) {
    messages = { [locale]: messages };
  }
  return {
    t: (key) => messages[locale][key],
    tc: (key, count) => {
      const message = messages[locale][key];
      const parts = message.split(" | ");
      const arrayWithoutLastIndex = Array.from(
        { length: parts.length - 2 },
        (_, i) => i + 1
      );
      if (arrayWithoutLastIndex.includes(count)) {
        const errorIndex = arrayWithoutLastIndex.find(
          (index) => index === count
        );
        return parts[errorIndex].replace("{count}", count);
      } else {
        if (count !== undefined || count !== null) {
          return parts[parts.length - 1].replace("{count}", count);
        } else {
          return parts[parts.length - 1];
        }
      }
    },
    locale: "en",
  };
};
