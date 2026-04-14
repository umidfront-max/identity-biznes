/**
 * @description Import all vuex modules and automatically add namespaced:true to resolve vuex naming conflicts. Please do not modify them.
 */
import type { App } from 'vue'

const pinia = createPinia()

export function setupStore(app: App<Element>) {
  app.use(pinia)
}

export default pinia
