import { PERMISSION_ENUM } from '../../pemissionsEnum'
import { VabRouteRecordRaw } from '/@/router/types.ts'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

export const inpsHistory: VabRouteRecordRaw[] = [
  {
    path: 'inps-history',
    name: 'Inps history',
    component: () => import('../../../views/scoring/inps-history/index.vue'),
    meta: {
      title: t('scoring_inps.meta.title'),
      icon: 'hand-coin-fill',
      noClosable: false,
      role: PERMISSION_ENUM.scoring_inps_history_view_all,
    },
  },
  {
    path: 'single-inps-history',
    name: 'Single Inps history',
    component: () => import('../../../views/scoring/inps-history/singleInpsHistory.vue'),
    meta: {
      title: t('scoring_inps.meta.single_title'),
      icon: 'hand-coin-fill',
      noClosable: false,
      activeMenu: '/scoring/inps-history',
      hidden: true,
      role: PERMISSION_ENUM.scoring_inps_history_view,
    },
  },
]
