import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/collections/',
    name: 'collections',
    component: () => import('../views/Collections.vue')
  },
  {
    path: '/collections/:collection_id/',
    name: 'collection',
    component: () => import('../views/Collection.vue')
  },
  {
    path: '/collections/:collection_id/items/',
    name: 'items',
    component: () => import('../views/Items.vue')
  },
  {
    path: '/collections/:collection_id/items/:id/',
    name: 'item',
    component: () => import('../views/Item.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
