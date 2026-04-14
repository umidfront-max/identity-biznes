<script lang="ts" setup>
import { useTabsStore } from '/@/store/modules/tabs.ts'
import { handleActivePath } from '/@/utils/routes'
import { PensionInfoResponseModel, singlePensionsInfo_API, getPensionInfoResponse_DEFAULT } from '/@/services/scoring/pension-info'
import SingleLoading from '../../../components/SingleLoading.vue'
import { formatDate_UTIL } from '/@/utils/dateFormat'
import { phone_UTIL } from '/@/utils/phone'
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'SingleBranches',
})

const { t } = useI18n()
const route: any = useRoute()
const tabsStore = useTabsStore()
const { delVisitedRoute } = tabsStore
const _item = ref<PensionInfoResponseModel>(getPensionInfoResponse_DEFAULT())
const _loading = ref(false)

const goBack = async () => {
  await delVisitedRoute(handleActivePath(route, true))
  history.back()
}
async function loadItems() {
  _loading.value = true
  const [error, response] = await singlePensionsInfo_API(route.query.id)
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
      <el-page-header :content="'Pension Info: ' + _item.request.first_name + ''" @back="goBack" />

      <el-descriptions border :column="2" :title="_item.request.first_name">
        <el-descriptions-item>
          <template #label>{{ $t('scoring_pension.fields.status') }}</template>
          {{ _item.status }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('scoring_pension.fields.birth_date') }}</template>
          {{ _item.request.birth_date }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('scoring_pension.fields.fio') }}</template>
          {{ `${_item.request.first_name}  ${_item.request.last_name}  ${_item.request.middle_name}` }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('scoring_pension.fields.phone') }}</template>
          {{ phone_UTIL(_item.request.phone as number) }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('scoring_pension.fields.extra_phone') }}</template>
          {{ phone_UTIL(_item.request.extra_phone as number) }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('scoring_pension.fields.birth_date') }}</template>
          {{ _item.request.birth_date }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('scoring_pension.fields.created_at') }}</template>
          {{ formatDate_UTIL(_item.created_at * 1000) }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('scoring_pension.fields.updated_at') }}</template>
          {{ formatDate_UTIL(_item.updated_at * 1000) }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('scoring_pension.fields.region_id') }}</template>
          {{ _item.request.region.name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>{{ $t('scoring_pension.fields.district_id') }}</template>
          {{ _item.request.district.name }}
        </el-descriptions-item>
      </el-descriptions>
      <div>
        <h2>{{ $t('scoring_pension.response.title') }}</h2>

        <el-descriptions border :column="2" :title="_item.request.first_name">
          <el-descriptions-item>
            <template #label>{{ $t('scoring_pension.response.') }}</template>
            {{ _item.response.sizePension.data.address }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>{{ $t('scoring_pension.response.apptype') }}</template>
            {{ _item.response.sizePension.data.apptype }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>{{ $t('scoring_pension.response.datepay') }}</template>
            {{ `${_item.response.sizePension.data.datepay}` }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template #label>{{ $t('scoring_pension.response.datepens') }}</template>
            {{ _item.response.sizePension.data.datepens }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>{{ $t('scoring_pension.response.document') }}</template>
            {{ _item.response.sizePension.data.document }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>{{ $t('scoring_pension.response.experience') }}</template>
            {{ _item.response.sizePension.data.experience }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>{{ $t('scoring_pension.response.patronymlatin') }}</template>
            {{ _item.response.sizePension.data.patronymlatin }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>{{ $t('scoring_pension.response.pinpp') }}</template>
            {{ _item.response.sizePension.data.pinpp }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>{{ $t('scoring_pension.response.patronymlatin') }}</template>
            {{ Number(_item.response.sizePension.data.summa).toLocaleString() }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template #label>{{ $t('scoring_pension.response.type') }}</template>
            {{ _item.response.sizePension.data.type }}
          </el-descriptions-item>
        </el-descriptions>
        <h2>{{ $t('scoring_pension.sum') }}</h2>
        <el-table :data="_item.response.sizePension.row" highlight-current-row style="width: 100%">
          <el-table-column type="index" width="100" />
          <el-table-column :label="t('scoring_pension.sum.period')" prop="period" />
          <el-table-column :label="t('scoring_pension.sum.month')" prop="month" />
          <el-table-column :label="t('scoring_pension.sum.sum')" prop="summa">
            <template #default="{ row }">
              <p>{{ Number(row.summa).toLocaleString() }}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
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
