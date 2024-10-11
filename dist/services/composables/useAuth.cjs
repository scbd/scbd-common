'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

const defaultInjectKey = 'auth';

function useAuth (key = defaultInjectKey) {
    return vue.inject(key);
}
  
function useUser (key = defaultInjectKey) {
    const auth = useAuth(key);
  
    return vue.computed(() => {
      return auth.user();
    });
}

exports.useAuth = useAuth;
exports.useUser = useUser;
//# sourceMappingURL=useAuth.cjs.map
