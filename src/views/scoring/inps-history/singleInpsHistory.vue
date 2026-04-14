<script lang="ts" setup>
import { useTabsStore } from '/@/store/modules/tabs.ts'
import { handleActivePath } from '/@/utils/routes'
import { InpsHistoryResponseModel, singleInpsHistory_API, getInpsHistoryResponse_DEFAULT } from '/@/services/scoring/inps-history'
import SingleLoading from '../../../components/SingleLoading.vue'
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'SingleInpsHistory',
})

const { t } = useI18n()
const route: any = useRoute()
const tabsStore = useTabsStore()
const { delVisitedRoute } = tabsStore
const _item = ref<InpsHistoryResponseModel>(getInpsHistoryResponse_DEFAULT())
const _loading = ref(false)

const goBack = async () => {
  await delVisitedRoute(handleActivePath(route, true))
  history.back()
}
async function loadItems() {
  _loading.value = true
  const [error, response] = await singleInpsHistory_API(route.query.id)
  _loading.value = false

  if (error) return
  _item.value = response.data
}
loadItems()
</script>

<template>
  <div>
    <single-loading v-if="_loading" />
    <div v-else>
      <div class="default-table-detail-container">
        <el-page-header :content="'INPS history: ' + _item.request.first_name + ''" @back="goBack" />

        <el-descriptions border :column="2" :title="_item.request.first_name">
          <el-descriptions-item>
            <template #label>{{ $t('scoring_inps_single.columns.status') }}</template>
            {{ _item.status }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>{{ $t('scoring_inps_single.columns.birth_date') }}</template>
            {{ _item.request.birth_date }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>{{ $t('scoring_inps_single.columns.fio') }}</template>
            {{ `${_item.request.first_name}  ${_item.request.last_name}  ${_item.request.middle_name}` }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>{{ $t('scoring_inps_single.columns.phone') }}</template>
            {{ _item.request.phone }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>{{ $t('scoring_inps_single.columns.extra_phone') }}</template>
            {{ _item.request.extra_phone }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>{{ $t('scoring_inps_single.columns.created_at') }}</template>
            {{ _item.created_at }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>{{ $t('scoring_inps_single.columns.updated_at') }}</template>
            {{ _item.updated_at }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div>
        <h2>{{ $t('scoring_inps_single.presence_report.title') }}</h2>
        <el-table :data="_item.response.presence_reports.presence_report" style="width: 100%">
          <el-table-column label="№" prop="num" width="100" />
          <el-table-column :label="t('scoring_inps.presence_report.presence')" prop="presence" />
          <el-table-column :label="t('scoring_inps.presence_report.report_name')" prop="report_name" />
        </el-table>
      </div>
      <div>
        <h2>{{ $t('scoring_inps_single.incomes.title') }}</h2>
        <el-table :data="_item.response.incomes.income" style="width: 100%">
          <el-table-column label="№" prop="num" width="100" />
          <el-table-column :label="t('scoring_inps.incomes.period')" prop="period" width="130" />
          <el-table-column :label="t('scoring_inps.incomes.orgname')" prop="orgname" />
          <el-table-column :label="t('scoring_inps.incomes.org_inn')" prop="org_inn" />
          <el-table-column :label="t('scoring_inps.incomes.income_summa')" prop="income_summa" />
          <el-table-column :label="t('scoring_inps.incomes.inps_summa')" prop="inps_summa" />
          <el-table-column :label="t('scoring_inps.incomes.send_date')" prop="send_date" />
        </el-table>
      </div>
      <div>
        <h2>{{ $t('scoring_inps.incomes_period.title') }}</h2>
        <el-table :data="[_item.response.incomes_period]" style="width: 100%">
          <el-table-column :label="t('scoring_inps.incomes_period.incomes_all_summa')" prop="incomes_all_summa" />
          <el-table-column :label="t('scoring_inps.incomes_period.incomes_period_begin')" prop="incomes_period_begin" />
          <el-table-column :label="t('scoring_inps.incomes_period.incomes_period_end')" prop="incomes_period_end" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.default-table-detail-container {
  min-height: auto !important;
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
