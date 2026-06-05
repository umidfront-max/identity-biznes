<template>
  <el-scrollbar
    class="vab-column-bar"
    :class="{
      'is-collapse': collapse,
      ['vab-column-bar-' + theme.columnStyle]: true,
    }"
  >
    <vab-logo style="z-index: 999" />
    <el-tabs v-model="tab.data" tab-position="left" @tab-click="handleTabClick">
      <template v-for="(item, index) in routes" :key="index + item.name">
        <el-tab-pane :name="item.name">
          <template #label>
            <div
              class="vab-column-grid"
              :class="{
                ['vab-column-grid-' + theme.columnStyle]: true,
              }"
              :title="translate(item.meta.title)"
            >
              <div>
                <vab-icon v-if="item.meta.icon" :icon="item.meta.icon" :is-custom-svg="item.meta.isCustomSvg" />
                <span v-if="translate(item.meta.title).length < 4">
                  {{ translate(item.meta.title) }}
                </span>
                <span v-else class="menu-title" style="font-size: var(--el-font-size-small); zoom: 0.88">
                  {{ translate(item.meta.title) }}
                </span>
              </div>
            </div>
          </template>
        </el-tab-pane>
      </template>
    </el-tabs>

    <el-menu
      ref="menuRef"
      background-color="var(--el-menu-background-color-second)"
      :default-active="activeMenu.data"
      :default-openeds="defaultOpeneds"
      mode="vertical"
      :unique-opened="uniqueOpened"
    >
      <vab-menu v-for="item in partialRoutes" :key="item.path" :item="item" />
    </el-menu>
    <div class="float-fold">
      <vab-fold fold="contract-left-line" unfold="contract-right-line" />
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { defaultOpeneds, isHashRouterMode, openFirstMenu, uniqueOpened } from '/@/config'
import { translate } from '/@/i18n'
import { VabRoute } from '/@/router/types'
import { useRoutesStore } from '/@/store/modules/routes'
import { useSettingsStore } from '/@/store/modules/settings'
import { isExternal } from '/@/utils/validate'

defineOptions({
  name: 'VabColumnBar',
})

const route: VabRoute = useRoute()
const router = useRouter()
const settingsStore = useSettingsStore()
const { collapse, device, theme } = storeToRefs(settingsStore)
const { foldSideBar, openSideBar } = settingsStore
const routesStore = useRoutesStore()
const {
  getTab: tab,
  getTabMenu: tabMenu,
  getActiveMenu: activeMenu,
  getRoutes: routes,
  getPartialRoutes: partialRoutes,
} = storeToRefs<any>(routesStore)
const menuRef = ref<any>(null)

const setDefaultOpeneds = () => {
  useTimeoutFn(() => {
    defaultOpeneds.forEach((item: string) => {
      try {
        menuRef.value.open(item)
      } catch (e) {
        /* empty */
      }
    })
  }, 0)
}

const handleTabClick = () => {
  nextTick(() => {
    if (tabMenu.value.meta.target === '_blank') {
      if (route.path !== tabMenu.value.path) {
        isHashRouterMode ? window.open(`#${tabMenu.value.path}`) : window.open(tabMenu.value.path)
        router.push('/redirect')
      }
    } else if (isExternal(tabMenu.value.path)) {
      window.open(tabMenu.value.path)
      router.push('/redirect')
    } else if (openFirstMenu) router.push(tabMenu.value.redirect || tabMenu.value)
    setDefaultOpeneds()
  })
}

onMounted(() => {
  nextTick(() => {
    setDefaultOpeneds()
    if (theme.value.layout === 'column')
      watch(
        route,
        () => {
          const foldUnfold: any = document.querySelector('.left-panel .fold-unfold')
          const floatFold: any = document.querySelector('.float-fold')
          if (route.meta.noColumn && theme.value.layout === 'column') {
            if (device.value !== 'mobile') foldSideBar()
            if (foldUnfold) foldUnfold.style = 'display:none'
            if (floatFold) floatFold.style = 'display:none'
          } else {
            if (device.value !== 'mobile') openSideBar()
            if (foldUnfold) foldUnfold.style = ''
            if (floatFold) floatFold.style = ''
          }
        },
        {
          immediate: true,
        }
      )
  })
})
</script>

<style lang="scss" scoped>
@mixin active {
  &:hover {
    color: var(--el-color-primary);
    background-color: var(--el-color-primary-light-9);

    i,
    svg {
      color: var(--el-color-primary);
    }
  }

  &.is-active {
    color: var(--el-color-primary);
    background-color: var(--el-color-primary-light-9);
  }
}

.vab-column-bar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: var(--el-left-menu-width);
  height: 100vh;
  overflow: hidden;
  background: #ffffff;
  border-right: 1px solid #ececec;

  &-vertical,
  &-card,
  &-arrow {
    :deep() {
      .el-tabs + .el-menu {
        left: var(--el-left-menu-width-min);
        width: calc(var(--el-left-menu-width) - var(--el-left-menu-width-min));
        border: 0;
      }
    }
  }

  &-horizontal,
  &-semicircle {
    .float-fold {
      left: 26.5px;
    }

    :deep() {
      .vab-logo-column {
        .logo {
          width: calc(var(--el-left-menu-width-min) * 1.4) !important;
        }

        .title {
          left: calc(var(--el-left-menu-width-min) * 1.4) !important;
          width: calc(var(--el-left-menu-width) - calc(var(--el-left-menu-width-min) * 1.4) - 1px);
        }
      }

      .el-tabs + .el-menu {
        left: calc(var(--el-left-menu-width-min) * 1.4);
        width: calc(var(--el-left-menu-width) - var(--el-left-menu-width-min) * 1.4);
        border: 0;
      }
    }
  }

  &-card {
    :deep() {
      .el-tabs {
        .el-tabs__item {
          padding: 5px !important;

          .vab-column-grid {
            width: calc(var(--el-left-menu-width-min) - 12px) !important;
            height: calc(var(--el-left-menu-width-min) - 10px) !important;
            margin-left: 2px;
            border-radius: var(--el-border-radius-base);

            &:hover {
              background: var(--el-color-primary);
            }
          }

          &.is-active {
            background: transparent !important;

            .vab-column-grid {
              background: var(--el-color-primary);
            }
          }
        }
      }

      .el-tabs + .el-menu {
        left: calc(var(--el-left-menu-width-min) + 10px);
        width: calc(var(--el-left-menu-width) - var(--el-left-menu-width-min) - 20px);
      }

      .el-sub-menu .el-sub-menu__title,
      .el-menu-item {
        min-width: 180px;
        margin-bottom: 5px;
        border-radius: var(--el-border-radius-base);
      }
    }
  }

  &-arrow {
    :deep() {
      .el-tabs {
        .el-tabs__item {
          &.is-active {
            background: transparent !important;

            .vab-column-grid {
              background: transparent !important;

              &:after {
                position: absolute;
                right: -1px;
                width: 0;
                height: 0;
                overflow: hidden;
                content: '';
                border-color: transparent var(--el-color-white) transparent transparent;
                border-style: solid dashed dashed;
                border-width: 8px;
              }
            }
          }
        }
      }

      .el-tabs + .el-menu {
        left: calc(var(--el-left-menu-width-min) + 10px);
        width: calc(var(--el-left-menu-width) - var(--el-left-menu-width-min) - 20px);
      }

      .el-sub-menu .el-sub-menu__title,
      .el-menu-item {
        min-width: 180px;
        margin-bottom: 5px;
        border-radius: var(--el-border-radius-base);
      }
    }
  }

  &-semicircle {
    :deep() {
      .el-tabs {
        .el-tabs__item {
          &.is-active {
            border-top-left-radius: 99px;
            border-bottom-left-radius: 99px;
          }
        }
      }
    }
  }

  .vab-column-grid {
    display: flex;
    align-items: center;
    width: var(--el-left-menu-width-min);
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;

    &-vertical,
    &-card,
    &-arrow {
      justify-content: center;
      height: var(--el-left-menu-width-min);

      > div {
        svg,
        [class*='ri-'] {
          display: block;
          height: 20px;
        }
      }
    }

    &-horizontal,
    &-semicircle {
      justify-content: left;
      width: calc(var(--el-left-menu-width-min) * 1.4);
      height: calc(var(--el-left-menu-width-min) / 1.4);
      padding-left: var(--el-padding);

      svg,
      [class*='ri-'] {
        margin-right: 3px;
      }
    }
  }

  :deep() {
    * {
      transition: var(--el-transition);
    }

    .el-scrollbar__wrap {
      overflow-x: hidden;
    }

    .el-tabs {
      position: fixed;
      z-index: 9999;

      .el-tabs__header.is-left {
        margin-right: 0 !important;

        .el-tabs__nav-wrap.is-left {
          margin-right: 0 !important;
          background: var(--el-menu-background-color);

          .el-tabs__nav-scroll {
            height: 100%;
            overflow-y: auto;

            &::-webkit-scrollbar {
              width: 0;
              height: 0;
            }
          }
        }
      }

      .el-tabs__nav {
        height: calc(100vh - var(--el-logo-height));
        background: var(--el-menu-background-color);
      }

      .el-tabs__item {
        height: auto;
        padding: 0;
        color: var(--el-color-white);

        &.is-active {
          margin-right: -1px;
          background: var(--el-color-primary);

          > .vab-column-grid {
            margin-right: 1px;
          }
        }
      }
    }

    .el-tabs__active-bar.is-left,
    .el-tabs--left .el-tabs__nav-wrap.is-left::after {
      display: none;
    }

    .el-menu {
      margin-top: 10px;
      border: 0;

      .el-menu-item,
      .el-sub-menu__title {
        height: var(--el-menu-item-height);
        overflow: hidden;
        line-height: var(--el-menu-item-height);
        text-overflow: ellipsis;
        white-space: nowrap;

        @include active;
      }
    }
  }

  &.is-collapse {
    :deep() {
      width: 0;
    }
  }
}

.float-fold {
  position: fixed;
  bottom: 13px;
  left: 14px;
  z-index: 9999;
  width: 34px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  background: var(--el-color-primary);
  border-radius: var(--el-border-radius-base);

  :deep() {
    .fold-unfold,
    .ri-user-heart-line {
      font-size: 20px;
      color: var(--el-color-white);
      cursor: pointer;
    }
  }
}

// =====custom design (minimal)=======

.vab-column-bar-card .el-tabs .el-tabs__item .vab-column-grid {
  width: 66px !important;
  height: 64px !important;
  margin: 4px auto !important;
  padding: 6px 2px !important;
  border-radius: 12px !important;
}

.vab-column-bar :deep(.el-tabs__item) {
  padding: 0 !important;
}

.vab-column-bar :deep(.el-tabs__item .vab-column-grid) {
  flex-direction: column;
  color: #6b7280;
  background: transparent !important;
  transition: all 0.18s ease;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: 100%;
  }

  svg,
  i {
    display: block;
    height: 18px;
    font-size: 18px;
    color: #6b7280;
    transition: color 0.18s ease;
  }

  span,
  .menu-title {
    display: block;
    width: 100%;
    font-size: 10px !important;
    font-weight: 500;
    line-height: 1.1;
    color: #6b7280;
    letter-spacing: -0.1px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    zoom: 1 !important;
  }

  &:hover {
    color: #2563eb !important;
    background: #eff6ff !important;

    svg,
    i,
    span,
    .menu-title {
      color: #2563eb !important;
    }
  }
}

.vab-column-bar :deep(.el-tabs__item.is-active .vab-column-grid) {
  color: #ffffff !important;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.3);

  svg,
  i,
  span,
  .menu-title {
    color: #ffffff !important;
  }
}

.el-menu-item,
.el-sub-menu__title {
  min-width: 100% !important;
  height: 40px !important;
  padding: 0 14px !important;
  margin-bottom: 2px !important;
  font-size: 13px !important;
  font-weight: 500 !important;
  color: #4b5563 !important;
  border-radius: 8px !important;
  transition: all 0.15s ease !important;

  i,
  svg {
    margin-right: 8px;
    font-size: 16px;
    color: inherit;
  }
}

.el-menu-item:hover,
.el-sub-menu__title:hover {
  color: #2563eb !important;
  background: #eff6ff !important;
}

.el-menu-item.is-active {
  color: #2563eb !important;
  font-weight: 600 !important;
  background: #eff6ff !important;
}

.menu-title,
i {
  color: inherit;
}

.dark .menu-title,
.dark i {
  color: #d1d5db;
}

.vab-column-bar .vab-column-grid-arrow {
  height: 56px;
}

.float-fold {
  position: fixed;
  bottom: 16px;
  left: 16px;
  width: 36px;
  height: 36px;
  line-height: 36px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
  border-radius: 10px !important;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
  transition: all 0.15s ease;

  &:hover {
    box-shadow: 0 6px 18px rgba(37, 99, 235, 0.35);
    transform: translateY(-1px);
  }

  :deep(.fold-unfold) {
    font-size: 18px !important;
    color: #ffffff !important;
  }
}

.el-tabs .el-tabs__header.is-left .el-tabs__nav-wrap.is-left {
  background: #ffffff !important;
  border-right: 1px solid #f1f3f5;
  padding: 6px 8px;
}
</style>
