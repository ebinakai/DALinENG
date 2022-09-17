import { createApp } from 'vue'
import './style.css'
import router from './route/index'
import App from './App.vue'

createApp(App).use(router).mount('#app')