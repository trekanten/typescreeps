import Vue from 'vue';
import { api } from './plugins/api';

import App from './App.vue';
import router from './router';
import { vueStore } from './store';

import Vuetify from 'vuetify';
import VeeValidate from 'vee-validate';
import { plugin } from 'vue-function-api';

Vue.use(Vuetify);
Vue.use(VeeValidate);
Vue.use(plugin);

Vue.config.productionTip = false;

Vue.prototype.$api = api;

new Vue({
  router,
  store: vueStore,
  render: h => h(App),
}).$mount('#app');
