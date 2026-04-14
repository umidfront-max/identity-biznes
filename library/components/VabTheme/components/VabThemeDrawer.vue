<template>
  <el-drawer v-model="drawerVisible" append-to-body class="vab-drawer" direction="rtl" size="300px" :title="$t('theme.theme')">
    <el-scrollbar height="calc(100vh - 120px)">
      <el-form ref="form" label-position="left" :model="theme">
        <el-form-item v-if="device !== 'mobile' && routeName !== 'SeparateLayout'" class="vab-shop-item1">
          <template #label>
            {{ $t('theme.layouts') }}
          </template>
          <el-radio-group v-model="theme.layout" class="vab-shop-layout">
            <el-radio-button v-for="item in layoutList" :key="item" :label="item">
              <template #default>
                <vab-icon :icon="item" is-custom-svg />
              </template>
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('theme.theme')">
          <el-radio-group v-model="theme.themeName" @change="_updateTheme">
            <el-radio-button v-for="item in themeNameList" :key="item.label" :label="item.label">
              <template #default>{{ $t(item.title) }}</template>
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="'technology' != theme.themeName && 'plain' != theme.themeName && route.path !== '/goods/posterDesign'"
          :label="$t('theme.dark_mode')"
        >
          <vab-dark />
        </el-form-item>
        <el-form-item v-if="'technology' != theme.themeName" :label="$t('theme.color_match')">
          <vab-color-picker />
        </el-form-item>
        <el-form-item v-if="'default' === theme.themeName && mode !== 'dark'" :label="$t('theme.follow_color')">
          <el-switch v-model="theme.isFollow" @change="updateIsFollow" />
        </el-form-item>
        <el-form-item v-if="theme.layout !== 'horizontal'" :label="$t('theme.menu_width')">
          <el-select v-model="theme.menuWidth" @change="updateMenuWidth">
            <el-option v-for="item in menuWidthList" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('theme.tabs')">
          <el-switch v-model="theme.showTabs" @change="handleShowTabs" />
        </el-form-item>
        <el-form-item v-if="theme.showTabs">
          <template #label>
            {{ $t('theme.persistent_tags') }}
          </template>
          <el-switch v-model="persistenceTab" @change="handlePersistenceTab" />
        </el-form-item>
        <el-form-item v-if="theme.showTabs">
          <template #label>
            {{ $t('theme.tabs_icon') }}
          </template>
          <el-switch v-model="theme.showTabsIcon" />
        </el-form-item>
        <el-form-item v-if="theme.showTabs">
          <template #label>
            {{ $t('theme.tabs_style') }}
          </template>
          <el-select v-model="theme.tabsBarStyle">
            <el-option v-for="item in tabsBarStyleList" :key="item.value" :label="$t(item.label)" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('theme.footer')">
          <el-switch v-model="theme.showFooter" @change="handleShowFooter" />
        </el-form-item>
        <el-form-item :label="$t('theme.floating_window')">
          <el-switch v-model="theme.showThemeSetting" />
        </el-form-item>
        <el-form-item v-if="theme.layout === 'column'">
          <template #label>
            {{ $t('theme.column') }}
          </template>
          <el-select v-model="theme.columnStyle">
            <el-option v-for="item in columnStyleList" :key="item.value" :label="$t(item.label)" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('theme.radius')">
          <el-input-number v-model="theme.radius" :max="26" :min="3" @change="handleRadius" />
        </el-form-item>
        <el-form-item :label="$t('theme.color_blindness')">
          <el-switch v-model="theme.colorWeakness" @change="handleColorWeakness" />
        </el-form-item>
        <el-form-item :label="$t('theme.header')">
          <el-switch v-model="theme.fixedHeader" />
        </el-form-item>
        <el-form-item :label="$t('theme.dark')">
          <el-switch v-model="theme.showDark" />
        </el-form-item>
        <el-form-item :label="$t('theme.color_picker')">
          <el-switch v-model="theme.showColorPicker" />
        </el-form-item>
        <el-form-item :label="$t('theme.language')">
          <el-switch v-model="theme.showLanguage" />
        </el-form-item>
        <el-form-item :label="$t('theme.progress')">
          <el-switch v-model="theme.showProgressBar" />
        </el-form-item>
        <el-form-item :label="$t('theme.refresh')">
          <el-switch v-model="theme.showRefresh" />
        </el-form-item>
        <el-form-item :label="$t('theme.search')">
          <el-switch v-model="theme.showSearch" />
        </el-form-item>
        <el-form-item :label="$t('theme.notice')">
          <el-switch v-model="theme.showNotice" />
        </el-form-item>
        <el-form-item :label="$t('theme.fullScreen')">
          <el-switch v-model="theme.showFullScreen" />
        </el-form-item>
        <el-form-item :label="$t('theme.lock')">
          <el-switch v-model="theme.showLock" />
        </el-form-item>
        <el-form-item :label="$t('theme.transition')">
          <el-select v-model="theme.pageTransition">
            <el-option v-for="item in pageTransitionList" :key="item.value" :label="$t(item.label)" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-scrollbar>
    <template #footer>
      <el-button type="primary" @click="handleSaveTheme">
        {{ $t('buttons.save') }}
      </el-button>
      <el-button @click="setDefaultTheme">
        {{ $t('theme.default') }}
      </el-button>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '/@/store/modules/settings'

defineOptions({
  name: 'VabThemeDrawer',
})

const { t } = useI18n()
const route = useRoute()
const $sub = inject<any>('$sub')
const $pub = inject<any>('$pub')
const $baseLoading = inject<any>('$baseLoading')
const $baseMessage = inject<any>('$baseMessage')
const settingsStore = useSettingsStore()
const routeName = ref<any>(route.name)
const { theme, device, mode, persistenceTab } = storeToRefs<any>(settingsStore)
const { saveTheme, resetTheme, updateTheme, updateCaughtTabs, setCssVar } = settingsStore
const drawerVisible = ref<boolean>(false)
const layoutList = ref<any>(['column', 'vertical', 'horizontal', 'comprehensive'])
const tabsBarStyleList = ref<any>([
  { label: t('theme.card'), value: 'card' },
  { label: t('theme.smart'), value: 'smart' },
  { label: t('theme.smooth'), value: 'smooth' },
  { label: t('theme.rect'), value: 'rect' },
])
const menuWidthList = ref<any>(['266px', '277px', '288px', '299px'])
const themeNameList = ref<any>([
  { label: t('theme.default'), title: t('theme.default') },
  { label: t('theme.plain'), title: t('theme.plain') },
  { label: t('theme.technology'), title: t('theme.technology') },
])
const columnStyleList = ref<any>([
  { value: 'vertical', label: t('theme.vertical') },
  { value: 'horizontal', label: t('theme.horizontal') },
  { value: 'card', label: t('theme.card') },
  { value: 'arrow', label: t('theme.arrow') },
  { value: 'semicircle', label: t('theme.semicircle') },
])
const pageTransitionList = ref<any>([
  { value: '', label: 'i18n.None' },
  { value: 'el-fade-in-linear', label: t('theme.fade_in_linear') },
  { value: 'el-fade-in', label: t('theme.fade_in') },
  { value: 'el-zoom-in-center', label: t('theme.zoom_in_center') },
  { value: 'el-zoom-in-top', label: t('theme.zoom_in_top') },
  { value: 'el-zoom-in-bottom', label: t('theme.zoom_in_bottom') },
])

const handleOpenTheme = () => {
  drawerVisible.value = true
}

const updateMenuWidth = (value: any) => {
  theme.value.menuWidth = value
  setCssVar()
}

const updateIsFollow = (value: any) => {
  theme.value.isFollow = value
  setCssVar()
}

const handleShowFooter = (value: any) => {
  theme.value.showFooter = value
  setCssVar()
}

const handleRadius = (value: any) => {
  theme.value.radius = value
  setCssVar()
}

const handleColorWeakness = (value: any) => {
  theme.value.colorWeakness = value
  setCssVar()
}

const handleShowTabs = (value: any) => {
  const el = ref<any>(null)
  if (!value) useCssVar('--el-tabs-height', el).value = '0px'
  else useCssVar('--el-tabs-height', el).value = '50px'
}

const handlePersistenceTab = (value: any) => {
  updateCaughtTabs(value)
}

const _updateTheme = (value: any = '') => {
  if (value == 'default') $pub('shop-vite-reset-dark')
  if (theme.value.themeName == 'technology') $pub('shop-vite-reset-color')

  const loading = $baseLoading()
  useTimeoutFn(() => {
    updateTheme()
  }, 500)

  useTimeoutFn(() => {
    loading.close()
    $baseMessage(t('theme.successfully_switched'), 'success', 'hey')
  }, 1000)

  saveTheme()
}

const setDefaultTheme = () => {
  drawerVisible.value = false
  const loading = $baseLoading()

  useTimeoutFn(() => {
    resetTheme()
    $pub('shop-vite-reset-color')
    $pub('shop-vite-reset-dark')
  }, 500)

  useTimeoutFn(() => {
    loading.close()
    $baseMessage(t('theme.successfully_switched'), 'success', 'hey')
    if (device.value === 'mobile') location.reload()
  }, 1000)
}

const handleSaveTheme = () => {
  saveTheme()
  drawerVisible.value = false
  //if (device.value === 'mobile') location.reload()
}

watch(
  route,
  () => {
    routeName.value = route.name
  },
  { immediate: true }
)

onBeforeMount(() => {
  $sub('shop-vite-open-theme', () => {
    handleOpenTheme()
  })
  $sub('shop-vite-reset-theme', () => {
    setDefaultTheme()
  })
  $sub('shop-vite-save-theme', () => {
    saveTheme()
  })
  $sub('shop-vite-change-theme', (value: string) => {
    theme.value.themeName = value
    _updateTheme()
  })
})
</script>

<style lang="scss">
.vab-drawer {
  .el-drawer__header {
    padding: var(--el-padding) var(--el-padding) 0 var(--el-padding);
    margin-bottom: 0;
  }

  .el-drawer__body {
    padding-right: 0;

    .el-scrollbar__wrap {
      height: calc(100vh - 80px);
      padding-right: var(--el-padding);

      .el-form-item {
        display: flex;
        align-items: center;
        margin-bottom: 17.5px;

        &__label {
          flex: 1 1;

          i {
            cursor: pointer;
          }
        }

        &__content {
          flex: 0 0 auto;
        }

        &.vab-item-custom {
          display: block !important;
          height: 130px;
        }

        &.vab-shop-item1 {
          display: block !important;

          .el-form-item__content {
            .vab-shop-layout {
              .el-radio-button {
                position: relative;
                display: block;
                float: left;
                width: 50px;
                height: 50px;
                padding: 0;
                margin: 10px 10px 5px 4px;
                cursor: pointer;
                background: transparent;
                border: 0;
                box-shadow: none;

                &.is-disabled {
                  cursor: not-allowed;
                  opacity: 0.6;
                }

                .el-radio-button__orig-radio {
                  display: none;
                }

                .el-radio-button__original-radio:checked + .el-radio-button__inner {
                  background: transparent;

                  .vab-icon {
                    box-shadow: 0 0 2px 2px var(--el-color-primary);
                  }
                }

                .el-radio-button__inner {
                  position: absolute;
                  top: 0;
                  left: 0;
                  display: block;
                  width: 50px;
                  height: 50px;
                  padding: 0;
                  margin: 0;
                  border: 0;
                  box-shadow: none;

                  .vab-icon {
                    width: 50px;
                    height: 50px;
                    padding: 0;
                    margin: 0;
                    border: 1px solid var(--el-border-color);
                    border-radius: var(--el-border-radius-base);
                  }
                }
              }

              .el-radio-button:last-child {
                margin-right: 0;
              }
            }
          }
        }

        .el-input,
        .el-input-number {
          width: 105px;
        }
      }
    }
  }

  .el-drawer__footer {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: calc(var(--el-z-index) + 1);
    padding: calc(var(--el-padding) / 2);
    background: var(--el-color-white);
    border-top: 1px solid var(--el-border-color);
  }
}
</style>
