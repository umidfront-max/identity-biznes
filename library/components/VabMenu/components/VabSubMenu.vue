<template>
  <template v-if="itemOrMenu.meta && itemOrMenu.meta.levelHidden">
    <template v-for="route in itemOrMenu.children" :key="route.path">
      <vab-menu :item="route" />
    </template>
  </template>
  <el-sub-menu v-else :index="itemOrMenu.path">
    <template #title>
      <vab-icon
        v-if="itemOrMenu.meta && itemOrMenu.meta.icon"
        :icon="itemOrMenu.meta.icon"
        :is-custom-svg="itemOrMenu.meta.isCustomSvg"
        :title="translate(itemOrMenu.meta.title)"
      />
      <span :title="translate(itemOrMenu.meta.title)">
        {{ translate(itemOrMenu.meta.title) }}
      </span>
    </template>
    <slot />
  </el-sub-menu>
</template>

<script lang="ts" setup>
import { translate } from '/@/i18n'

defineOptions({
  name: 'VabSubMenu',
})

defineProps({
  itemOrMenu: {
    type: Object,
    default() {
      return null
    },
  },
})
</script>
<style lang="scss">
.el-sub-menu.is-active {
  .el-sub-menu__title {
    color: var(--el-color-primary);
    background: var(--el-color-primary-light-9) !important;
  }
}
.el-menu-item.is-active {
  color: var(--el-color-primary);
  background-color: none !important;
}
.el-menu-item {
  height: 42px !important;
}
.el-sub-menu__title span {
  font-size: 16px !important;
}
.vab-layout-horizontal {
  .el-sub-menu__title span {
    font-size: 14px !important;
  }
}
.vab-layout-vertical {
  .el-menu-item {
    height: 36px !important;
  }
}
</style>
