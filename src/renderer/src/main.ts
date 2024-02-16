// import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 全局引入css
// import '@/assets/glob.css'
console.log('./renderer/index.js')
const app = createApp(App)
app.use(ElementPlus)
// app.use(router)
// app.use(store, key)
app.mount('#app')
