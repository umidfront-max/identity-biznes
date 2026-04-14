<script setup lang="ts">
import { translate } from '/@/i18n'
import { useI18n } from 'vue-i18n'
import { ThemeType } from '/@/store/modules/types.ts'
import { rules } from './rules'
const { t } = useI18n()
const props = defineProps<{
  propsTheme: ThemeType
  loading: boolean
}>()

const theme = ref<any>(null)

watch(
  () => props.propsTheme,
  (val) => {
    theme.value = val
  }
)

const emits = defineEmits(['update'])
const layoutList = ref<string[]>(['column', 'vertical', 'horizontal', 'comprehensive'])

const themeNameList = ref([
  { label: t('profile.default'), title: t('profile.default') },
  { label: t('profile.plain'), title: t('profile.plain') },
  { label: t('profile.technology'), title: t('profile.technology') },
])

const menuWidthList = ref<any>(['266px', '277px', '288px', '299px'])

const tabsBarStyleList = ref([
  { label: t('profile.card'), value: 'card' },
  { label: t('profile.smart'), value: 'smart' },
  { label: t('profile.smooth'), value: 'smooth' },
  { label: t('profile.rect'), value: 'rect' },
])

const columnStyleList = ref([
  { value: 'vertical', label: t('profile.vertical') },
  { value: 'horizontal', label: t('profile.horizontal') },
  { value: 'card', label: t('profile.card') },
  { value: 'arrow', label: t('profile.arrow') },
  { value: 'semicircle', label: t('profile.semicircle') },
])

const pageTransitionList = ref([
  { value: 'el-fade-in-linear', label: t('profile.fade_in_linear') },
  { value: 'el-fade-in', label: t('profile.fade_in') },
  { value: 'el-zoom-in-center', label: t('profile.zoom_in_center') },
  { value: 'el-zoom-in-top', label: t('zoom_in_top') },
  { value: 'el-zoom-in-bottom', label: t('profile.zoom_in_bottom') },
])

const onSave = () => {
  emits('update', theme.value)
}
</script>

<template>
  <div v-loading="loading">
    <el-form v-if="theme" ref="form" label-position="top" :model="theme" :rules="rules">
      <el-card shadow="never">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item class="vab-shop-item1">
              <template #label>
                {{ $t('profile.layouts') }}
              </template>
              <el-radio-group v-model="theme.layout" class="vab-shop-layout">
                <el-radio-button v-for="item in layoutList" :key="item" :label="item">
                  <template #default>
                    <vab-icon :icon="item" is-custom-svg />
                  </template>
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="t('Theme')">
              <el-radio-group v-model="theme.themeName">
                <el-radio-button v-for="item in themeNameList" :key="item.label" :label="item.label">
                  <template #default>{{ translate(item.title) }}</template>
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="t('profile.radius')">
              <el-input-number v-model="theme.radius" :max="26" :min="3" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item :label="t('profile.passcode')">
              <el-input v-model="theme.passcode" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="t('profile.transition')" prop="pageTransition">
              <el-select v-model="theme.pageTransition">
                <el-option v-for="item in pageTransitionList" :key="item.value" :label="t(item.label)" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item v-if="theme.showTabs">
              <template #label>
                {{ t('profile_tabs_style') }}
              </template>
              <el-select v-model="theme.tabsBarStyle">
                <el-option v-for="item in tabsBarStyleList" :key="item.value" :label="t(item.label)" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item v-if="theme.layout !== 'horizontal'" :label="t('profile.menu_width')">
              <el-select v-model="theme.menuWidth">
                <el-option v-for="item in menuWidthList" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item v-if="theme.layout === 'column'">
              <template #label>
                {{ $t('profile.column') }}
              </template>
              <el-select v-model="theme.columnStyle">
                <el-option v-for="item in columnStyleList" :key="item.value" :label="t(item.label)" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <el-row>
          <el-col :span="4">
            <el-form-item :label="t('profile.label')">
              <el-switch v-model="theme.showTabs" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="t('profile.follow_color')">
              <el-switch v-model="theme.isFollow" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="t('profile.lock')">
              <el-switch v-model="theme.showLock" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="t('profile.footer')">
              <el-switch v-model="theme.showFooter" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="t('profile.header')">
              <el-switch v-model="theme.fixedHeader" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="t('profile.notice')">
              <el-switch v-model="theme.showNotice" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item :label="t('profile.dark')">
              <el-switch v-model="theme.showDark" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="t('profile.language')">
              <el-switch v-model="theme.showLanguage" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="t('profile.progress')">
              <el-switch v-model="theme.showProgressBar" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="t('profile.refresh')">
              <el-switch v-model="theme.showRefresh" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="t('profile.search')">
              <el-switch v-model="theme.showSearch" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="t('profile.full_screen')">
              <el-switch v-model="theme.showFullScreen" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item v-if="theme.showTabs">
              <template #label>
                {{ $t('profile.persistent_tags') }}
              </template>
              <el-switch v-model="theme.showTabs" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item v-if="theme.showTabs">
              <template #label>
                {{ $t('profile.tabs_icon') }}
              </template>
              <el-switch v-model="theme.showTabsIcon" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </el-form>
    <div class="">
      <el-button :loading="loading" plain style="min-width: 100px" type="primary" @click="onSave">{{ $t('buttons.save') }}</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.el-select {
  width: 100%;
}
</style>
