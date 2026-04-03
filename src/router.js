import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

// Импортируйте ваши компоненты-страницы
import home from './pages/HomeView.vue'
import products from './pages/Potato-all.vue'
import product from './pages/Potato-one.vue'
import contact from './pages/Contact.vue'

const routes = [
  { 
    path: '/', 
    component: home 
  },
  { 
    path: '/products', 
    component: products 
  },
  { 
    path: '/product/:id',
    component: product 
  },
  { 
    path: '/contact', 
    component: contact 
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router