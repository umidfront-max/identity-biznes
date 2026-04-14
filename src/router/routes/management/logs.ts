import { PERMISSION_ENUM } from '../../pemissionsEnum'
import { VabRouteRecordRaw } from '/@/router/types.ts'

export const logs: VabRouteRecordRaw[] = [
  {
    path: 'logs',
    name: 'logs',
    component: () => import('/@/views/management/activeLogs/index.vue'),
    meta: {
      title: 'Logs',
      icon: 'hand-coin-fill',
      noClosable: false,
      role: PERMISSION_ENUM.activity_log_view_all,
    },
  },
]
