import Vue from 'vue'
import App from './App.vue'

import './registerServiceWorker'

import router from './router'

import firebase from 'firebase'
import { firestorePlugin } from 'vuefire'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(firebase) 
// Install BootstrapVue
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
