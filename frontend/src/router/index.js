import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Inicio from '../views/Inicio.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { title: 'SNRKS: Login' }
  },
  {
    path: '/Inicio',
    name: 'SNKRS: Inicio',
    component: Inicio,
    meta: { title: 'SNRKS: Inicio' }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
