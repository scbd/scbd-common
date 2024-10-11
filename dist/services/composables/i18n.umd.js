(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ScbdCommonServicesComposablesI18N = {}));
})(this, function (exports) {
  'use strict';

  const useI18n = () => {
    return {
      t: key => key,
      locale: 'en'
    };
  };
  exports.useI18n = useI18n;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
//# sourceMappingURL=i18n.umd.js.map
