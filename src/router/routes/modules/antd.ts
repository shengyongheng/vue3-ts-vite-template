import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const DASHBOARD: AppRouteRecordRaw = {
  path: '/antd',
  name: 'antd',
  component: DEFAULT_LAYOUT,
  redirect: '/antd/table',
  meta: {},
  children: [
    {
      path: 'table',
      name: 'table',
      component: () => import('@/views/antd/pages/table/demos/index.vue'),
      meta: {}
    },
    {
      path: 'form',
      name: 'form',
      component: () => import('@/views/antd/pages/form/demos/index.vue'),
      meta: {}
    }
  ]
}

export default DASHBOARD
