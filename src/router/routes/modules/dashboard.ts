import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const DASHBOARD: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  component: DEFAULT_LAYOUT,
  redirect: '/dashboard/workplace',
  meta: {},
  children: [
    {
      path: 'workplace',
      name: 'Workplace',
      component: () => import('@/views/dashboard/pages/workplace/index.vue'),
      meta: {}
    },
    {
      path: 'large-file',
      name: 'larg-file',
      component: () =>
        import('@/views/dashboard/pages/large-file-upload/index.vue'),
      meta: {}
    },
    {
      path: 'vue2',
      name: 'vue2',
      component: () => import('@/views/dashboard/pages/vue2/index.vue'),
      meta: {}
    },
    {
      path: 'communication',
      name: 'communication',
      component: () =>
        import('@/views/dashboard/pages/communications/index.vue'),
      meta: {}
    }
  ]
}

export default DASHBOARD
