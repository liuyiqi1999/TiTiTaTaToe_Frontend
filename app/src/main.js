import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'
import store from '@/store/store'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
  vuetify,
}).$mount('#app')
