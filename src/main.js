import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css';

import router from './routes';
import store from './store';

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(App),
  router,
}).$mount('#app')
