import { inject, computed } from 'vue';

const defaultInjectKey = 'auth';

function useAuth (key = defaultInjectKey) {
    return inject(key);
}
  
function useUser (key = defaultInjectKey) {
    const auth = useAuth(key);
  
    return computed(() => {
      return auth.user();
    });
}

export { useAuth, useUser };
//# sourceMappingURL=useAuth.js.map
