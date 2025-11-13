// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/bookshelf',
      name: 'bookshelf',
      // 暂时使用HomeView，你可以创建新的组件
      component: () => import('../views/BookshelfView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      // 暂时使用HomeView，你可以创建新的组件
      component: () => import('../views/ProfileView.vue')
    }
  ]
})

export default router