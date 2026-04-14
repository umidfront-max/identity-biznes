import { PERMISSION_ENUM } from '../../pemissionsEnum'
import { VabRouteRecordRaw } from '/@/router/types.ts'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

export const branches: VabRouteRecordRaw[] = [
  {
    path: 'branches',
    name: 'branches',
    component: () => import('/@/views/management/branches/index.vue'),
    meta: {
      title: t('management_branches.meta.title'),
      icon: 'hand-coin-fill',
      noClosable: false,
      role: PERMISSION_ENUM.branch_view_all,
    },
  },
  {
    path: 'branch',
    name: 'single-branch',
    component: () => import('/src/views/management/branches/singleBranch.vue'),
    meta: {
      hidden: true,
      noClosable: false,
      title: t('management_branches.meta.single_title'),
      activeMenu: '/management/users',
      dynamicNewTab: true,
      role: PERMISSION_ENUM.branch_view,
    },
  },
]
