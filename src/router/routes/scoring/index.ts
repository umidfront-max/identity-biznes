import { creditHistory } from './credit-history'
import { inpsHistory } from './inps-history'
import { pensionInfo } from './pension-info'
import { Mib } from './mib'
import { Tax } from './tax'
import { uzcard } from './uzcard'
import { humo } from './humo'

import { VabRouteRecordRaw } from '/@/router/types.ts'
import Layout from '/library/layouts/index.vue'

import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

export const scoring: VabRouteRecordRaw[] = [
  {
    path: '/scoring',
    name: 'Scoring',
    component: Layout,
    meta: {
      title: t('scoring.meta.title'),
      icon: 'command-fill',
    },
    children: [...pensionInfo, ...Mib, ...Tax, ...inpsHistory, ...creditHistory, ...uzcard, ...humo],
  },
]
