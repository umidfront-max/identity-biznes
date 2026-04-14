import { defineComponent } from 'vue'
import { PERMISSION_ENUM } from '/@/router/pemissionsEnum'

export type Component<T = any> = ReturnType<typeof defineComponent> | (() => Promise<typeof import('*.vue')>) | (() => Promise<T>)

export interface VabRouteMeta {
  role?: PERMISSION_ENUM
  // Highlight specific menu
  activeMenu?: string
  // Badge small label (only supports children)
  badge?: string
  // Whether to hide breadcrumbs
  breadcrumbHidden?: boolean
  // Whether to display small dots
  dot?: boolean
  // Whether to open a new tab for dynamic parameter routing
  dynamicNewTab?: boolean
  // Permissions
  guard?: string[] | { role?: string[]; permission?: string[]; mode?: string }
  // Whether to show hidden routes in the menu (default: false)
  hidden?: boolean
  // icon
  icon?: string
  // Whether it is a custom svg icon (default value: false)
  // If set to true, you need to copy your svg to icon, and then configure the icon field with your icon name
  isCustomSvg?: boolean
  // Whether to display hidden first-level routes in the menu (default: true)
  levelHidden?: boolean
  // Whether the current route can close multiple tab pages, same as above
  noClosable?: boolean
  // Whether to hide the sidebar
  noColumn?: boolean
  // Whether the current route is not cached (default value: false)
  noKeepAlive?: boolean
  // Whether the current route does not display multi-tab pages
  tabHidden?: boolean
  // Open in new window
  target?: '_blank' | false
  // Names displayed for menus, breadcrumbs, and multi-tab pages
  title?: string
}

// @ts-ignore

export interface VabRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  path: string
  // name First letter must be capitalized
  name: string
  meta: VabRouteMeta
  fullPath?: string
  component?: Component | string
  components?: Component | string
  children?: VabRouteRecordRaw[]
  childrenNameList?: (string | undefined)[]
}

export interface VabRoute extends Omit<VabRouteRecordRaw, 'children' | 'childrenNameList'> {
  query?: any
  params?: any
  matched?: VabRoute[]
}
