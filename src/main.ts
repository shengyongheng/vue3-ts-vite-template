import { createApp } from "vue";
// 引入全局样式
import "./styles/index.scss";
import router from "./router/index";
import App from "./App.vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

//pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

// 注册Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 环境变量
// console.log(import.meta.env, 'import.meta.env');

app.use(router).use(ElementPlus).use(pinia).mount("#app");
