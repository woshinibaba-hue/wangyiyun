import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Client = () => import('../views/client.vue')
const Discover = () => import('../views/discover/discover.vue')
const Friend = () => import('../views/friend.vue')
const Musician = () => import('../views/musician.vue')
const My = () => import('../views/my.vue')
const Shopping = () => import('../views/shopping.vue')
const Putaway = () => import('../views/discover/Child/putaway.vue')
const Ranking = () => import('../views/discover/Child/ranking.vue')
const Recommend = () => import('../views/discover/Child/recommend.vue')
const Sing = () => import('../views/discover/Child/sing.vue')
const Song = () => import('../views/discover/Child/song.vue')
const Station = () => import('../views/discover/Child/station.vue')
const Search = () => import('../views/search.vue')
const User = () => import('../views/User/index.vue')
const SongList = () => import('../views/User/Chlid/SongList.vue')

const routes = [
  {
    path: '/',
    redirect: '/discover'
  },
  {
    path: '/client',
    component: Client
  },
  {
    path: '/discover',
    component: Discover,
    children: [
      {
        path: '/',
        redirect: 'recommend'
      },
      {
        path: 'putaway',
        component: Putaway
      },
      {
        path: 'ranking',
        component: Ranking
      },
      {
        path: 'recommend',
        component: Recommend
      },
      {
        path: 'sing',
        component: Sing
      },
      {
        path: 'song',
        component: Song
      },
      {
        path: 'station',
        component: Station
      }
    ]
  },
  {
    path: '/friend',
    component: Friend
  },
  {
    path: '/musician',
    component: Musician
  },
  {
    path: '/my',
    component: My
  },
  {
    path: '/shopping',
    component: Shopping
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/user',
    component: User,
    children: [
      {
        path: 'songlist',
        component: SongList
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
