import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import VueClipboard from "vue-clipboard2"
import Cloudbase from "@cloudbase/vue-provider"
import config from "../cloudbaserc"

Vue.config.productionTip = false

Vue.use(Cloudbase, {
  env: process.env.VUE_APP_ENV_ID || config.envId,
})
Vue.use(ElementUI)
Vue.use(VueClipboard)

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app")
