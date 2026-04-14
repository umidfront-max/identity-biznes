import { ThemeType } from '/@/store/modules/types.ts'

/**
 @description Export theme configuration, please note: You need to clear the browser cache after modifying items under this configuration! ! !
 */
export const themeConfig: ThemeType = {
  // Layout support: column layout, vertical layout, horizontal layout horizontal
  layout: 'column',
  //Theme support: default, plain, technology
  themeName: 'default',
  // Menu width, only supports px, recommended sizes: 266px, 277px, 288px, other sizes will affect the appearance
  menuWidth: '266px',
  // Column style: horizontal style horizontal, vertical style vertical, card style card, arrow style arrow, semicircle style semicircle
  columnStyle: 'card',
  // primary color
  color: '#4e88f3',
  // Menu background follows color matching
  isFollow: false,
  // Whether the head is fixed or not
  fixedHeader: true,
  // Whether to enable the top progress bar
  showProgressBar: true,
  // Whether to enable footer
  showFooter: true,
  // Whether to open the tab page
  showTabs: true,
  // Tab styles when displaying tabs: card style, smart style, smooth style, rectangular style rect
  tabsBarStyle: 'card',
  // Whether to display tab icons
  showTabsIcon: true,
  // Whether to enable the language selection component
  showLanguage: true,
  // Whether to enable the refresh component
  showRefresh: true,
  // Whether to enable the search component
  showSearch: true,
  // Whether to enable theme components
  showTheme: true,
  // Whether to enable notification components
  showNotice: true,
  // Whether to enable full-screen components
  showFullScreen: true,
  // Whether to open the floating window on the right
  showThemeSetting: true,
  // Whether to enable dark components
  showDark: true,
  // No to collapse the left menu by default
  foldSidebar: false,
  // Whether to enable page animation. The value is empty: no animation, el-fade-in-linear, el-fade-in, el-zoom-in-center, el-zoom-in-top, el-zoom-in-bottom.
  pageTransition: '',
  // Rounded corners (unit: px, type must be number)
  radius: 5,
  // Whether to enable lock screen
  showLock: true,
  // Whether to enable the color picker component
  showColorPicker: true,
  // color blindness
  colorWeakness: false,
}
