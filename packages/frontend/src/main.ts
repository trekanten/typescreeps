import Vue from 'vue';
import { api } from './plugins/api';

import App from './App.vue';
import router from './router';
import store from './store';

import Vuetify from 'vuetify';
import VeeValidate from 'vee-validate';

Vue.use(Vuetify);
Vue.use(VeeValidate);

Vue.config.productionTip = false;

Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
