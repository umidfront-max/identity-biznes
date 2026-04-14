<template>
  <el-config-provider :button="{ autoInsertSpace: true }" :locale="locale">
    <router-view />
    <vab-update v-if="pwa" />
  </el-config-provider>
</template>

<script lang="ts" setup>
import { pwa } from '/@/config'
import { enLocale, ruLocale } from '/@/i18n'

defineOptions({
  name: 'VabApp',
})

const { locale: language } = useI18n()
const locale = computed(() => (language.value === 'en' ? enLocale : ruLocale))
</script>
