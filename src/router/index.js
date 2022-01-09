import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index'
import Enter from '@/views/Enter'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/enter',
    name: 'Enter',
    component: Enter
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
