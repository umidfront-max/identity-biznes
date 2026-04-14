import { PERMISSION_ENUM } from '../../pemissionsEnum'
import { VabRouteRecordRaw } from '/@/router/types.ts'

export const humo: VabRouteRecordRaw[] = [
  {
    path: 'humo',
    name: 'Humo',
    component: () => import('../../../views/scoring/humo/index.vue'),
    meta: {
      title: 'Humo',
      icon: 'hand-coin-fill',
      noClosable: false,
      role: PERMISSION_ENUM.scoring_humo_view_all,
    },
  },
  {
    path: 'single-humo',
    name: 'Single Humo',
    component: () => import('../../../views/scoring/humo/singleHumo.vue'),
    meta: {
      title: 'Single Humo',
      icon: 'hand-coin-fill',
      noClosable: false,
      activeMenu: '/humo',
      hidden: true,
      role: PERMISSION_ENUM.scoring_humo_view,
    },
  },
  {
    path: 'create-humo',
    name: 'Create Humo',
    component: () => import('../../../views/scoring/humo/createHumo.vue'),
    meta: {
      title: 'Create Humo',
      icon: 'hand-coin-fill',
      noClosable: false,
      activeMenu: '/humo',
      hidden: true,
      role: PERMISSION_ENUM.scoring_humo_create,
    },
  },
]
