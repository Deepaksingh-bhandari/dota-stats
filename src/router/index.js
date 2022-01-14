import { createRouter, createWebHistory } from 'vue-router'
import HeroStats from '../views/HeroStats.vue'
import PlayerStats from '../views/PlayerStats.vue'

const routes = [
  {
    path: '/',
    name: 'HeroStats',
    component: HeroStats
  },
  {
    path: '/player-stats',
    name: 'PlayerStats',
    component: PlayerStats
    // component: () => import(/* webpackChunkName: "about" */ '../views/PlayerStats.vue')
  },
  // {
  //   path: '/player-stats',
  //   name: 'PlayerStats',
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
