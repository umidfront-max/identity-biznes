import type { VabRouteRecordRaw } from '../types.ts'

export const publicRoutes: VabRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('/@/views/login/index.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    // component: () => import('/@/views/register/index.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/redirect',
    name: 'redirect',
    component: () => import('/@/views/redirect/Redirect.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/403',
    name: '403',
    component: () => import('/@/views/error/403.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('/@/views/error/404.vue'),
    meta: {
      hidden: true,
    },
  },
]
