import { createApp } from 'vue'
import App from './App.vue'
import './common/base.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
import {createPinia} from 'pinia'
const app = createApp(App)
createApp(App).use(createPinia()).mount('#app') 
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router).mount('#app')
