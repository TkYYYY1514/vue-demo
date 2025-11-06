import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/books',
    name: 'books',
    component: () => import('../views/BooksView.vue')
  },
  {
    path: '/borrow',
    name: 'borrow',
    component: () => import('../views/BorrowView.vue')
  },
  {
    path: '/statistics', 
    name: 'statistics',
    component: () => import('../views/StatisticsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router