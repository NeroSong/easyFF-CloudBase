import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Cloudbase from "@cloudbase/vue-provider";


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Cloudbase, {
  env: " nero-lib-1gxdadxufcb31d0b"
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
