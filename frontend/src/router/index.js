import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Inicio from '@/views/Inicio.vue'
import Register from '@/views/Register.vue'
import Perfil from '@/views/Perfil.vue'
import CompraVenta from '@/views/CompraVenta.vue'
import Tracking from '@/views/Tracking.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { title: 'SNRKS: Login' }
  },
  {
    path: '/Login',
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
    path: '/Register',
    name: 'SNRKS: Register',
    component: Register,
    meta: { title: 'SNRKS: Registro'}
  },
  {
    path: '/User',
    name: 'SNRKS: Perfil',
    component: Perfil,
    meta: { title: 'SNRKS: Perfil'}
  },
  {
    path: '/Mercado',
    name: 'SNRKS: Mercado',
    component: CompraVenta,
    meta: { title: 'SNRKS: Mercado'}
  },
  {
    path: '/Tracking',
    name: 'SNRKS: Tracking',
    component: Tracking,
    meta: { title: 'SNRKS: Tracking'}
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
