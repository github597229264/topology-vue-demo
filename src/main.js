import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/global.css';   //全局样式
import store from '@/store/';

Vue.config.productionTip = false;
Vue.prototype.$store = store;
Vue.use(ElementUI, {
  size: 'medium'
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
