/**
 * @description Route guard, currently has two modes: all mode and intelligence mode
 */
import VabProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Router } from 'vue-router'
import { _TOKEN, RESET_ALL } from '../services/profile'
import { hasAccess } from '../utils/permission'
import { PERMISSION_ENUM } from './pemissionsEnum'
import { routesWhiteList } from '/@/config'
import { useRoutesStore } from '/@/store/modules/routes.ts'
import { useSettingsStore } from '/@/store/modules/settings.ts'
import getPageTitle from '/@/utils/pageTitle'
import { toLoginRoute } from '/@/utils/routes'

export function setupPermissions(router: Router) {
  VabProgress.configure({
    easing: 'ease',
    speed: 500,
    trickleSpeed: 200,
    showSpinner: false,
  })
  router.beforeEach(async (to, from, next) => {
    const {
      getTheme: { showProgressBar },
    } = useSettingsStore()
    const { routes, setRoutes } = useRoutesStore()

    if (showProgressBar) VabProgress.start()

    if (_TOKEN.value) {
      if (routes.length) {
        // Prevent logged-in users from returning to the login page
        if (to.path === '/login') {
          next({ path: '/' })
          if (showProgressBar) VabProgress.done()
        } else {
          if (to.meta.role) {
            if (!hasAccess(to.meta.role as PERMISSION_ENUM)) {
              RESET_ALL()
              next({ path: '/login' })
              return
            }
          }

          next()
        }
      } else {
        try {
          // Get routes based on routing mode and filter based on permissions
          await setRoutes()
          next({ ...to, replace: true })
        } catch (err) {
          await RESET_ALL()
          next(toLoginRoute(to.path))
        }
      }
    } else {
      if (routesWhiteList.includes(to.path)) {
        next()
      } else next(toLoginRoute(to.path))
    }
  })
  router.afterEach((to) => {
    if (typeof to.meta.title === 'string') document.title = getPageTitle(to.meta.title)
    if (VabProgress.status) VabProgress.done()
  })
}
