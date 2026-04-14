<script setup lang="ts">
import TheModal from './Modal.vue'
import UniversalTableNext from '/@/components/UniversalTableNext.vue'

import { hasAccess } from '~/src/utils/permission'
import { PERMISSION_ENUM } from '/@/router/pemissionsEnum'
import { LogsModel } from '/@/services/activeLogs'
import { getOwnLogs_API } from '/@/services/profile'
import { QueryDataModel } from '/@/services/network'
import { useI18n } from 'vue-i18n'
import { formatDate_UTIL } from '~/src/utils/dateFormat'
import ViewIcon from '/@/icon/action/ViewIcon.vue'
const { t } = useI18n()
const route = useRoute()

const queryData = ref<QueryDataModel>({
  page: Number(route.query?.currentPage) || 1,
  per_page: 10,
  search: (route.query?.search as string) || null,
  sort: (route.query?.sort as string) || null,
})
const _items = ref<LogsModel[]>([])
const _totalItems = ref(0)
const tableColumns = [
  {
    label: t('profile.columns.description'),
    prop: 'description',
    checked: true,
  },
  {
    label: t('profile.columns.created_at'),
    prop: 'created_at',
    checked: true,
    displayUsing: (row: LogsModel) => `${formatDate_UTIL(row.created_at, false)}`,
  },
]
const _modalRef = ref()
const _loading = ref(false)

async function loadItems(item: QueryDataModel) {
  _loading.value = true
  const [error, response] = await getOwnLogs_API(item)
  _loading.value = false

  if (error) return

  _items.value = response.data
  _totalItems.value = response.meta.total
}

function openBranchModal(item?: LogsModel) {
  _modalRef.value.open(item)
}

const navigateToSingleView = (item: LogsModel) => {
  openBranchModal(item)
}

loadItems(queryData.value)
</script>

<template>
  <div>
    <the-modal ref="_modalRef" @refresh-table="loadItems" />

    <universal-table-next :items="_items" :loading="_loading" :table-columns="tableColumns" :total-items="_totalItems" @sort="loadItems">
      <template #table-inline-actions="{ row }">
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.activity_log_view_all)"
          :icon="ViewIcon"
          type="info"
          @click="() => navigateToSingleView(row)"
        />
      </template>
    </universal-table-next>
  </div>
</template>
