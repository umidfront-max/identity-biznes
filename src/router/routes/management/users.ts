import { PERMISSION_ENUM } from '../../pemissionsEnum'
import { VabRouteRecordRaw } from '/@/router/types.ts'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

export const users: VabRouteRecordRaw[] = [
  {
    path: 'users',
    name: 'users',
    component: () => import('/@/views/management/users/index.vue'),
    meta: {
      title: t('management_users.meta.title'),
      icon: 'hand-coin-fill',
      noClosable: false,
      role: PERMISSION_ENUM.user_view_all,
    },
  },
  {
    path: 'roles',
    name: 'roles',
    component: () => import('/@/views/roles/index.vue'),
    meta: {
      title: t('management_roles.meta.title'),
      icon: 'hand-coin-fill',
      noClosable: false,
      role: PERMISSION_ENUM.role_view_all,
    },
  },
  {
    path: 'roles/singleRole',
    name: 'single-role',
    component: () => import('/src/views/roles/singleRole.vue'),
    meta: {
      hidden: true,
      title: t('management_roles.meta.single_title'),
      activeMenu: '/roles/singleRole',
      dynamicNewTab: true,
      role: PERMISSION_ENUM.role_view,
    },
  },
  {
    path: 'users/:id/update',
    name: 'users-update',
    component: () => import('/@/views/management/users/[id]/update.vue'),
    meta: {
      hidden: true,
      title: t('management_users.meta.single_title'),
      activeMenu: '/management/users',
      dynamicNewTab: true,
      role: PERMISSION_ENUM.user_edit,
    },
  },
  {
    path: 'users/singleUser',
    name: 'single-user',
    component: () => import('/src/views/management/users/singleUser.vue'),
    meta: {
      hidden: true,
      title: t('management_users.meta.single_title'),
      activeMenu: '/management/users',
      dynamicNewTab: true,
      role: PERMISSION_ENUM.user_view,
    },
  },
]
