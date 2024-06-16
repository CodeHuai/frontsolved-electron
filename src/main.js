import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

// 引入 tailwindcss
import './styles/indes.scss'
// 引入 lib
import lib from './lib/index'

createApp(App).use(lib).use(store).use(router).mount('#app')
