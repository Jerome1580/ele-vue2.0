// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Axios from 'axios';
import router from './router';

Vue.config.productionTip = false;

import '@/common/stylus/index.styl'

Vue.prototype.$http = Axios;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
