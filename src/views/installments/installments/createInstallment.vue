<script lang="ts" setup>
import {
  _instalmentStore,
  createInstallment_API,
  _byPasportStore,
  _creditStore,
  getInstallmentRequest_DEFAULT,
  getByPasport_DEFAULT,
  getInstallment_DEFAULT,
} from '~/src/services/instalment'
import { formatDate_UTIL } from '~/src/utils/dateFormat'
import { _customerFullInfoStore, getCustomerFullRequestInfo_DEFAULT } from '~/src/services/customer'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emit = defineEmits(['prew'])
const router = useRouter()
async function createInstallment() {
  const [error] = await createInstallment_API(_instalmentStore.value)
  if (error) return
  ElMessage.success(t('installments.credit_created'))
  _instalmentStore.value = getInstallmentRequest_DEFAULT()
  _creditStore.value = getInstallment_DEFAULT()
  _byPasportStore.value = getByPasport_DEFAULT()
  _customerFullInfoStore.value = getCustomerFullRequestInfo_DEFAULT()
  router.push('/installments/installments')
  setTimeout(() => {
    emit('prew', 0)
  }, 500)
}
</script>

<template>
  <div style="margin-top: 20px">
    <el-descriptions border :column="2" :title="t('installments.passport_info')">
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.passport_series') }}</template>
        {{ _customerFullInfoStore.passport_series }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.passport_number') }}</template>
        {{ _customerFullInfoStore.passport_number }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.birth_date') }}</template>
        {{ _customerFullInfoStore.birth_date }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.first_name') }}</template>
        {{ _customerFullInfoStore.first_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.last_name') }}</template>
        {{ _customerFullInfoStore.last_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.middle_name') }}</template>
        {{ _customerFullInfoStore.middle_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.pinfl') }}</template>
        {{ _customerFullInfoStore.pinfl }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.tin') }}</template>
        {{ _customerFullInfoStore.tin }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.tin') }}</template>
        {{ _customerFullInfoStore.tin }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.dwelling_place') }}</template>
        {{ _customerFullInfoStore.birth_place }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.passport_given_date') }}</template>
        {{ _customerFullInfoStore.passport_given_date }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.passport_expiration_date') }}</template>
        {{ _customerFullInfoStore.passport_expiration_date }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.passport_citizenship') }}</template>
        {{ _customerFullInfoStore.passport_citizenship }}
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions border :column="2" style="margin-top: 20px" :title="t('installments.credit_info')">
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.customer_id') }}</template>
        {{ _instalmentStore.customer_id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.branch') }}</template>
        {{ _creditStore.branch.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.tariff') }}</template>
        {{ _creditStore.tariff.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.starts_in') }}</template>
        {{ formatDate_UTIL(+new Date(_instalmentStore.starts_in)) }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.amount') }}</template>
        {{ _instalmentStore.amount }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.period') }}</template>
        {{ _instalmentStore.period }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.initial_fee') }}</template>
        {{ _instalmentStore.initial_fee }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.description') }}</template>
        {{ _instalmentStore.description }}
      </el-descriptions-item>
    </el-descriptions>
    <div style="display: flex; justify-content: space-between; margin-top: 20px">
      <el-button type="danger" @click="emit('prew', 1)">{{ $t('buttons.back') }}</el-button>
      <el-button type="primary" @click="createInstallment">{{ $t('installments.create_credit') }}</el-button>
    </div>
  </div>
</template>
