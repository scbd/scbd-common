// const options = {
//     locale:"en",
//     messages:{
//         en:{
//             "remove":"Remove"
//         }
//     }
// }

export const useI18n = (options = {}) => {
  const locale = options.locale || "en";
  let { messages } = options || {};
  if (!messages[locale]) {
    messages = { [locale]: messages };
  }
  return {
    t: (key) => messages[locale][key],
    locale,
  };
};
