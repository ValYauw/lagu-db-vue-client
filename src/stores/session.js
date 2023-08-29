import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';

export const useSessionStore = defineStore('session', {
  state: () => {
    return {
      isLoggedIn: false,
      role: null
    }
  },
  getters: { },
  actions: {
    async login(email, password) {
      try {
        const { data } = await axios.post(
          `${this.$SERVER_URL}/login`,
          { email, password }
        );
        const { access_token } = data;
        localStorage.setItem('access_token', access_token);
        this.isLoggedIn = true;
        router.push('/');
        this.$fireSuccessMessage('You have successfully logged in');
      } catch(err) {
        this.$fireErrorMessage(err);
      }
    },
    async register(username, email, password) {
      try {
        const { data } = await axios.post(
          `${this.$SERVER_URL}/register`,
          { username, email, password }
        );
        await this.login(email, password);
      } catch(err) {
        this.$fireErrorMessage(err);
      }
    },
    async logout() {
      localStorage.removeItem('access_token');
      this.isLoggedIn = false;
      router.push('/');
      this.$fireSuccessMessage('You have been logged out');
    }
  }
})