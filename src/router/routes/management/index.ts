import { VabRouteRecordRaw } from '/@/router/types.ts'
import Layout from '/library/layouts/index.vue'
import { users } from './users.ts'
import { branches } from './branches.ts'
import { logs } from './logs.ts'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

export const management: VabRouteRecordRaw[] = [
  {
    path: '/management',
    name: 'Management',
    component: Layout,
    meta: {
      title: t('management.meta.title'),
      icon: 'command-fill',
    },
    children: [...branches, ...users, ...logs],
  },
]
