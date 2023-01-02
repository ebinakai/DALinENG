import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Book from '../views/Book.vue'
import Section from '../views/Section.vue'
import Edit from '../views/Edit.vue'
import ControlPanel from '../views/ControlPanel.vue'
import { authorizeToken } from './guards'

const routes = [
  {
    path: '/login/',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/book/:vol',
    name: 'Book',
    component: Book,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/section/:id',
    name: 'Section',
    component: Section,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: Edit,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'ControlPanel',
    component: ControlPanel,
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(authorizeToken);

export default router