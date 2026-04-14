import { PERMISSION_ENUM } from '../../pemissionsEnum'
import { VabRouteRecordRaw } from '/@/router/types.ts'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

export const Tax: VabRouteRecordRaw[] = [
  {
    path: 'tax',
    name: 'Tax',
    component: () => import('/@/views/scoring/tax/index.vue'),
    meta: {
      title: t('scoring_tax.meta.title'),
      icon: 'hand-coin-fill',
      noClosable: false,
      role: PERMISSION_ENUM.scoring_tax_info_view_all,
    },
  },
]
