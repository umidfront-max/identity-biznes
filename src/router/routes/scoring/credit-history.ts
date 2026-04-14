import { PERMISSION_ENUM } from '../../pemissionsEnum'
import { VabRouteRecordRaw } from '/@/router/types.ts'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

export const creditHistory: VabRouteRecordRaw[] = [
  {
    path: 'credit-history',
    name: 'Credit History',
    component: () => import('../../../views/scoring/credit-history/creditHistory.vue'),
    meta: {
      title: t('scoring_credit.meta.title'),
      icon: 'hand-coin-fill',
      noClosable: false,
      role: PERMISSION_ENUM.scoring_credit_history_view_all,
    },
  },
  {
    path: 'single-credit-history',
    name: 'Single Credit History',
    component: () => import('../../../views/scoring/credit-history/singleCreditHistory.vue'),
    meta: {
      title: t('scoring_credit.meta.single_title'),
      icon: 'hand-coin-fill',
      noClosable: false,
      activeMenu: '/scoring/credit-history',
      hidden: true,
      role: PERMISSION_ENUM.scoring_credit_history_view,
    },
  },
]
