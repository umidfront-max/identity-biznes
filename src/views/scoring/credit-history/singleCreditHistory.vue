<script lang="ts" setup>
import { useTabsStore } from '/@/store/modules/tabs.ts'
import { handleActivePath } from '/@/utils/routes'
import { CreditHistoryResponseModel, singleCreditHistory_API, getCreditHistoryResponse_DEFAULT } from '/@/services/scoring/credit-history'
import SingleLoading from '../../../components/SingleLoading.vue'
defineOptions({
  name: 'SingleBranches',
})

const route: any = useRoute()
const tabsStore = useTabsStore()
const { delVisitedRoute } = tabsStore
const _item = ref<CreditHistoryResponseModel>(getCreditHistoryResponse_DEFAULT())
const _loading = ref(false)
const goBack = async () => {
  await delVisitedRoute(handleActivePath(route, true))
  history.back()
}
async function loadItems() {
  _loading.value = true
  const [error, response] = await singleCreditHistory_API(route.query.id)
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
      <el-page-header :content="'Credit history: ' + _item.request.first_name + ''" @back="goBack" />

      <el-descriptions border :column="2" :title="_item.request.first_name">
        <el-descriptions-item>
          <template #label>{{ $t('scoring_credit.fields.status') }}</template>
          {{ _item.status }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('scoring_credit.fields.birth_date') }}</template>
          {{ _item.request.birth_date }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('scoring_credit.fields.fio') }}</template>
          {{ `${_item.request.first_name}  ${_item.request.last_name}  ${_item.request.middle_name}` }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('scoring_credit.fields.phone') }}</template>
          {{ _item.request.phone }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('scoring_credit.fields.extra_phone') }}</template>
          {{ _item.request.extra_phone }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('scoring_credit.fields.birth_date') }}</template>
          {{ _item.request.birth_date }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('scoring_credit.fields.created_at') }}</template>
          {{ _item.created_at }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('scoring_credit.fields.updated_at') }}</template>
          {{ _item.updated_at }}
        </el-descriptions-item>
      </el-descriptions>
      <div v-if="_item.response">
        <div>
          <h2>{{ $t('scoring_credit.response.title') }}</h2>
          <el-descriptions border :column="2">
            <el-descriptions-item>
              <template #label>{{ $t('scoring_credit.response.fio') }}</template>
              {{ _item.response.client.name }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>{{ $t('scoring_credit.response.birth_date') }}</template>
              {{ _item.response.client.birth_date }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>{{ $t('scoring_credit.response.score_level') }}</template>
              {{ _item.response.client.score_level }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>{{ $t('scoring_credit.response.score_date') }}</template>
              {{ _item.response.client.score_date }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>{{ $t('scoring_credit.response.document_type') }}</template>
              {{ _item.response.client.document_type }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>{{ $t('scoring_credit.response.document_serial') }}</template>
              {{ _item.response.client.document_serial }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>{{ $t('scoring_credit.response.document_number') }}</template>
              {{ _item.response.client.document_number }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>{{ $t('scoring_credit.response.address') }}</template>
              {{ _item.response.client.address }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>{{ $t('scoring_credit.response.pinfl') }}</template>
              {{ _item.response.client.pinfl }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>{{ $t('scoring_credit.response.inn') }}</template>
              {{ _item.response.client.inn }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>{{ $t('scoring_credit.response.phone') }}</template>
              {{ _item.response.client.phone_number }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>{{ $t('scoring_credit.response.resident') }}</template>
              {{ _item.response.client.resident }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div>
          <h2>{{ $t('scoring_credit.score.title') }}</h2>
          <div class="scoring">
            <el-descriptions border :column="1">
              <el-descriptions-item>
                <template #label>{{ $t('scoring_credit.score.score_point') }}</template>
                {{ _item.response.score.score_point }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>{{ $t('scoring_credit.score.score_class') }}</template>
                {{ _item.response.score.score_class }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>{{ $t('scoring_credit.score.score_date') }}</template>
                {{ _item.response.score.score_date }}
              </el-descriptions-item>
            </el-descriptions>
            <div class="progress">
              <el-progress :percentage="_item.response.score.score_point / 5" type="circle" />
            </div>
          </div>
        </div>
        <div>
          <h2>{{ $t('scoring_credit.extra_info.title') }}</h2>
          <div>
            <table border>
              <thead>
                <tr>
                  <th rowspan="2">№</th>
                  <th rowspan="2">{{ $t('scoring_credit.extra_info.columns.name') }}</th>
                  <th colspan="2">{{ $t('scoring_credit.extra_info.columns.opened') }}</th>
                  <th colspan="2">{{ $t('scoring_credit.extra_info.columns.closed') }}</th>
                </tr>
                <tr>
                  <th>{{ $t('scoring_credit.extra_info.columns.count') }}</th>
                  <th>{{ $t('scoring_credit.extra_info.columns.sum') }}</th>
                  <th>{{ $t('scoring_credit.extra_info.columns.count') }}</th>
                  <th>{{ $t('scoring_credit.extra_info.columns.sum') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>{{ $t('scoring_credit.columns.types_responsibility') }}</td>
                  <td>{{ _item.response.additional_info.current_debt.all_delays_qty }}</td>
                  <td>{{ _item.response.additional_info.current_debt.all_delays_sum }}</td>
                  <td>{{ _item.response.additional_info.closed_debt.all_delays_qty }}</td>
                  <td>{{ _item.response.additional_info.closed_debt.all_delays_sum }}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>{{ $t('scoring_credit.columns.contracts_without_delay') }}</td>
                  <td>{{ _item.response.additional_info.current_debt.contracts_wo_delays_qty }}</td>
                  <td>{{ _item.response.additional_info.current_debt.contracts_wo_delays_sum }}</td>
                  <td>{{ _item.response.additional_info.closed_debt.contracts_wo_delays_qty }}</td>
                  <td>{{ _item.response.additional_info.closed_debt.contracts_wo_delays_sum }}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>{{ $t('scoring_credit.columns.overdue_interest') }}</td>
                  <td>{{ _item.response.additional_info.current_debt.expired_percent_qty }}</td>
                  <td>{{ _item.response.additional_info.current_debt.expired_percent_sum }}</td>
                  <td>{{ _item.response.additional_info.closed_debt.expired_percent_qty }}</td>
                  <td>{{ _item.response.additional_info.closed_debt.expired_percent_sum }}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>{{ $t('scoring_credit.columns.revised') }}</td>
                  <td>{{ _item.response.additional_info.current_debt.revised_contracts_qty }}</td>
                  <td>{{ _item.response.additional_info.current_debt.revised_contracts_sum }}</td>
                  <td>{{ _item.response.additional_info.closed_debt.revised_contracts_qty }}</td>
                  <td>{{ _item.response.additional_info.closed_debt.revised_contracts_sum }}</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>{{ $t('scoring_credit.columns.overdue_up_to_30_days') }}</td>
                  <td>{{ _item.response.additional_info.current_debt.delays_less_30_qty }}</td>
                  <td>{{ _item.response.additional_info.current_debt.delays_less_30_sum }}</td>
                  <td>{{ _item.response.additional_info.closed_debt.delays_less_30_qty }}</td>
                  <td>{{ _item.response.additional_info.closed_debt.delays_less_30_sum }}</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>{{ $t('scoring_credit.columns.overdue_over_next_month') }}</td>
                  <td>{{ _item.response.additional_info.current_debt.switched_month_qty }}</td>
                  <td>{{ _item.response.additional_info.current_debt.switched_month_sum }}</td>
                  <td>{{ _item.response.additional_info.closed_debt.switched_month_qty }}</td>
                  <td>{{ _item.response.additional_info.closed_debt.switched_month_sum }}</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>{{ $t('scoring_credit.columns.overdue_from_30_to_60_days') }}</td>
                  <td>{{ _item.response.additional_info.current_debt.delays_less_60_qty }}</td>
                  <td>{{ _item.response.additional_info.current_debt.delays_less_60_sum }}</td>
                  <td>{{ _item.response.additional_info.closed_debt.delays_less_60_qty }}</td>
                  <td>{{ _item.response.additional_info.closed_debt.delays_less_60_sum }}</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>{{ $t('scoring_credit.columns.overdue_from_60_to_90_days') }}</td>
                  <td>{{ _item.response.additional_info.current_debt.delays_less_90_qty }}</td>
                  <td>{{ _item.response.additional_info.current_debt.delays_less_90_sum }}</td>
                  <td>{{ _item.response.additional_info.closed_debt.delays_less_90_qty }}</td>
                  <td>{{ _item.response.additional_info.closed_debt.delays_less_90_sum }}</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>{{ $t('scoring_credit.columns.overdue_from_90_or_more') }}</td>
                  <td>{{ _item.response.additional_info.current_debt.delays_more_90_qty }}</td>
                  <td>{{ _item.response.additional_info.current_debt.delays_more_90_sum }}</td>
                  <td>{{ _item.response.additional_info.closed_debt.delays_more_90_qty }}</td>
                  <td>{{ _item.response.additional_info.closed_debt.delays_more_90_sum }}</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>{{ $t('scoring_credit.columns.judicial') }}</td>
                  <td>{{ _item.response.additional_info.current_debt.delays_in_court_qty }}</td>
                  <td>{{ _item.response.additional_info.current_debt.delays_in_court_sum }}</td>
                  <td>{{ _item.response.additional_info.closed_debt.delays_in_court_qty }}</td>
                  <td>{{ _item.response.additional_info.closed_debt.delays_in_court_sum }}</td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>{{ $t('scoring_credit.columns.written_on_principal_debts') }}</td>
                  <td>{{ _item.response.additional_info.current_debt.delays_decommissioned_qty }}</td>
                  <td>{{ _item.response.additional_info.current_debt.delays_decommissioned_sum }}</td>
                  <td>{{ _item.response.additional_info.closed_debt.delays_decommissioned_qty }}</td>
                  <td>{{ _item.response.additional_info.closed_debt.delays_decommissioned_sum }}</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>{{ $t('scoring_credit.columns.off_balance_sheet_interest_debts') }}</td>
                  <td>{{ _item.response.additional_info.current_debt.delays_decommissioned_pcnt_qty }}</td>
                  <td>{{ _item.response.additional_info.current_debt.delays_decommissioned_pcnt_sum }}</td>
                  <td>{{ _item.response.additional_info.closed_debt.delays_decommissioned_pcnt_qty }}</td>
                  <td>{{ _item.response.additional_info.closed_debt.delays_decommissioned_pcnt_sum }}</td>
                </tr>
                <tr>
                  <td>13</td>
                  <td>{{ $t('scoring_credit.columns.alert') }}</td>
                  <td colspan="4">{{ _item.response.additional_info.notifications[0] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <p v-else style="text-align: center">❌</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
table {
  width: 100%;
  td {
    text-align: center;
  }
  td:nth-of-type(2) {
    text-align: left;
  }
}
.default-table-detail-container {
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
