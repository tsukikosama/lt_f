import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import router  from './router/index';
import request from './utils/request';
import VueRouter from 'vue-router';

import store from './vuex/index.js'
Vue.prototype.request = request;

Vue.use(VueRouter);
// Vue.use(Vuex);
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
