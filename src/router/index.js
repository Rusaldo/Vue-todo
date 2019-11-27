import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'all',
    component: () => import('../views/All.vue')
  },
  {
    path: '/category/:id',
    name: 'category',
    component: () => import('../views/Category.vue'),
    props: true
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/NotFound.vue')
  },
  {
    path: '*',
    redirect: { name: '404' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
