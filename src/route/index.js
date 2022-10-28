import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Encore from '../views/Encore.vue'
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
    path: '/DALeng/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/DALeng/encore/:vol',
    name: 'Encore',
    component: Encore,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/DALeng/section/:id',
    name: 'Section',
    component: Section,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/DALeng/edit/:id',
    name: 'Edit',
    component: Edit,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/DALeng/admin',
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