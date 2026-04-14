<template>
  <div
    class="vab-logo"
    :class="{
      ['vab-logo-' + theme.layout]: true,
    }"
  >
    <!-- <router-link to="/">
      <span class="logo">
        <vab-icon v-if="logo" :icon="logo" is-custom-svg />
      </span>
      <span class="title" :class="{ 'hidden-xs-only': theme.layout === 'horizontal' }">
        {{ title }}
      </span>
    </router-link> -->
    <router-link class="router-logo" to="/">
      <img alt="" src="/src/assets/logo3.svg" style="display: inline-block; height: 40px; padding-top: 8px; margin-right: 60px" />
      <span v-if="(route.path.includes('profile') || route.path == '/') && theme.layout == 'column'" class="logo">
        <img v-if="logo" src="/src/assets/logo2.svg" style="display: inline-block; width: 42px; height: 42px; margin-right: auto" />
      </span>
      <!-- <vab-icon :icon="logo" is-custom-svg /> -->
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { useSettingsStore } from '/@/store/modules/settings'

defineOptions({
  name: 'VabLogo',
})
const route = useRoute()
const settingsStore = useSettingsStore()
const { theme, logo } = storeToRefs(settingsStore)
</script>

<style lang="scss" scoped>
@mixin container {
  position: relative;
  height: var(--el-header-height);
  overflow: hidden;
  line-height: var(--el-header-height);
  background: transparent;
}

@mixin logo {
  display: inline-block;
  width: 32px;
  height: 32px;
  color: var(--el-title-color);
  vertical-align: middle;
  fill: currentColor;
}

@mixin title {
  display: inline-block;
  margin-left: 5px;
  overflow: hidden;
  font-size: 20px;
  line-height: 55px;
  color: var(--el-title-color);
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}

.vab-logo {
  &-horizontal {
    @include container;

    .logo {
      svg,
      img {
        @include logo;
      }
    }

    .title {
      @include title;
    }
  }

  &-vertical,
  &-column,
  &-comprehensive {
    @include container;

    height: var(--el-logo-height);
    line-height: var(--el-logo-height);
    text-align: center;

    .logo {
      svg,
      img {
        @include logo;
      }
    }

    .title {
      @include title;
      max-width: calc(var(--el-left-menu-width) - 60);
    }
  }

  &-column {
    background: var(--el-color-white) !important;

    .logo {
      position: fixed;
      top: 0;
      display: block;
      width: var(--el-left-menu-width-min);
      height: var(--el-logo-height);
      margin: 0;
      background: var(--el-menu-background-color);
    }

    .title {
      position: fixed;
      left: var(--el-left-menu-width-min) !important;
      box-sizing: border-box;
      display: block !important;
      width: calc(var(--el-left-menu-width) - var(--el-left-menu-width-min) - 1px);
      height: var(--el-nav-height);
      margin-left: 0 !important;
      color: var(--el-color-black) !important;
      background: var(--el-color-white) !important;
      border-bottom: 1px solid var(--el-border-color);

      @include title;
    }
  }
}
.vab-logo-column .logo {
  border-right: 1px solid #d9dbe8 !important;
  border-bottom: 1px solid #d9dbe8 !important;
}
.router-logo {
  display: block;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #d9dbe8;
}
.vab-layout-horizontal {
  .router-logo {
    border-bottom: none;
  }
}
</style>
