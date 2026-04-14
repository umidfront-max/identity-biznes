import { useSettingsStore } from './settings'

export type TabsModuleType = {
  caughtRoutes: []
  visitedRoutes: any[]
}

/**
 * @description tabsBar tab page logic, please do not modify it unless necessary
 */
export const useTabsStore = defineStore('tabs', {
  state: (): TabsModuleType => ({
    visitedRoutes: JSON.parse(localStorage.getItem('caughtRoutes') as string) || [],
    caughtRoutes: [],
  }),
  getters: {
    getVisitedRoutes: (state) => state.visitedRoutes.filter((route) => route.name !== 'Login'),
  },
  actions: {
    /**
     * @description Add tab
     * @param {*} route
     * @returns
     */
    addVisitedRoute(route: any) {
      const target = this.visitedRoutes.find((item) => item.path === route.path)
      if (target && !route.meta.dynamicNewTab) Object.assign(target, route)
      else if (!target) this.visitedRoutes.push(Object.assign({}, route))
      // To deal with extremely special situations: when noClosable is not configured, the current tab cannot be closed by default.
      if (!this.visitedRoutes.find((route) => route.meta.noClosable)) this.visitedRoutes[0].meta.noClosable = true
    },
    /**
     * @description Delete current tab
     * @param {*} path
     * @returns
     */
    delVisitedRoute(path: string) {
      this.visitedRoutes = this.visitedRoutes.filter((route) => route.path !== path)
    },
    /**
     * @description Delete all tabs except the current tab
     * @param {*} path
     * @returns
     */
    delOthersVisitedRoutes(path: string) {
      this.visitedRoutes = this.visitedRoutes.filter((route) => route.meta.noClosable || route.path === path)
    },
    /**
     * @description Delete all tabs to the left of the current tab
     * @param {*} path
     * @returns
     */
    delLeftVisitedRoutes(path: string) {
      let found = false
      this.visitedRoutes = this.visitedRoutes.filter((route) => {
        if (route.path === path) found = true
        return route.meta.noClosable || found
      })
    },
    /**
     * @description Delete all tabs to the right of the current tab
     * @param {*} path
     * @returns
     */
    delRightVisitedRoutes(path: string) {
      let found = false
      this.visitedRoutes = this.visitedRoutes.filter((route) => {
        const close = found
        if (route.path === path) found = true
        return route.meta.noClosable || !close
      })
    },
    /**
     * @description Delete all tabs
     * @returns
     */
    delAllVisitedRoutes() {
      this.visitedRoutes = this.visitedRoutes.filter((route) => route.meta.noClosable)
      localStorage.setItem('caughtRoutes', JSON.stringify(this.visitedRoutes))
    },
    /**
     * @description Modify meta
     * @param options
     */
    changeTabsMeta(options: any) {
      const handleVisitedRoutes = (visitedRoutes: any[]) => {
        return visitedRoutes.map((route: any) => {
          if (route.name === options.name || route.meta.title === options.title) Object.assign(route.meta, options.meta)
          if (route.children && route.children.length) route.children = handleVisitedRoutes(route.children)
          return route
        })
      }
      this.visitedRoutes = handleVisitedRoutes(this.visitedRoutes)
    },
    /**
     * @description Cache tab page
     */

    handleCaughtRoutes() {
      const settingsStore = useSettingsStore()
      if (settingsStore.persistenceTab) localStorage.setItem('caughtRoutes', JSON.stringify(this.visitedRoutes))
      else {
        this.caughtRoutes = []
        localStorage.removeItem('caughtRoutes')
      }
    },
  },
})
