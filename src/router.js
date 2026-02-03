import { createRouter, createWebHistory } from 'vue-router'
import GridPage from './pages/GridPage.vue'
import LikedPage from './pages/LikedPage.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: GridPage },
    { path: '/liked', component: LikedPage },
  ],
})
