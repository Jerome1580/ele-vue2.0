// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Axios from 'axios';
import router from './router';
import filters from './filters'

Vue.config.productionTip = false;

import '@/common/stylus/index.styl'

//Vue.filter(名字，函数)  添加自定义过滤器
//循环定义多个过滤器
Object.keys(filters).forEach((key) => Vue.filter(key, filters[key]));

Vue.prototype.$http = Axios;


/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
