import { PERMISSION_ENUM } from '../pemissionsEnum'
import { VabRouteRecordRaw } from '/@/router/types.ts'
import Layout from '/@vab/layouts/index.vue'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

export const profile: VabRouteRecordRaw[] = [
  {
    path: '/profile',
    name: 'profile-index',
    component: Layout,
    meta: {
      title: t('profile.meta.title'),
      icon: 'user-3-fill',
    },
    children: [
      {
        path: '',
        name: 'profile',
        component: () => import('/@/views/profile/index.vue'),
        meta: {
          title: t('profile.meta.title'),
          icon: '',
          noColumn: true,
          role: PERMISSION_ENUM.profile_edit,
        },
      },
    ],
  },
]
