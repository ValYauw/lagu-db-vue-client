import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import toastPlugin from './plugins/toast-plugin';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const pinia = createPinia();
pinia.use(() => { return {$SERVER_URL: 'http://localhost:3000'}});
pinia.use(toastPlugin);
const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
app
  .use(pinia)
  .use(vuetify)
  .use(router)
  .mount('#app');
