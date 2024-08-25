import { createRouter, createWebHashHistory } from "vue-router";
import { appRoutes } from "./routes";
import { NOT_FOUND_ROUTE } from "./routes/base";

const routes = [
  {
    path: "/",
    redirect: "login"
  },
  {
    path: "/login",
    name: "login",
    meta: {},
    component: () => import("@/views/login/index.vue")
  },
  ...appRoutes,
  NOT_FOUND_ROUTE
];
// 路由
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }) // 刷新时，滚动条位置还原
});
// 导出
export default router;
