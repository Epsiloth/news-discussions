import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/login.vue'
import Privado from '../components/privado.vue'
import Register from '../components/register.vue'

Vue.use(VueRouter)

 const routes = [
  { path: '/', component: Login, meta: {
  	guest: true
  } },
  { path: '/login', component: Login, meta: {
  	guest: true
  }  },
  { path: '/register', component: Register, meta: {
  	guest: true
  } },
  { path: '/landing', component: Privado, meta: {
    auth: true
  } }
]

const router = new VueRouter({
  routes
})

export default router
