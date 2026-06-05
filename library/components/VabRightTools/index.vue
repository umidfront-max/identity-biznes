<template>
  <div class="vab-right-tools">
    <vab-language v-show="theme.showLanguage" />
    <vab-dark v-show="theme.showDark" />
    <vab-notice v-show="theme.showNotice" />
    <vab-avatar />
  </div>
</template>

<script lang="ts" setup>
import { useSettingsStore } from '/@/store/modules/settings'

defineOptions({
  name: 'VabRightTools',
})

defineProps({
  isHorizontal: {
    type: Boolean,
    default: false,
  },
})

const settingsStore = useSettingsStore()
const { theme } = storeToRefs(settingsStore)
</script>

<style lang="scss" scoped>
.vab-right-tools {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
}
</style>
