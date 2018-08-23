// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import uploader from 'vue-simple-uploader';
import App from './App';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false


Vue.use(ElementUI)
Vue.use(uploader)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
