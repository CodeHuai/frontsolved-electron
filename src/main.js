import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

// 引入 tailwindcss
import './styles/indes.scss'

createApp(App).use(store).use(router).mount('#app')
