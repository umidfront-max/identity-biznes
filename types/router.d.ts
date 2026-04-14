import type { _RouteLocationBase, RouteRecordRaw } from 'vue-router'
import { RouteRecordNormalized } from 'vue-router'

/**
 * routing record
 */
declare interface VabRouteRecord extends Omit<RouteRecordRaw, 'name' | 'meta' | 'children'> {
  name: string
  meta: VabRouteMeta
  children?: VabRouteRecord[]
  childrenPathList?: string[]
  parentIcon?: string
  redirect?: string
}

declare interface VabRouteRecordRaw extends Omit<RouteRecordNormalized, 'meta'> {
  meta: VabRouteMeta
}

/**
 * useRoute()
 */
declare interface VabRoute extends Omit<_RouteLocationBase, 'meta'> {
  meta: VabRouteMeta
  matched: VabRouteRecordRaw[]
  parentIcon?: string
}

declare interface VabRouteMeta {
  // Highlight the specified menu
  activeMenu?: string
  // badge small label (only supports children)
  badge?: string
  // Whether to hide breadcrumbs
  breadcrumbHidden?: boolean
  // Whether to display small dots
  dot?: boolean
  // Whether to open a new tab for dynamic parameter routing
  dynamicNewTab?: boolean
  //Permissions
  guard?: string[] | GuardType
  // Whether to display hidden routes in the menu (default value: false)
  hidden?: boolean
  // icon
  icon?: string
  // Whether it is a custom svg icon (default value: false)
  // If set to true, you need to copy your svg to icon, and then configure the icon field with your icon name
  isCustomSvg?: boolean
  // Whether to display hidden first-level routes in the menu (default value: true)
  levelHidden?: boolean
  // Whether the current route can close multi-tab pages, same as above
  noClosable?: boolean
  // Whether to hide the sidebar
  noColumn?: boolean
  // Whether the current route is not cached (default value: false)
  noKeepAlive?: boolean
  // Whether the current route does not display multi-tab pages
  tabHidden?: boolean
  // Open in new window
  target?: '_blank' | false
  // Names displayed in menus, breadcrumbs, and multi-tab pages
  title?: string
}
