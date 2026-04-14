<template>
  <el-input-number :model-value="Number(modelValue)" :placeholder="label" @change="$emit('update:modelValue', $event)" />
</template>

<script lang="ts" setup>
import { ElInputNumber } from 'element-plus'

defineProps<VabInputNumberProps>()
defineEmits(['update:modelValue'])

interface VabInputNumberProps {
  modelValue: unknown
  label: string
}
</script>
