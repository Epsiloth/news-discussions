import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal'

import './registerServiceWorker'

import router from './router'

import firebase from 'firebase'
import { firestorePlugin } from 'vuefire'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

window.$ = window.jQuery = require('jquery')

Vue.use(VModal)

Vue.use(firebase) 
// Install BootstrapVue
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
