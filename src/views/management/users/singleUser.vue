<script lang="ts" setup>
import { useTabsStore } from '/@/store/modules/tabs.ts'
import { handleActivePath } from '/@/utils/routes'
import { getSingleUser_API, UsersResponseModel, userResponse_DEFAULT } from '/@/services/user'

defineOptions({
  name: 'SingleUsers',
})

const route: any = useRoute()
const tabsStore = useTabsStore()
const { delVisitedRoute } = tabsStore
const _user = ref<UsersResponseModel>(userResponse_DEFAULT())

const goBack = async () => {
  await delVisitedRoute(handleActivePath(route, true))
  history.back()
}

async function loadItems() {
  const [error, response] = await getSingleUser_API(route.query.id)

  if (error) return
  _user.value = response.data
}
loadItems()
</script>

<template>
  <div class="default-table-detail-container">
    <el-page-header :content="'Branches: ' + _user.username + ''" @back="goBack" />
    <el-descriptions border :column="2" :title="_user.username as string">
      <el-descriptions-item>
        <template #label>{{ $t('management_users.fields.username') }}</template>
        {{ _user.username }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('management_users.fields.first_name') }}</template>
        {{ _user.first_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('management_users.fields.last_name') }}</template>
        {{ _user.last_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('management_users.fields.status') }}</template>
        {{ _user.status }}
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
