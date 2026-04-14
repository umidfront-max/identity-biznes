<script lang="ts" setup>
import { singleInstallment_API, InstalmentModel, getInstallment_DEFAULT } from '/@/services/instalment'
import SingleLoading from '../../../../components/SingleLoading.vue'
defineOptions({
  name: 'SingleBranches',
})
import { useI18n } from 'vue-i18n'
import { formatDate_UTIL } from '/@/utils/dateFormat'

const { t } = useI18n()
const route: any = useRoute()
const _item = ref<InstalmentModel>(getInstallment_DEFAULT())
const _loading = ref(false)

async function loadItems() {
  _loading.value = true
  const [error, response] = await singleInstallment_API(route.query.id)
  _loading.value = false
  if (error) return
  _item.value = response.data
}
loadItems()
</script>

<template>
  <div>
    <single-loading v-if="_loading" />
    <div v-else class="default-table-detail-container">
      <el-descriptions border :column="2" style="margin: 20px 0">
        <el-descriptions-item>
          <template #label>{{ $t('installments.fields.branch') }}</template>
          {{ _item.branch.name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('installments.fields.tariff') }}</template>
          {{ _item.tariff.name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('installments.fields.amount') }}</template>
          {{ _item.amount }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('installments.fields.created_at') }}</template>
          {{ formatDate_UTIL(_item.created_at * 1000) }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('installments.fields.initial_fee') }}</template>
          {{ _item.initial_fee }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('installments.fields.next_pay_date') }}</template>
          {{ _item.next_pay_date }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions border :column="2" :title="t('installments.passport_info')">
        <el-descriptions-item>
          <template #label>{{ $t('installments.fields.passport_series') }}</template>
          {{ _item.customer.passport_series }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('installments.fields.passport_number') }}</template>
          {{ _item.customer.passport_number }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('installments.fields.birth_date') }}</template>
          {{ _item.customer.birth_date }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('installments.fields.first_name') }}</template>
          {{ _item.customer.first_name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('installments.fields.last_name') }}</template>
          {{ _item.customer.last_name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('installments.fields.middle_name') }}</template>
          {{ _item.customer.middle_name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('installments.fields.pinfl') }}</template>
          {{ _item.customer.pinfl }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('installments.fields.tin') }}</template>
          {{ _item.customer.tin }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('installments.fields.tin') }}</template>
          {{ _item.customer.tin }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('installments.fields.dwelling_place') }}</template>
          {{ _item.customer.birth_place }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('installments.fields.passport_given_date') }}</template>
          {{ _item.customer.passport_given_date }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('installments.fields.passport_expiration_date') }}</template>
          {{ _item.customer.passport_expiration_date }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('installments.fields.passport_citizenship') }}</template>
          {{ _item.customer.passport_citizenship }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<style lang="scss">
.default-table-detail-container {
  padding: 20px;
  background: white;
  border: 1px solid #e1dede;
  border-radius: 5px;
  .scoring {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    .progress {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
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
