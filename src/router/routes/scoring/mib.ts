import { PERMISSION_ENUM } from '../../pemissionsEnum'
import { VabRouteRecordRaw } from '/@/router/types.ts'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

export const Mib: VabRouteRecordRaw[] = [
  {
    path: 'mib',
    name: 'Mib',
    component: () => import('/@/views/scoring/mib/index.vue'),
    meta: {
      title: t('scoring_mib.meta.title'),
      icon: 'hand-coin-fill',
      noClosable: false,
      role: PERMISSION_ENUM.scoring_mib_info_view_all,
    },
  },
]
