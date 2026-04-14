<script lang="ts" setup>
import { useTabsStore } from '/@/store/modules/tabs.ts'
import { handleActivePath } from '/@/utils/routes'
import { BranchModel, getSingleBranch_API, getBranch_DEFAULT } from '/@/services/branch'
defineOptions({
  name: 'SingleBranches',
})

const route: any = useRoute()
const tabsStore = useTabsStore()
const { delVisitedRoute } = tabsStore
const _branch = ref<BranchModel>(getBranch_DEFAULT())

const goBack = async () => {
  await delVisitedRoute(handleActivePath(route, true))
  history.back()
}
async function loadItems() {
  const [error, response] = await getSingleBranch_API(route.query.id)

  if (error) return
  _branch.value = response.data
}
loadItems()
</script>

<template>
  <div class="default-table-detail-container">
    <el-page-header :content="'Branches: ' + _branch.name + ''" @back="goBack" />

    <el-descriptions border :column="2" :title="_branch.name as string">
      <el-descriptions-item>
        <template #label>{{ $t('management_branches.fields.name') }}</template>
        {{ _branch.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('management_branches.fields.address') }}</template>
        {{ _branch.address }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('management_branches.fields.inn') }}</template>
        {{ _branch.inn }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('management_branches.fields.created_at') }}</template>
        {{ _branch.created_at }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('management_branches.fields.updated_at') }}</template>
        {{ _branch.updated_at }}
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
