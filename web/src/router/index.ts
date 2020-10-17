import { createRouter, /* createWebHistory, */ createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
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
    path: '/message_board',
    name: 'messageBoard',
    component: () => import(/* webpackChunkName: "about" */ '../views/messageBoard.vue')
  },
  // 游戏
  {
    path: '/game',
    name: 'game',
    component: () => import(/* webpackChunkName: "about" */ '../views/game/index.vue'),
    children: [
      {
        path: 'shop',
        name: 'gameShop',
        component: () => import(/* webpackChunkName: "about" */ '../views/game/shop.vue')
      },
      {
        path: 'tavern',
        name: 'gameTavern',
        component: () => import(/* webpackChunkName: "about" */ '../views/game/tavern.vue')
      },
      {
        path: 'adventure',
        name: 'gameAdventure',
        component: () => import(/* webpackChunkName: "about" */ '../views/game/adventure.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
