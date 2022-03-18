import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Inicio from '@/views/Inicio.vue'
import Register from '@/views/Register.vue'
import Perfil from '@/views/Perfil.vue'
import PerfilUser from '@/views/PerfilInfo.vue'
import Oferta from '@/views/Oferta.vue'
import Tracking from '@/views/Tracking.vue'
import Post from '@/views/Post.vue'
import auth from '@/logic/auth.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SNKRS: Login',
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
    path: '/Registro',
    name: 'SNRKS: Registro',
    component: Register,
    meta: { title: 'SNRKS: Registro'}
  },
  {
    path: '/User',
    name: 'SNRKS: Perfil personal',
    component: Perfil,
    meta: { title: 'SNRKS: Perfil'}
  },
  {
    path: '/User/:user',
    name: 'SNRKS: Perfil',
    component: PerfilUser,
    meta: { tittle: 'SNRKS: Perfil' }
  },
  {
    path: '/Post/:id',
    name: 'SNRKS: Post',
    component: Post,
    meta: { tittle: 'SNRKS: Post' }
  },
  {
    path: '/Oferta',
    name: 'SNRKS: Oferta',
    component: Oferta,
    meta: { title: 'SNRKS: Oferta'}
  },
  {
    path: '/Tracking',
    name: 'SNRKS: Tracking',
    component: Tracking,
    meta: { title: 'SNRKS: Tracking'}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Your Website Title';
  next();
})

router.beforeEach((to, from, next) => {
  if (to.path == '/Login' || to.path == '/' || to.path == '/Registro' ) {
      next();
  } else {
      console.log(auth.getUser().token);
      auth.validate(auth.getUser().token).then(() =>{
        next()
      }).catch(() => {
        next('Login');
      })

  }
});

export default router
