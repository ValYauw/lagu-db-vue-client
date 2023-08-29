import { useSessionStore } from '@/stores/session';
import jwt_decode from "jwt-decode";

export default function navigationGuard(to, from) {
  
  // List of restricted paths
  const restrictedPaths = {
    add: false
  };
  const store = useSessionStore();

  let hasToken = !!localStorage.getItem('access_token');
  let isAuthenticated = false;

  // Auto-logout client if token has expired
  if (hasToken) {
    const decodedToken = jwt_decode(token);
    isAuthenticated = (decodedToken.exp * 1000) > new Date().getTime();
    if (!isAuthenticated) {
      store.$toast.open({
        message: 'Token has expired',
        type: 'error'
      });
      store.logout();
      return { name: 'home' }
    }
    // Set global Pinia state
    store.isLoggedIn = true;
    store.role = decodedToken.role;
  }

  // Restrict login & register pages if already logged in
  if (isAuthenticated && (to.name === 'login' || to.name === 'register')) {
    store.$toast.open({
      message: 'Already signed in',
      type: 'error'
    })
    return { name: 'home' }
  }

  // Restrict various pages if not logged in as staff
  if (store.role === 'User' && restrictedPaths[to.name]) {
    store.$toast.open({
      message: 'You are not authorized',
      type: 'error'
    })
    return { name: 'home' }
  };

}