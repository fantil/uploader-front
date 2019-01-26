// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import "~/vendor.js"
import Vue from 'vue';
import App from './App'
import {store} from './store'
import router from './router'
import ElementUI from 'element-ui';
import '@/element-ui/lib/theme-chalk/index.css';
import uploader from 'vue-simple-uploader';
import 'styles/reset.css'
import 'styles/border.css'

// import md5 from 'js-md5';

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(uploader);


new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
