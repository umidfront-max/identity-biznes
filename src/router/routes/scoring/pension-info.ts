import { PERMISSION_ENUM } from '../../pemissionsEnum'
import { VabRouteRecordRaw } from '/@/router/types.ts'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

export const pensionInfo: VabRouteRecordRaw[] = [
  {
    path: 'pension-info',
    name: 'Pension Info',
    component: () => import('../../../views/scoring/pension-info/index.vue'),
    meta: {
      title: t('scoring_pension.meta.title'),
      icon: 'hand-coin-fill',
      noClosable: false,
      role: PERMISSION_ENUM.scoring_pension_info_view_all,
    },
  },
  {
    path: 'single-pension-info',
    name: 'Single Pension Info',
    component: () => import('../../../views/scoring/pension-info/singlePensionInfo.vue'),
    meta: {
      title: t('scoring_pension.meta.single_title'),
      icon: 'hand-coin-fill',
      noClosable: false,
      activeMenu: '/scoring/pension-info',
      hidden: true,
      role: PERMISSION_ENUM.scoring_pension_info_view,
    },
  },
]
