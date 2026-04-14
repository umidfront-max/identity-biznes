import { rolesControl } from '/@/config'
import { asyncRoutes, constantRoutes, resetRouter } from '/@/router'
import { filterRoutes } from '/@/utils/routes'

const filterHidden = (data: any) => {
  return data.reduce((acc: any, item: any) => {
    if (item.meta && item.meta.hidden) return acc
    const newItem = { ...item }
    if (item.children && item.children.length > 0) newItem.children = filterHidden(item.children)
    return [...acc, newItem]
  }, [])
}

const filterBreadcrumb = (data: any) => {
  return data.reduce((acc: any, item: any) => {
    const newItem = { ...item }
    if (item.children && item.children.length > 0) newItem.children = filterBreadcrumb(item.children)
    return [...acc, newItem]
  }, [])
}

export const useRoutesStore = defineStore('routes', {
  state: (): RoutesModuleType => ({
    tab: {
      data: undefined,
    },
    tabMenu: undefined,
    activeMenu: {
      data: undefined,
    },
    routes: [],
    allRoutes: [],
    breadcrumbRoutes: [],
  }),
  getters: {
    getTab: (state) => state.tab,
    getTabMenu: (state) => (state.tab.data ? state.routes.find((route) => route.name === state.tab.data) : { meta: { title: '' } }),
    getActiveMenu: (state) => state.activeMenu,
    getRoutes: (state) => state.routes.filter((_route) => _route.meta && _route.meta.hidden !== true),
    getAllRoutes: (state) => state.allRoutes.filter((_route) => _route.meta && _route.meta.hidden !== true),
    getBreadcrumbRoutes: (state) => state.breadcrumbRoutes.filter((_route) => _route.meta && _route.meta.hidden !== true),
    getPartialRoutes: (state) =>
      state.tab.data
        ? state.routes.find((route) => route.name === state.tab.data) &&
          state.routes.find((route) => route.name === state.tab.data).children
        : [],
  },
  actions: {
    /**
     * @description Multi-mode setup routing
     * @returns
     */
    async setRoutes() {
      // Default front-end routing
      const routes = [...asyncRoutes]
      // Set guest routing to turn off route interception (can be deleted if not required)
      // Filter routes based on permissions and rolesControl
      const accessRoutes = filterRoutes([...constantRoutes, ...routes], rolesControl)
      // Setup menu required routing
      this.routes = filterHidden(accessRoutes)
      this.allRoutes = accessRoutes
      this.breadcrumbRoutes = filterBreadcrumb(accessRoutes)
      // Reset Vue Router based on reachable routes
      await resetRouter(accessRoutes)
    },
    changeMenuMeta(options: any) {
      function handleRoutes(routes: any[]) {
        return routes.map((route) => {
          if (route.name === options.name) Object.assign(route.meta, options.meta)
          if (route.children && route.children.length) route.children = handleRoutes(route.children)
          return route
        })
      }

      this.routes = handleRoutes(this.routes)
    },
    /**
     * @description Modify activeName
     * @param activeMenu Currently active menu
     */
    changeActiveMenu(activeMenu: string) {
      this.activeMenu.data = activeMenu
    },
  },
})

export type RoutesModuleType = {
  tab: {
    data: string | undefined
  }
  tabMenu: string | undefined
  activeMenu: {
    data: string | undefined
  }
  routes: any[]
  allRoutes: any[]
  breadcrumbRoutes: any[]
}
