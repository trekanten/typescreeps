import Vue from 'vue';
import Vuetify from 'vuetify';
import { api } from './plugins/api';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Vuetify);

Vue.config.productionTip = false;

Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
