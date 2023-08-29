import '@/assets/style.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import toastPlugin from './plugins/toast-plugin';
import vuetify from './plugins/vuetify';
// import LoadScript from 'vue-plugin-load-script';

const pinia = createPinia();
pinia.use(() => { return {$SERVER_URL: 'http://localhost:3000'}});
pinia.use(toastPlugin);

const app = createApp(App);
app
  // .use(LoadScript)
  .use(pinia)
  .use(vuetify)
  .use(router)
  .mount('#app');
