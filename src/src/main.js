import { createApp } from 'vue'
import App from './App.vue'
import './common/base.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store'
import router from './router'
const app = createApp(App)
app.use(store);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}



app.use(router).mount('#app')
