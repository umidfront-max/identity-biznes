<script lang="ts" setup>
defineOptions({ name: 'VabDynamicForm' })

import DynamicFormModelConfig from '/@/config/dynamic-form-model.config.ts'

const props = defineProps<{ formModel: DynamicFormModelConfig }>()
const emits = defineEmits(['onClose', 'onSuccess'])

const model = props.formModel

const getColOptions = (field: any) => {
  const defaultOptions = {
    span: 12,
  }

  return {
    ...defaultOptions,
    ...(field.colOptions ?? {}),
  }
}

const binds = (params: { component: any; field?: any; disabled?: any; loading?: any }) => {
  const bind = { ...params }

  delete bind.component
  bind.field = params
  if (model.loading.value) {
    bind.disabled = true
    bind.loading = true
  }

  return bind
}

const onSubmit = () => {
  model.submit().then((res: any) => {
    if (res.success) {
      emits('onSuccess')
    }
  })
}

const onCancel = () => {
  model.cancel()
  model.formRef.value.resetFields()
  emits('onClose')
}

onMounted(() => {
  model.resetFormData()
})
</script>

<template>
  <vab-card>
    <el-form :ref="model.formRef" label-position="top" label-width="200px" :model="model.formData" :rules="model.rules" @submit.prevent>
      <el-row :gutter="20">
        <el-col v-for="field in Object.keys(model.fields)" :key="field" v-bind="getColOptions(model.fields[field])">
          <el-form-item :label="model.fields[field].label" :prop="field">
            <component :is="model.fields[field].component" v-model="model.formData.value[field]" v-bind="binds(model.fields[field])" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="display: flex; justify-content: flex-end">
      <el-button :disabled="model.loading.value" plain style="min-width: 100px" type="danger" @click="onCancel">
        {{ model.cancelButtonText.value }}
      </el-button>
      <el-button
        :disabled="model.loading.value"
        :loading="model.loading.value"
        plain
        style="min-width: 100px"
        type="primary"
        @click="onSubmit"
      >
        {{ model.submitButtonText.value }}
      </el-button>
    </div>
  </vab-card>
</template>

<style lang="scss" scoped>
html body .el-dialog__body .el-form:not(.el-form--inline) {
  margin: 0 !important;
}
</style>
