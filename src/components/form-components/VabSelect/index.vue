<template>
  <el-select clearable :model-value="modelValue" :placeholder="label" @change="$emit('update:modelValue', $event)">
    <el-option v-for="item in items" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script lang="ts" setup>
defineProps<VabSelectProps>()
defineEmits(['update:modelValue'])

interface VabSelectProps {
  modelValue: any
  label: string
  items: SelectOption[]
}
</script>
<style scoped lang="scss">
.el-select {
  width: 100%;
}
</style>
