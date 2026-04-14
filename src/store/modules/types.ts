export type LayoutName =
  /**
   * Horizontal layout
   */
  | 'horizontal'
  /**
   * vertical layout
   */
  | 'vertical'
  /**
   * Column layout
   */
  | 'column'
  /**
   * Comprehensive layout
   */
  | 'comprehensive'
  /**
   * Regular layout
   */
  | 'common'
  /**
   * Floating layout
   */
  | 'float'

export type ThemeName = 'default' | 'plain' | 'technology'

export type Background =
  /**
   * no background
   */
  | 'none'
  /**
   * custom background
   */
  | 'vab-background'

export type ColumnStyle =
  /**
   * horizontal style
   */
  | 'horizontal'
  /**
   * portrait style
   */
  | 'vertical'
  /**
   * card style
   */
  | 'card'
  /**
   * arrow style
   */
  | 'arrow'
  /**
   * semicircle style
   */
  | 'semicircle'

export type TabsBarStyle =
  /**
   * card style
   */
  | 'card'
  /**
   * Smart style
   */
  | 'smart'
  /**
   * sleek style
   */
  | 'smooth'
  /**
   * rectangular style
   */
  | 'rect'

export type pageTransitionStyle =
  /**
   * No animation
   */
  | ''
  /**
   * el-fade-in-linear
   */
  | 'el-fade-in-linear'
  /**
   * el-fade-in
   */
  | 'el-fade-in'
  /**
   * el-zoom-in-center
   */
  | 'el-zoom-in-center'
  /**
   * el-zoom-in-top
   */
  | 'el-zoom-in-top'
  /**
   * el-zoom-in-bottom
   */
  | 'el-zoom-in-bottom'

export interface ThemeType {
  // layout name
  layout: LayoutName
  // Topic name
  themeName: ThemeName
  // Menu width, only supports px, recommended sizes: 266px, 277px, 288px, other sizes will affect the appearance
  menuWidth: string
  // Column style (only valid for column layout column)
  columnStyle: ColumnStyle
  // color
  color: string
  // Menu background follows color matching
  isFollow: boolean
  // Whether the head is fixed or not
  fixedHeader: boolean
  // Whether to collapse the left menu by default in vertical layout (column layout is not supported)
  foldSidebar: boolean
  // Whether to enable the top progress bar
  showProgressBar: boolean
  // Whether to enable footer
  showFooter: boolean
  // Whether to open the tab page
  showTabs: boolean
  // Tab style when displaying tabs
  tabsBarStyle: TabsBarStyle
  // Whether the tab page icon
  showTabsIcon: boolean
  // Whether to enable the language selection component
  showLanguage: boolean
  // Whether to enable the refresh component
  showRefresh: boolean
  // Whether to enable theme components
  showTheme: boolean
  // Whether to enable the search component
  showSearch: boolean
  // Whether to enable notification components
  showNotice: boolean
  // Whether to enable full-screen components
  showFullScreen: boolean
  // Whether to open the floating window on the right
  showThemeSetting: boolean
  // Whether to enable dark components
  showDark: boolean
  // Whether to enable page animation
  pageTransition: pageTransitionStyle
  // rounded corners
  radius: number
  // Whether to enable lock screen
  showLock: boolean
  // Whether to enable the color picker component
  showColorPicker: boolean
  // color blindness
  colorWeakness: boolean
}

export type DeviceType = 'mobile' | 'desktop'
export type LanguageType = 'ru' | 'uz' | 'en'

export interface SettingsModuleType {
  collapse: boolean
  color: string
  device: DeviceType
  persistenceTab: boolean
  language: LanguageType
  lock: boolean
  logo: string
  mode: string
  theme: ThemeType
  title: string
}
