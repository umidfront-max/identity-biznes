<template>
  <div
    class="vab-logo"
    :class="{
      ['vab-logo-' + theme.layout]: true,
    }"
  >
    <router-link class="router-logo" to="/">
      <span class="brand-mark">IB</span>
      <span class="brand-title">{{ title }}</span>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { useSettingsStore } from '/@/store/modules/settings'

defineOptions({
  name: 'VabLogo',
})
const settingsStore = useSettingsStore()
const { theme, title } = storeToRefs(settingsStore)
</script>

<style lang="scss" scoped>
.vab-logo {
  position: relative;
  height: var(--el-logo-height);
  overflow: visible;
  background: #ffffff;
  border-bottom: 1px solid #ececec;
}

/* Column layout: IB mark centered in icon column, title positioned in menu column */
.vab-logo-column {
  .router-logo {
    display: block;
    height: 100%;
  }

  .brand-mark {
    position: absolute;
    top: 50%;
    left: calc(var(--el-left-menu-width-min) / 2);
    transform: translate(-50%, -50%);
  }

  .brand-title {
    position: absolute;
    top: 50%;
    left: var(--el-left-menu-width-min);
    transform: translateY(-50%);
    padding-left: 16px;
    width: calc(var(--el-left-menu-width) - var(--el-left-menu-width-min) - 16px);
  }
}

/* Vertical / comprehensive / horizontal layouts: inline */
.vab-logo-vertical,
.vab-logo-comprehensive,
.vab-logo-horizontal {
  .router-logo {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 20px;
    gap: 10px;
    text-decoration: none;
  }
}

.router-logo {
  text-decoration: none;
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);
}

.brand-title {
  font-size: 15px;
  font-weight: 600;
  color: #111;
  letter-spacing: -0.2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* When sidebar collapsed — hide title, keep only IB mark */
.vab-column-bar.is-collapse .brand-title,
.vab-side-bar.is-collapse .brand-title {
  display: none;
}
</style>
