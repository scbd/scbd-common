
import { inject, computed } from "vue"

const defaultInjectKey = 'auth';

export function useAuth (key = defaultInjectKey) {
    return inject(key);
}
  
export function useUser (key = defaultInjectKey) {
    const auth = useAuth(key);
  
    return computed(() => {
      return auth.user();
    });
}