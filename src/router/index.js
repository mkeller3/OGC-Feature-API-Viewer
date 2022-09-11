import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/OGC-Feature-API-Viewer/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/OGC-Feature-API-Viewer/collections/',
    name: 'collections',
    component: () => import('../views/Collections.vue')
  },
  {
    path: '/OGC-Feature-API-Viewer/collections/:collection_id/',
    name: 'collection',
    component: () => import('../views/Collection.vue')
  },
  {
    path: '/OGC-Feature-API-Viewer/collections/:collection_id/items/',
    name: 'items',
    component: () => import('../views/Items.vue')
  },
  {
    path: '/OGC-Feature-API-Viewer/collections/:collection_id/items/:id/',
    name: 'item',
    component: () => import('../views/Item.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
