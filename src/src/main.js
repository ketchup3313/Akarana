import { createApp } from 'vue'
import App from './App.vue'
import './common/base.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store'
import router from './router'
import VueGoogleMap from 'vue3-google-map';

import 'element-plus/dist/index.css'
import '../src/variables.scss';
const app = createApp(App);
const el = document.documentElement
getComputedStyle(el).getPropertyValue(`--el-color-primary`)
el.style.setProperty('--el-color-primary', '#ff8936')



app.use(store);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) { 
  app.component(key, component);
}

app.use(VueGoogleMap, {
  apiKey: 'AIzaSyCxrtNSk-hXR0-pnj8FK4m0EVEHR9qShP0',
});
window.initMap = () => {};
app.use(router);
app.mount('#app');
