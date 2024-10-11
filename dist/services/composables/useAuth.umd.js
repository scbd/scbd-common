(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) : typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ScbdCommonServicesComposablesUseAuth = {}, global.vue));
})(this, function (exports, vue) {
  'use strict';

  const defaultInjectKey = 'auth';
  function useAuth() {
    let key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultInjectKey;
    return vue.inject(key);
  }
  function useUser() {
    let key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultInjectKey;
    const auth = useAuth(key);
    return vue.computed(() => {
      return auth.user();
    });
  }
  exports.useAuth = useAuth;
  exports.useUser = useUser;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
//# sourceMappingURL=useAuth.umd.js.map
