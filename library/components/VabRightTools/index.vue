<template>
  <div class="vab-right-tools">
    <!-- <vab-search v-show="!isHorizontal" class="hidden-xs-only" /> -->
    <!-- <vab-dark v-show="theme.showDark" :style="!isHorizontal ? '' : { marginLeft: 'var(--el-margin)' }" /> -->
    <p v-if="mode !== 'dark'" style="width: 110px">Светлый режим</p>
    <p v-else style="width: 110px">Темный режим</p>
    <vab-dark :style="!isHorizontal ? '' : { marginLeft: 'var(--el-margin)' }" />
    <!--    <vab-color-picker v-show="theme.showColorPicker" />-->
    <!--    <vab-theme v-show="theme.showTheme && routeName !== 'SeparateLayout'" />-->
    <!-- <vab-error-log class="hidden-xs-only" /> -->
    <vab-lock v-show="theme.showLock" />
    <vab-notice v-show="theme.showNotice" />
    <vab-language v-show="theme.showLanguage" />
    <vab-fullscreen v-show="theme.showFullScreen" />
    <!--    TODO don't call tariffs API if user has not access -->
    <calculator-form v-if="hasAccess(PERMISSION_ENUM.calculate_installment)" />
    <vab-refresh v-show="theme.showRefresh" />
    <vab-avatar />
  </div>
</template>

<script lang="ts" setup>
import { useSettingsStore } from '/@/store/modules/settings'
import CalculatorForm from '../../../src/components/CalculatorForm.vue'
import { hasAccess } from '/@/utils/permission.ts'
import { PERMISSION_ENUM } from '/@/router/pemissionsEnum.ts'

// import { _colorStore } from '/@/store/settings/settings-store.ts'
defineOptions({
  name: 'VabRightTools',
})

defineProps({
  isHorizontal: {
    type: Boolean,
    default: false,
  },
})
const route = useRoute()
const settingsStore = useSettingsStore()
const { theme, mode } = storeToRefs(settingsStore)
const routeName = ref<any>(route.name)
watch(
  route,
  () => {
    routeName.value = route.name
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.vab-right-tools {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
