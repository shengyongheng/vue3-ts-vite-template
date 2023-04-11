import {
    createRouter,
    // createWebHistory,
    createWebHashHistory,
    RouteRecordRaw
} from "vue-router";


let routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        meta: {},
        component: () => import('../views/home/index.vue')
    },
    //{
    //配置404页面
    //path: '/:catchAll(.*)',
    //name: '404',
    //component: () => import(''),
    //}
]
// 路由
const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior: () => ({ left: 0, top: 0 }), // 刷新时，滚动条位置还原
    // routes: routes as RouteRecordRaw[], 类型断言写法
})
// 导出
export default router 