// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import "~/vendor.js"
import Vue from 'vue';
import Vuex from 'vuex'
import {store} from '~/store'
import ElementUI from 'element-ui';
import '@/element-ui/lib/theme-chalk/index.css';
import uploader from 'vue-simple-uploader';
import App from './App';

// import md5 from 'js-md5';

Vue.config.productionTip = false

// Vue.use(md5);
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(uploader);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
