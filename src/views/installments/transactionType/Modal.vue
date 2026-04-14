<script lang="ts" setup>
import { type FormInstance } from 'element-plus'
import { _rules } from './rules'
import {
  createTransactionType_API,
  getTransactionType_DEFAULT,
  updateTransactionType_API,
  type TransactionTypeModel,
} from '/@/services/transactionType'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const emit = defineEmits(['update'])
const _title = ref('')
const _visible = ref(false)
const _formRef = ref<FormInstance>()
const _formData = ref<TransactionTypeModel>(getTransactionType_DEFAULT())

const $baseMessage = inject<any>('$baseMessage')

function open(item?: TransactionTypeModel) {
  _title.value = t('installments.create_new_transaction_type')
  if (item) {
    _title.value = `${t('buttons.edit')}: ${item.name}`
    _formData.value = { ...item }
  }

  _visible.value = true
}

function close() {
  emit('update')
  reset()
}

function reset() {
  _formRef.value?.resetFields()
  _formData.value = getTransactionType_DEFAULT()
  _visible.value = false
}

function submit() {
  _formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      console.log('_formData.value.id ', _formData.value.id)

      const handleTransactionTypeAPI = _formData.value.id ? updateTransactionType_API : createTransactionType_API

      const [error] = await handleTransactionTypeAPI(_formData.value)
      if (error) return

      $baseMessage(t('installments.success'), 'success', 'hey')
      close()
    }
  })
}

defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="_visible" append-to-body draggable :title="_title" width="500px" @close="close">
    <el-form ref="_formRef" label-width="160px" :model="_formData" :rules="_rules">
      <el-form-item :label="t('installments.fields.name')" prop="name">
        <el-input v-model.trim="_formData.name" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">{{ $t('buttons.cancel') }}</el-button>
      <el-button type="primary" @click="submit">{{ $t('buttons.save') }}</el-button>
    </template>
  </el-dialog>
</template>
