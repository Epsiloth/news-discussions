import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/login.vue'
import Privado from '../components/privado.vue'
import Register from '../components/register.vue'

Vue.use(VueRouter)

 const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  { path: '/register', component: Register},
  { path: '/landing', component: Privado, meta: {
    requiresAuth: true
  } }
]

const router = new VueRouter({
  routes
})

export default router
