(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ScbdCommonServicesUtilUtils = {}));
})(this, function (exports) {
  'use strict';

  const useLogger = () => {
    return {
      error
    };
  };
  function error(appError, userMessage) {
    if (![404, 401, 403].includes(appError === null || appError === void 0 ? void 0 : appError.status)) {
      try {
        console.error(appError);
        const {
          ACCOUNTS_HOST_URL,
          TAG,
          COMMIT
        } = useRuntimeConfig().public;
        const realmConfStore = useRealmConfStore();
        const realmConf = realmConfStore.realmConf;
        //TODO: send error to server
        const errorLog = {
          stack: JSON.stringify(appError, Object.getOwnPropertyNames(appError)),
          message: JSON.stringify(userMessage || (appError === null || appError === void 0 ? void 0 : appError.message) || 'unknown'),
          url: window.location.href,
          userAgent: window.navigator.userAgent,
          ver: TAG || COMMIT,
          timestamp: new Date(),
          realm: realmConf.realm
        };
        useAPIFetch('/error-logs', {
          method: 'POST',
          body: errorLog
        });
      } catch (err) {
        console.error(err, 'error sending error log to server.');
      }
    }
    if (userMessage) {
      const $toast = useToast();
      $toast.error(userMessage, {
        position: 'top-right'
      });
    }
  }
  exports.useLogger = useLogger;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
//# sourceMappingURL=utils.umd.js.map
