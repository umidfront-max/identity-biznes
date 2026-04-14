/**
 * @description Export common configuration
 */
export const settingConfig: {
  [key: string]: string | boolean | number | Array<string>
} = {
  // Title, the project needs to be restarted after this modification! ! ! (Including the title of the first loading snowflake screen, the title of the page, and the title of the browser)
  title: 'Identity Biznes',
  // Title separator
  titleSeparator: ' - ',
  // Whether the title is reversed
  // If false: "page - title"
  // If true: "title - page"
  titleReverse: false,
  // abbreviation
  abbreviation: 'vab-shop-vite',
  //The copyright of the paid version can be modified at will
  copyright: 'identitybiznes.uz',
  //The maximum number of cached routes
  keepAliveMaxNum: 99,
  // Routing mode, whether it is hash mode
  isHashRouterMode: true,
  // For routes that do not undergo token verification, it is recommended that the whitelist route be configured at the same level as the login page. If you need to release a page with parameters, please use query to pass parameters. When configuring, just configure the path.
  routesWhiteList: ['/login', '/register', '/404', '/403', '/redirect', '/portal', '/product'],
  // Display text when loading
  loadingText: 'Loading...',
  // token name
  tokenName: 'token',
  //The name of the key stored by token in localStorage and sessionStorage
  tokenTableName: 'shop-vite-token',
  // token storage location localStorage sessionStorage
  storage: 'localStorage',
  //Whether to record this route when the token expires and returns to the login page (whether to record the current tab page)
  recordRoute: true,
  // Whether to enable the logo, set false when not displayed, please fill in the icon name under the src/icon path
  // If you want to use the built-in RemixIcon icon, please go to the logo component to switch the comment code (the built-in svg sprite image is larger and has a certain impact on performance)
  logo: 'vite',
  // Language type ru, uz, en
  i18n: 'ru',
  // Message box disappearing time
  messageDuration: 3000,
  // Under what circumstances should errors be highlighted ['development', 'production']
  errorLog: 'development',
  // Whether to enable login interception
  loginInterception: true,
  // Whether to enable login RSA encryption
  loginRSA: false,
  // Intelligence (front-end export routing) and all (back-end export routing) two methods
  authentication: 'intelligence',
  // Whether guest mode is supported. If supported, access the whitelist and view all asyncRoutes.
  supportVisit: false,
  // Whether to enable the roles field for role permission control (if the all mode backend completely processes the roles and performs json assembly, you can set false to not process the roles field in the route)
  rolesControl: true,
  // Whether to keep only one submenu expanded during vertical column comprehensive common layout
  uniqueOpened: false,
  // Vertical column comprehensive common layout is the menu path that is expanded by default. Use commas to separate them. It is recommended to expand only one.
  defaultOpeneds: [
    '/vab/icon',
    '/vab/table',
    '/vab/editor',
    '/vab/form',
    '/operate/dynamicSegment',
    '/operate/menu1/menu11/menu111',
    '/other/iframe',
  ],
  // Requests that require a loading layer to prevent repeated submissions
  debounce: ['doEdit'],
  // In column layout and comprehensive layout, whether to click the first-level menu to open the second-level menu by default (the first one by default, can be customized through redirect)
  openFirstMenu: true,
  // Whether to hold multiple tabs
  persistenceTab: true,
}
