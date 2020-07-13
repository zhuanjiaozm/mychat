import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import * as http from './http/http';
import moment from 'moment'

Vue.use(Vant);

Vue.config.productionTip = false;
Vue.prototype.$axios = http; // 全局注册，使用方法为:this.$axios
Vue.prototype.$moment = moment;//赋值使用
const vue = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

export default vue;
