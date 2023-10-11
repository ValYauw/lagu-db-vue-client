import '@/assets/style.css';
import '@/assets/icon.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import toastPlugin from './plugins/toast-plugin';
import vuetify from './plugins/vuetify';
import vue3GoogleLogin from 'vue3-google-login';
// import LoadScript from 'vue-plugin-load-script';

const pinia = createPinia();
pinia.use(() => { return {$SERVER_URL: import.meta.env.VITE_API_URL }});
pinia.use(toastPlugin);

const app = createApp(App);
app
  // .use(LoadScript)
  .use(pinia)
  .use(vuetify)
  .use(vue3GoogleLogin, {
    clientId: import.meta.env.VITE_GOOGLE_LOGIN_CLIENT_ID
  })
  .use(router)
  .mount('#app');
