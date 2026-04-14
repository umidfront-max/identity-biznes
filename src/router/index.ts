/**
 * @description Router is configured globally. If necessary, it can be separated into files. AsyncRoutes is only used in intelligence mode. The pro version only supports remixIcon icons. Please check the VIP group documentation for specific configurations.
 */
import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory, createWebHistory, RouteRecordName } from 'vue-router'
import type { VabRouteRecordRaw } from './types'
import { base, isHashRouterMode } from '/@/config'
import { setupPermissions } from '/@/router/permissions'
import { customers } from '/@/router/routes/customers.ts'
import { home } from '/@/router/routes/home.ts'
import { installments } from '/@/router/routes/installments.ts'
import { management } from '/@/router/routes/management/index.ts'
import { profile } from '/@/router/routes/profile.ts'
import { publicRoutes } from '/@/router/routes/public.ts'
import { scoring } from '/@/router/routes/scoring'

export const constantRoutes: VabRouteRecordRaw[] = publicRoutes

export const asyncRoutes: VabRouteRecordRaw[] = [
  ...home,
  ...installments,
  ...management,
  ...customers,
  ...profile,
  ...scoring,
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'NotFound',
    meta: {
      hidden: true,
    },
  },
]

const router = createRouter({
  history: isHashRouterMode ? createWebHashHistory(base) : createWebHistory(base),
  routes: constantRoutes as RouteRecordRaw[],
})

const fatteningRoutes = (routes: VabRouteRecordRaw[]): VabRouteRecordRaw[] => {
  return routes.flatMap((route) => {
    return route.children ? fatteningRoutes(route.children) : route
  })
}

const addRouter = (routes: VabRouteRecordRaw[]) => {
  routes.forEach((route: VabRouteRecordRaw) => {
    if (!router.hasRoute(route.name)) {
      router.addRoute(route as RouteRecordRaw)
    }
    if (route.children) addRouter(route.children)
  })
}

export const resetRouter = (routes: VabRouteRecordRaw[] = constantRoutes) => {
  routes.map((route: VabRouteRecordRaw) => {
    if (route.children) route.children = fatteningRoutes(route.children)
  })
  router.getRoutes().forEach((route) => {
    if (route.name) {
      const routeName: RouteRecordName = route.name
      router.hasRoute(routeName) && router.removeRoute(routeName)
    }
  })
  addRouter(routes)
}

export const setupRouter = (app: App<Element>) => {
  addRouter(asyncRoutes)
  setupPermissions(router)
  app.use(router)
  return router
}

export default router
