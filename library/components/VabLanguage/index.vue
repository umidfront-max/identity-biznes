<template>
  <el-dropdown class="vab-language" @command="handleCommand" @visible-change="handleVisibleChange">
    <button class="lang-btn">
      <span class="lang-code">{{ currentLang.code }}</span>
      <vab-icon class="lang-chevron" :class="{ 'is-active': active }" icon="arrow-down-s-line" />
    </button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="ru">
          <span class="lang-item">
            <span class="lang-item-code">RU</span>
            <span>Русский</span>
          </span>
        </el-dropdown-item>
        <el-dropdown-item command="uz">
          <span class="lang-item">
            <span class="lang-item-code">UZ</span>
            <span>O'zbekcha</span>
          </span>
        </el-dropdown-item>
        <el-dropdown-item command="en">
          <span class="lang-item">
            <span class="lang-item-code">EN</span>
            <span>English</span>
          </span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { useSettingsStore } from '/@/store/modules/settings'
import getPageTitle from '/@/utils/pageTitle'

defineOptions({
  name: 'VabLanguage',
})

const active = ref<boolean>(false)

const handleVisibleChange = (value: boolean) => {
  active.value = value
}

const { locale } = useI18n()
const route = useRoute()
const settingsStore = useSettingsStore()
const { changeLanguage } = settingsStore

const currentLang = computed(() => {
  if (locale.value === 'ru') return { code: 'RU' }
  if (locale.value === 'uz') return { code: 'UZ' }
  return { code: 'EN' }
})

const handleCommand = (language: string) => {
  changeLanguage(language)
  locale.value = language
  document.title = getPageTitle(route.meta.title)
  location.reload()
}
</script>
<style lang="scss" scoped>
.lang-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 40px;
  padding: 0 12px 0 14px;
  background: #f3f4f6;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.lang-btn:hover {
  background: #e5e7eb;
}

.lang-code {
  font-size: 13px;
  font-weight: 600;
  color: #111111;
  letter-spacing: 0.3px;
}

.lang-chevron {
  font-size: 16px;
  color: #111111;
  transition: transform 0.2s ease;
}

.lang-chevron.is-active {
  transform: rotate(180deg);
}

.dark .lang-btn {
  background: #1f2937;
}

.dark .lang-code,
.dark .lang-chevron {
  color: #f3f4f6;
}

.dark .lang-btn:hover {
  background: #374151;
}
</style>

<style lang="scss">
.lang-item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;

  .lang-item-code {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 22px;
    font-size: 10px;
    font-weight: 700;
    color: #6b7280;
    background: #f3f4f6;
    border-radius: 6px;
    letter-spacing: 0.3px;
  }
}
</style>
