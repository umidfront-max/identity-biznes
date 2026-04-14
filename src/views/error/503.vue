<template>
  <div class="error-container">
    <div class="error-content">
      <div class="pic-error">
        <vab-icon class="error-svg" icon="503" is-custom-svg />
      </div>
      <div class="bullshit">
        <div class="bullshit-oops">{{ oops }}</div>
        <div class="bullshit-headline">{{ headline }}</div>
        <div class="bullshit-info">{{ info }}</div>
        <router-link v-slot="{ navigate }" custom to="/">
          <el-button type="primary" @click="navigate">{{ btn }}</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const oops = ref<string>(t('error.503.oops'))
const headline = ref<string>(t('error.503.headline'))
const info = ref<string>(t('error.503.info'))
const btn = ref<string>(t('error.503.btn'))
</script>

<style lang="scss">
@import './scss/error';
</style>
