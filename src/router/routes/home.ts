import { VabRouteRecordRaw } from '/@/router/types.ts'
import Layout from '/@vab/layouts/index.vue'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

export const home: VabRouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    component: Layout,
    meta: {
      title: t('home.meta.title'),
      icon: 'home-2-line',
    },
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('/@/views/index/index.vue'),
        meta: {
          title: t('home.meta.title'),
          icon: 'home-2-line',
          noColumn: true,
          noClosable: false,
        },
      },
    ],
  },
]
