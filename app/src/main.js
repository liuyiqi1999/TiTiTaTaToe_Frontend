import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import vuetify from '@/plugins/vuetify'
import store from '@/store/store'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
axios.defaults.baseURL = "http://localhost:8889/"
Vue.prototype.$axios = axios

new Vue({
  store,
  router,
  render: h => h(App),
  vuetify,
}).$mount('#app')
