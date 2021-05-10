import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../pages/home.vue'),
    meta: {
      index:1,
      keepAlive: true
    }
  },
  {
    path: '/lyrics',
    name: 'lyrics',
    component: () => import(/* webpackChunkName: "about" */ '../pages/lyrics.vue'),
    meta: {
      title: '歌曲详情',
      index:2,
      keepAlive: false
    }
  },
  {
    path: '/playsmall',
    name: 'playsmall',
    component: () => import(/* webpackChunkName: "about" */ '../pages/playsmall.vue')
  },
  {
    path: '/emptyle',
    name: 'emptyle',
    component: () => import(/* webpackChunkName: "about" */ '../components/emptyle.vue')
  },
  {
    path: '/album_list_item',
    name: 'album_list_item',
    component: () => import(/* webpackChunkName: "about" */ '../components/album_list_item.vue')
  },
  {
    path: '/songslist',
    name: 'songslist',
    component: () => import(/* webpackChunkName: "about" */ '../pages/songslist.vue')
  },
  {
    path: '/playlist_hot',
    name: 'playlist_hot',
    component: () => import(/* webpackChunkName: "about" */ '../pages/playlist_hot.vue'),
    meta: {
      title: '热门歌单',
      keepAlive: false
    }
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: () => import(/* webpackChunkName: "about" */ '../pages/playlist.vue'),
    meta: {
      title: '歌单详情',
      keepAlive: false
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
