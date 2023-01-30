import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'lib-flexible/flexible.js'
import 'reset-css'
import '@/assets/svg/index.js'
import svgIcon from '@/assets/svg/icon.vue'
const app = createApp(App)
const store = createPinia()
app.component('svg-icon', svgIcon)
app.use(store)
app.use(router)
app.mount('#app')
