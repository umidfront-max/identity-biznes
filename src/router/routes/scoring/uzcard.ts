import { PERMISSION_ENUM } from '../../pemissionsEnum'
import { VabRouteRecordRaw } from '/@/router/types.ts'

export const uzcard: VabRouteRecordRaw[] = [
  {
    path: 'uzcard',
    name: 'Uzcard',
    component: () => import('../../../views/scoring/uzcard/index.vue'),
    meta: {
      title: 'Uzcard',
      icon: 'hand-coin-fill',
      noClosable: false,
      role: PERMISSION_ENUM.scoring_uzcard_view_all,
    },
  },
  {
    path: 'single-uzcard',
    name: 'Single Uzcard',
    component: () => import('../../../views/scoring/uzcard/singleUzcard.vue'),
    meta: {
      title: 'Single Uzcard',
      icon: 'hand-coin-fill',
      noClosable: false,
      activeMenu: '/scoring/uzcard',
      hidden: true,
      role: PERMISSION_ENUM.scoring_uzcard_view,
    },
  },
  {
    path: 'create-uzcard',
    name: 'Create Uzcard',
    component: () => import('../../../views/scoring/uzcard/createUzcard.vue'),
    meta: {
      title: 'Create Uzcard',
      icon: 'hand-coin-fill',
      noClosable: false,
      activeMenu: '/scoring/uzcard',
      hidden: true,
      role: PERMISSION_ENUM.scoring_uzcard_create,
    },
  },
]
