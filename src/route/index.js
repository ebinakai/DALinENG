import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Encore from '../views/Encore.vue'
import Section from '../views/Section.vue'
import Edit from '../views/Edit.vue'
import ControlPanel from '../views/ControlPanel.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/encore/:vol',
    name: 'Encore',
    component: Encore,
    props: true,
  },
  {
    path: '/section/:id',
    name: 'Section',
    component: Section,
    props: true,
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: Edit,
    props: true,
  },
  {
    path: '/admin',
    name: 'ControlPanel',
    component: ControlPanel,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router