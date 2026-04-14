<script setup lang="ts">
import { translate } from '/@/i18n'
import { ThemeType } from '/@/store/modules/types.ts'

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
const layoutList = ref<any>(['column', 'vertical', 'horizontal', 'comprehensive'])

const themeNameList = ref<any>([
  { label: 'default', title: '默认' },
  { label: 'plain', title: '简洁' },
  { label: 'technology', title: '科技' },
])

const menuWidthList = ref<any>(['266px', '277px', '288px', '299px'])

const tabsBarStyleList = ref<any>([
  { label: '卡片', value: 'card' },
  { label: '灵动', value: 'smart' },
  { label: '圆滑', value: 'smooth' },
  { label: '矩形', value: 'rect' },
])

const columnStyleList = ref<any>([
  { value: 'vertical', label: '纵向' },
  { value: 'horizontal', label: '横向' },
  { value: 'card', label: '卡片' },
  { value: 'arrow', label: '箭头' },
  { value: 'semicircle', label: '半圆' },
])

const pageTransitionList = ref<any>([
  { value: 'el-fade-in-linear', label: 'fade-in-linear' },
  { value: 'el-fade-in', label: 'fade-in' },
  { value: 'el-zoom-in-center', label: 'zoom-in-center' },
  { value: 'el-zoom-in-top', label: 'zoom-in-top' },
  { value: 'el-zoom-in-bottom', label: 'zoom-in-bottom' },
])

const onSave = () => {
  emits('update', theme.value)
}
</script>

<template>
  <div v-loading="loading">
    <el-form v-if="theme" ref="form" label-position="top" :model="theme">
      <el-card shadow="never">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item class="vab-shop-item1">
              <template #label>
                {{ translate('Layouts') }}
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
            <el-form-item :label="translate('Theme')">
              <el-radio-group v-model="theme.themeName">
                <el-radio-button v-for="item in themeNameList" :key="item.label" :label="item.label">
                  <template #default>{{ translate(item.title) }}</template>
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="translate('Radius')">
              <el-input-number v-model="theme.radius" :max="26" :min="3" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item :label="translate('Passcode')">
              <el-input v-model="theme.passcode" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="translate('Transition')">
              <el-select v-model="theme.pageTransition">
                <el-option v-for="item in pageTransitionList" :key="item.value" :label="translate(item.label)" :value="item.value" />
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
                {{ translate('Tabs style') }}
              </template>
              <el-select v-model="theme.tabsBarStyle">
                <el-option v-for="item in tabsBarStyleList" :key="item.value" :label="translate(item.label)" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item v-if="theme.layout !== 'horizontal'" :label="translate('Menu width')">
              <el-select v-model="theme.menuWidth">
                <el-option v-for="item in menuWidthList" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item v-if="theme.layout === 'column'">
              <template #label>
                {{ translate('Column') }}
              </template>
              <el-select v-model="theme.columnStyle">
                <el-option v-for="item in columnStyleList" :key="item.value" :label="translate(item.label)" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <el-row>
          <el-col :span="4">
            <el-form-item :label="translate('标签')">
              <el-switch v-model="theme.showTabs" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="translate('Follow color')">
              <el-switch v-model="theme.isFollow" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="translate('Lock')">
              <el-switch v-model="theme.showLock" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="translate('Footer')">
              <el-switch v-model="theme.showFooter" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="translate('Header')">
              <el-switch v-model="theme.fixedHeader" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="translate('Notice')">
              <el-switch v-model="theme.showNotice" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item :label="translate('dark')">
              <el-switch v-model="theme.showDark" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="translate('Language')">
              <el-switch v-model="theme.showLanguage" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="translate('Progress')">
              <el-switch v-model="theme.showProgressBar" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="translate('Refresh')">
              <el-switch v-model="theme.showRefresh" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="translate('Search')">
              <el-switch v-model="theme.showSearch" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="translate('Full screen')">
              <el-switch v-model="theme.showFullScreen" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item v-if="theme.showTabs">
              <template #label>
                {{ translate('Persistent tags') }}
              </template>
              <el-switch v-model="theme.showTabs" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item v-if="theme.showTabs">
              <template #label>
                {{ translate('Tabs Icon') }}
              </template>
              <el-switch v-model="theme.showTabsIcon" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </el-form>
    <div class="">
      <el-button :loading="loading" plain style="min-width: 100px" type="primary" @click="onSave">Save</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.el-select {
  width: 100%;
}
</style>
