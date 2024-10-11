(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ScbdCommonServicesComposablesThesaurus = {}));
})(this, function (exports) {
  'use strict';

  const useThesaurus = () => {
    return {
      getDomainTerms: item => {
        return [];
      },
      loadDomainTerms: item => {
        return [];
      }
    };
  };
  exports.useThesaurus = useThesaurus;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
//# sourceMappingURL=thesaurus.umd.js.map
