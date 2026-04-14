<template>
  <el-dropdown class="vab-language" @command="handleCommand" @visible-change="handleVisibleChange">
    <el-button v-if="locale == 'ru'" class="language_btn">
      <div class="langs">
        <img alt="" src="https://uxwing.com/wp-content/themes/uxwing/download/flags-landmarks/russia-flag-icon.png" />
        <p>Русский</p>
      </div>
      <vab-icon class="vab-dropdown" :class="{ 'vab-dropdown-active': active }" icon="arrow-down-s-line" />
    </el-button>
    <el-button v-if="locale == 'uz'" class="language_btn">
      <div class="langs">
        <img alt="" src="/src/assets/uz.svg" />
        <p>O'zbekcha</p>
      </div>
      <vab-icon class="vab-dropdown" :class="{ 'vab-dropdown-active': active }" icon="arrow-down-s-line" />
    </el-button>
    <el-button v-else class="language_btn">
      <div class="langs">
        <img alt="" src="https://i.pinimg.com/originals/2d/b7/76/2db7763b253f6380575929ac404b4b0b.png" />
        <p>English</p>
      </div>
      <vab-icon class="vab-dropdown" :class="{ 'vab-dropdown-active': active }" icon="arrow-down-s-line" />
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="ru">Русский</el-dropdown-item>
        <el-dropdown-item command="uz">O'zbekcha</el-dropdown-item>
        <el-dropdown-item command="en">English</el-dropdown-item>
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

const handleCommand = (language: string) => {
  changeLanguage(language)
  locale.value = language
  document.title = getPageTitle(route.meta.title)
  location.reload()
}
</script>
<style lang="scss">
.language_btn {
  width: 112px !important;
  height: 32px;
  padding: 5px !important;
  margin-left: 10px;
  background: #f1f5f9 !important;
  .langs {
    display: flex;
    column-gap: 1px;
    align-items: center;
    width: 90px;
    p {
      margin-top: 17px;
    }
    img {
      width: 16px;
      height: 16px;
      border-radius: 100%;
    }
  }
  &:hover {
    background: var(--el-color-primary-light-9) !important;
  }
  .vab-dropdown {
    color: #0f172a !important;
  }
  img {
    margin-right: 5px;
  }
  .icons {
    font-size: 15px;
    color: #0f172a !important;
  }
  .el-button {
    width: 32px !important;
    padding: 5px !important;
  }
}
.dark .language_btn {
  background: transparent !important;
  .icons,
  .vab-dropdown {
    color: #f1f5f9 !important;
  }
  &:hover {
    background: var(--el-color-primary-light-9) !important;
  }
}
</style>
