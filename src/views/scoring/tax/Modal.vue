<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { getTaxRequeste_DEFAULT, createTax_API, TaxRequestModel } from '/@/services/tax'
import { rules } from './rules'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const emit = defineEmits(['refresh-table'])
const _title = ref('')
const _visible = ref(false)
const _formRef = ref<FormInstance>()
const _formData = ref<TaxRequestModel>(getTaxRequeste_DEFAULT())

const $baseMessage = inject<any>('$baseMessage')

function open() {
  _title.value = t('scoring_tax.create_new')
  _visible.value = true
}

function close() {
  reset()
}

function reset() {
  _formRef.value?.resetFields()
  _formData.value = getTaxRequeste_DEFAULT()
  _visible.value = false
}

function submit() {
  _formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      const [error] = await createTax_API(_formData.value)
      if (error) return
      $baseMessage(t('scoring_tax.created_successfully'), 'success', 'hey')
      close()
      emit('refresh-table')
    }
  })
}

defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="_visible" append-to-body draggable :title="_title" width="500px" @close="close">
    <el-form ref="_formRef" label-width="160px" :model="_formData" :rules="rules">
      <el-form-item :label="t('scoring_tax.fields.pinfl')" prop="pinfl">
        <el-input v-model="_formData.pinfl" clearable :maxlength="14" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">{{ $t('buttons.cancel') }}</el-button>
      <el-button type="primary" @click="submit">{{ $t('buttons.save') }}</el-button>
    </template>
  </el-dialog>
</template>
