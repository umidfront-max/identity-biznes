<script lang="ts" setup>
import { type FormInstance } from 'element-plus'
import { _rules } from './rules'
import {
  createTransaction_API,
  getTransactionRequest_DEFAULT,
  updateTransaction_API,
  type TransactionRequestModel,
} from '/@/services/instalment/transaction'
import { getCustomers_API, CustomerShortDetailsModel } from '~/src/services/customer'
import { useI18n } from 'vue-i18n'
import { getTransactionType_API, TransactionTypeModel } from '~/src/services/transactionType'

const route = useRoute()
const { t } = useI18n()
const emit = defineEmits(['update'])
const _title = ref('')
const _visible = ref(false)
const _formRef = ref<FormInstance>()
const _formData = ref<TransactionRequestModel>(getTransactionRequest_DEFAULT())
const _customers = ref<CustomerShortDetailsModel[]>([])

const _transaction = ref<TransactionTypeModel[]>([])
const $baseMessage = inject<any>('$baseMessage')

function open(item: TransactionRequestModel) {
  _title.value = t('installment.create_new_transaction_type')
  console.log('adasdasd', item)
  if (item) {
    _title.value = `Update TransactionType: ${item.customer_id}`
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
  _formData.value = getTransactionRequest_DEFAULT()
  _visible.value = false
}
async function loadItems() {
  const [error, response] = await getTransactionType_API()

  if (error) return
  _transaction.value = response.data.filter((item) => !item.is_system)
}
async function getCustomer() {
  const [error, response] = await getCustomers_API()

  if (error) return
  _customers.value = response.data
}

getCustomer()

function submit() {
  _formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      _formData.value.installment_id = Number(route?.query?.id)
      const handleTransactionTypeAPI = _formData.value?.id ? updateTransaction_API : createTransaction_API

      const [error] = await handleTransactionTypeAPI(_formData.value)
      if (error) return

      $baseMessage(`Transaction ${_formData.value?.id ? 'updated' : 'created'} successfully`, 'success', 'hey')
      close()
    }
  })
}

defineExpose({
  open,
})
loadItems()
</script>

<template>
  <el-dialog v-model="_visible" append-to-body draggable :title="_title" width="550px" @close="close">
    <el-form ref="_formRef" class="transaction-grid" label-position="top" label-width="160px" :model="_formData" :rules="_rules">
      <el-form-item :label="t('installment.fields.customer_id')" prop="customer_id">
        <el-select v-model="_formData.customer_id" clearable placeholder="Select">
          <el-option v-for="item in _customers" :key="item.id" :label="item.first_name + ' ' + item.last_name" :value="item.id as number" />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('installment.fields.transaction_type_id')" prop="transaction_type_id">
        <el-select v-model="_formData.transaction_type_id" clearable placeholder="Select">
          <el-option v-for="item in _transaction" :key="item.id" :label="item.name" :value="item.id as number" />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('installment.fields.amount')" prop="amount">
        <el-input v-model.trim="_formData.amount" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">{{ $t('buttons.cancel') }}</el-button>
      <el-button type="primary" @click="submit">{{ $t('buttons.save') }}</el-button>
    </template>
  </el-dialog>
</template>
<style lang="scss">
.transaction-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 30px;
}
</style>
