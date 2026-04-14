<script lang="ts" setup>
import { useTabsStore } from '/@/store/modules/tabs.ts'
import { handleActivePath } from '/@/utils/routes'
import { TransactionTypeModel, getSingleTransactionType_API, getTransactionType_DEFAULT } from '/@/services/transactionType'
defineOptions({
  name: 'SingleBranches',
})

const route: any = useRoute()
const tabsStore = useTabsStore()
const { delVisitedRoute } = tabsStore
const _item = ref<TransactionTypeModel>(getTransactionType_DEFAULT())

const goBack = async () => {
  await delVisitedRoute(handleActivePath(route, true))
  history.back()
}
async function loadItems() {
  const [error, response] = await getSingleTransactionType_API(route.query.id)

  if (error) return
  _item.value = response.data
}
loadItems()
</script>

<template>
  <div class="default-table-detail-container">
    <el-page-header :content="_item.name" @back="goBack" />

    <el-descriptions border :column="2" :title="_item.name as string">
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.name') }}</template>
        {{ _item.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.is_system') }}</template>
        {{ _item.is_system }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.created_at') }}</template>
        {{ _item.created_at }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.updated_at') }}</template>
        {{ _item.updated_at }}
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
