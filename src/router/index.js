import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Client = () => import('../views/client.vue')
const Discover = () => import ('../views/discover.vue')
const Friend = () => import ('../views/friend.vue')
const Musician = () => import ('../views/musician.vue')
const My = () => import ('../views/my.vue')
const Shopping = () => import ('../views/shopping.vue')

const routes = [
  {
    path: '/',
    redirect : '/discover'
  },
  {
    path: '/client',
    component : Client
  },
  {
    path: '/discover',
    component : Discover
  },
    {
    path: '/friend',
    component : Friend
  } ,
    {
    path: '/musician',
    component : Musician
  },
  {
    path: '/my',
    component : My
  },
  {
    path: '/shopping',
    component : Shopping
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
