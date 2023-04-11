import { createApp } from 'vue'
// 引入全局样式
import './styles/index.scss'
import router from "./router/index"
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//pinia
import { createPinia } from 'pinia'

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const pinia = createPinia()

const app = createApp(App);

// 注册Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router).use(ElementPlus).use(pinia).mount('#app')
