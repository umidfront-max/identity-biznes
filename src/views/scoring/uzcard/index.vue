<script setup lang="ts">
import { hasAccess } from '~/src/services/profile'
import UniversalTableNext from '/@/components/UniversalTableNext.vue'
import TableLoading from '/@/components/TableLoading.vue'
import { PERMISSION_ENUM } from '/@/router/pemissionsEnum'
import { STATUS_ENUM } from '/@/services/mib'
import { OPEN_REMOVE_MODAL, type RemoveItemModel } from '/@/services/removeItem'
import { UzcardResponseModel, getUzcard_API } from '/@/services/scoring/uzcard'
import { card_UTIL } from '/@/utils/card.ts'
import { formatDate_UTIL } from '/@/utils/dateFormat'
import { QueryDataModel } from '/@/services/network'
import { useI18n } from 'vue-i18n'
import AddIcon from '/@/icon/action/AddIcon.vue'
import DeleteIcon from '/@/icon/action/DeleteIcon.vue'
import ViewIcon from '/@/icon/action/ViewIcon.vue'

const { t } = useI18n()
const _items = ref<UzcardResponseModel[]>([])
const _totalItems = ref(0)
const route = useRoute()

const queryData = ref<QueryDataModel>({
  page: Number(route.query?.currentPage) || 1,
  per_page: 10,
  search: (route.query?.search as string) || null,
  sort: (route.query?.sort as string) || null,
})
const tableColumns = [
  {
    label: t('scoring_uzcard.fields.status'),
    prop: 'status',
    sortable: true,
    checked: true,
    iconUsing: (row: UzcardResponseModel) => {
      if (row.status == STATUS_ENUM.FAILED || row.status == STATUS_ENUM.WAITING) {
        return 'close-line'
      }
      if (row.status == STATUS_ENUM.SUCCESS) {
        return 'check-line'
      } else {
        return 'refresh-line'
      }
    },
  },
  {
    label: t('scoring_uzcard.fields.card_number'),
    prop: 'number',
    checked: true,
    displayUsing: (row: UzcardResponseModel) => card_UTIL(row.request.number as number),
  },
  {
    label: t('scoring_uzcard.fields.card_expiry_date'),
    prop: 'passport_series',
    checked: true,
    displayUsing: (row: UzcardResponseModel) =>
      `${row.request.expiry?.toString().substring(2, 4)}/${row.request.expiry?.toString().substring(2, 0)}`,
  },
  {
    label: t('scoring_uzcard.fields.created_at'),
    prop: 'created_at',
    sortable: true,
    displayUsing: (row: UzcardResponseModel) => formatDate_UTIL(new Date(row.created_at * 1000), false),
  },
  {
    label: t('scoring_uzcard.fields.updated_at'),
    prop: 'updated_at',
    displayUsing: (row: UzcardResponseModel) => formatDate_UTIL(new Date(row.created_at * 1000), false),
  },
]

const router = useRouter()
const _loading = ref(false)

async function loadItems(item: QueryDataModel) {
  _loading.value = true
  const [error, response] = await getUzcard_API(item)
  _loading.value = false

  if (error) return

  _items.value = response.data
  _totalItems.value = response.meta.total
}

const navigateToSingleView = (item: UzcardResponseModel) => {
  if (item.id)
    router.push({
      path: '/scoring/single-uzcard',
      query: {
        id: item.id,
      },
    })
}
const deleteBranchs = (items: UzcardResponseModel | UzcardResponseModel[]) => {
  const payload: RemoveItemModel = {
    id: [],
    url: '/scoring/pension-info',
    callback: loadItems,
  }
  if (Array.isArray(items)) {
    for (const iterator of items) {
      payload.id.push(iterator.id)
    }
  } else {
    payload.id.push(items.id)
  }

  OPEN_REMOVE_MODAL(payload)
}

loadItems(queryData.value)
</script>

<template>
  <div>
    <table-loading v-if="_loading" />
    <universal-table-next
      v-else
      :items="_items"
      :loading="_loading"
      :table-columns="tableColumns"
      :total-items="_totalItems"
      @sort="loadItems"
    >
      <template #table-standalone-actions="{ selectedRows }">
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.scoring_uzcard_create)"
          :icon="AddIcon"
          size="large"
          type="primary"
          @click="$router.push('/scoring/create-uzcard')"
        >
          {{ $t('buttons.add') }}
        </el-button>
        <el-button
          v-if="selectedRows.length > 0 && hasAccess(PERMISSION_ENUM.scoring_uzcard_delete)"
          :icon="DeleteIcon"
          size="large"
          type="danger"
          @click="() => deleteBranchs(selectedRows)"
        >
          {{ $t('buttons.delete') }}
        </el-button>
      </template>
      <template #table-inline-actions="{ row }">
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.scoring_uzcard_delete)"
          :icon="DeleteIcon"
          type="danger"
          @click="() => deleteBranchs(row)"
        />
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.scoring_uzcard_view_all)"
          :disabled="row.status !== STATUS_ENUM.SUCCESS"
          :icon="ViewIcon"
          type="info"
          @click="() => navigateToSingleView(row)"
        />
      </template>
    </universal-table-next>
  </div>
</template>
