import { DEFAULT_LAYOUT } from "../base";
import { AppRouteRecordRaw } from "../types";

const DASHBOARD: AppRouteRecordRaw = {
  path: "/dashboard",
  name: "dashboard",
  component: DEFAULT_LAYOUT,
  redirect: "/dashboard/workplace",
  meta: {},
  children: [
    {
      path: "workplace",
      name: "Workplace",
      component: () => import("@/views/dashboard/pages/workplace/index.vue"),
      meta: {},
    },
  ],
};

export default DASHBOARD;
