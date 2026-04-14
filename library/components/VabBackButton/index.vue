<template>
  <vab-icon icon="delete-back-line" :style="{ fontSize: '30px' }" @click="router.back()" />
</template>

<script lang="ts" setup>
import router from '/@/router'

defineOptions({ name: 'VabBackButton' })
</script>
