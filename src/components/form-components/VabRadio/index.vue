<template>
  <el-radio-group :model-value="modelValue" @change="$emit('update:modelValue', $event)">
    <el-radio v-for="item in items" :key="item.value" border :label="item.value" :placeholder="item.label">
      {{ item.label }}
    </el-radio>
  </el-radio-group>
</template>

<script lang="ts" setup>
defineProps<VabRadioProps>()
defineEmits(['update:modelValue'])

interface VabRadioProps {
  modelValue: any
  label: string
  items: any[]
}
</script>
