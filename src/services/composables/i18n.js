import { useI18n as realUseI18n } from "vue-i18n";

export const useI18n = (options = {}) => {

  const { messages, locale } = options;

  if(messages) {
    const keys = Object.keys(messages);
    const hasOnlyLocales = keys.every(k=>/^[a-z]{2}$/.test(k));

    if(!hasOnlyLocales) {
      options = {
        ...options,
        messages : { 
          [locale||'en'] : { ...messages } 
        }
      }
    }
  }

  return realUseI18n(options);
};
