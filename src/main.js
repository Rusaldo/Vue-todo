import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import Vuelidate from 'vuelidate'

import './assets/styles/buefy.scss'
import 'nprogress/nprogress.css'

Vue.use(Buefy)
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
