<script lang="ts" setup>
import { useTabsStore } from '/@/store/modules/tabs.ts'
import { handleActivePath } from '/@/utils/routes'
import { formatDate_UTIL } from '~/src/utils/dateFormat'
import { getSingleTransaction_API, TransactionResponseModel, getTransactionResponse_DEFAULT } from '~/src/services/instalment/transaction'
defineOptions({
  name: 'SingleBranches',
})

const route: any = useRoute()
const tabsStore = useTabsStore()
const { delVisitedRoute } = tabsStore
const _item = ref<TransactionResponseModel>(getTransactionResponse_DEFAULT())

const goBack = async () => {
  await delVisitedRoute(handleActivePath(route, true))
  history.back()
}
async function loadItems() {
  const [error, response] = await getSingleTransaction_API(route.query.id)

  if (error) return
  _item.value = response.data
}
loadItems()
</script>

<template>
  <div class="default-table-detail-container">
    <el-page-header :content="'Transaction: ' + _item.amount" @back="goBack" />

    <el-descriptions border :column="2" :title="_item.customer.first_name + '  ' + _item.customer.last_name">
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.amount') }}</template>
        {{ _item.amount }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.created_at') }}</template>
        {{ formatDate_UTIL(_item.created_at * 1000) }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.updated_at') }}</template>
        {{ formatDate_UTIL(_item.updated_at * 1000) }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('customers.fields.passport_series') }}</template>
        {{ _item.customer.passport_series }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('customers.fields.passport_number') }}</template>
        {{ _item.customer.passport_number }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('customers.fields.birth_date') }}</template>
        {{ _item.customer.birth_date }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('customers.fields.first_name') }}</template>
        {{ _item.customer.first_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('customers.fields.last_name') }}</template>
        {{ _item.customer.last_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('customers.fields.middle_name') }}</template>
        {{ _item.customer.middle_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('customers.fields.pinfl') }}</template>
        {{ _item.customer.pinfl }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('customers.fields.tin') }}</template>
        {{ _item.customer.tin }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('customers.fields.dwelling_place') }}</template>
        {{ _item.customer.birth_place }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('customers.fields.passport_given_date') }}</template>
        {{ _item.customer.passport_given_date }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('customers.fields.passport_expiration_date') }}</template>
        {{ _item.customer.passport_expiration_date }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('customers.fields.citizenship') }}</template>
        {{ _item.customer.passport_citizenship }}
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions border :column="2" style="margin-top: 20px" title="installment">
      <el-descriptions-item>
        <template #label>{{ $t('customers.fields.installment.description') }}</template>
        {{ _item.installment.description }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('customers.fields.installment.period') }}</template>
        {{ _item.installment.period }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('customers.fields.installment.amount') }}</template>
        {{ _item.installment.amount }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('customers.fields.installment.initial_fee') }}</template>
        {{ _item.installment.initial_fee }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('customers.fields.installment.name_uz') }}</template>
        {{ _item.transaction_type.name_uz }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style lang="scss" scoped>
.default-table-detail-container {
  :deep() {
    .el-form--inline {
      .el-form-item {
        margin-right: 10px;
      }
    }
    .el-descriptions__label {
      min-width: 80px !important;
      text-align: right;
    }
  }
}
</style>
