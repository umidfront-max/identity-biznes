<script lang="ts" setup>
import { hasAccess } from '~/src/services/profile'
import UniversalTableNext from '/@/components/UniversalTableNext.vue'
import TableLoading from '/@/components/TableLoading.vue'
import InfoModal from '/@/views/scoring/katm-modal/index.vue'
import { PERMISSION_ENUM } from '/@/router/pemissionsEnum'
import { STATUS_ENUM } from '/@/services/mib'
import { QueryDataModel } from '/@/services/network'
import { OPEN_REMOVE_MODAL, type RemoveItemModel } from '/@/services/removeItem'
import {
  InpsHistoryRequestModel,
  InpsHistoryResponseModel,
  createInpsHistory_API,
  getInpsHistory_API,
} from '/@/services/scoring/inps-history'
import { useI18n } from 'vue-i18n'
import AddIcon from '/@/icon/action/AddIcon.vue'
import DeleteIcon from '/@/icon/action/DeleteIcon.vue'
import ViewIcon from '/@/icon/action/ViewIcon.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const $baseMessage = inject<any>('$baseMessage')
const queryData = ref<QueryDataModel>({
  page: Number(route.query?.currentPage) || 1,
  per_page: 10,
  search: (route.query?.search as string) || null,
  sort: (route.query?.sort as string) || null,
})
const _items = ref<InpsHistoryResponseModel[]>([])
const _totalItems = ref(0)
const tableColumns = [
  {
    label: t('scoring_inps.columns.status'),
    prop: 'status',
    sortable: true,
    checked: true,
    iconUsing: (row: InpsHistoryResponseModel) => {
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
    label: t('scoring_inps.columns.pinfl'),
    prop: 'pinfl',
    checked: true,
    displayUsing: (row: InpsHistoryResponseModel) => row.request.pinfl,
  },
  {
    label: t('scoring_inps.columns.passport_series'),
    prop: 'passport_series',
    checked: true,
    displayUsing: (row: InpsHistoryResponseModel) => row.request.passport_series,
  },
  {
    label: t('scoring_inps.columns.passport_number'),
    prop: 'passport_number',
    checked: true,
    displayUsing: (row: InpsHistoryResponseModel) => row.request.passport_number,
  },
  {
    label: t('scoring_inps.columns.passport_given_date'),
    prop: 'passport_given_date',
    checked: true,
    displayUsing: (row: InpsHistoryResponseModel) => row.request.passport_given_date,
  },
  {
    label: t('scoring_inps.columns.first_name'),
    prop: 'first_name',
    displayUsing: (row: InpsHistoryResponseModel) => row.request.first_name,
  },
  {
    label: t('scoring_inps.columns.last_name'),
    prop: 'last_name',
    displayUsing: (row: InpsHistoryResponseModel) => row.request.last_name,
  },
  {
    label: t('scoring_inps.columns.middle_name'),
    prop: 'middle_name',
    displayUsing: (row: InpsHistoryResponseModel) => row.request.middle_name,
  },
  {
    label: t('scoring_inps.columns.phone'),
    prop: 'phone',
    displayUsing: (row: InpsHistoryResponseModel) => row.request.phone,
  },
  {
    label: t('scoring_inps.columns.extra_phone'),
    prop: 'extra_phone',
    displayUsing: (row: InpsHistoryResponseModel) => row.request.extra_phone,
  },
  {
    label: t('scoring_inps.columns.birth_date'),
    prop: 'birth_date',
    displayUsing: (row: InpsHistoryResponseModel) => row.request.birth_date,
  },
  {
    label: t('scoring_inps.columns.region_id'),
    prop: 'region_id',
    sortable: true,
    displayUsing: (row: InpsHistoryResponseModel) => row.request.region_id,
  },
  {
    label: t('scoring_inps.columns.district_id'),
    prop: 'district_id',
    displayUsing: (row: InpsHistoryResponseModel) => row.request.district_id,
  },
]

const _modalRef = ref()
const _loading = ref(false)

async function loadItems(item: QueryDataModel) {
  _loading.value = true
  const [error, response] = await getInpsHistory_API(item)
  _loading.value = false

  if (error) return

  _items.value = response.data
  _totalItems.value = response.meta.total
}

function openPensionInfoModal(item?: InpsHistoryResponseModel) {
  _modalRef.value.open(item)
}

const navigateToSingleView = (item: InpsHistoryResponseModel) => {
  if (item.id)
    router.push({
      path: '/scoring/single-inps-history',
      query: {
        id: item.id,
      },
    })
}
const deleteBranchs = (items: InpsHistoryResponseModel | InpsHistoryResponseModel[]) => {
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

async function submit(data: InpsHistoryRequestModel) {
  const [error] = await createInpsHistory_API(data)
  if (error) return

  $baseMessage(t('scoring_inps.inps_successfully'), 'success', 'hey')
  loadItems(queryData.value)
}
loadItems(queryData.value)
</script>

<template>
  <div>
    <info-modal ref="_modalRef" @refresh-table="submit" />
    <table-loading v-if="_loading" />

    <universal-table-next
      v-else
      :items="_items"
      :loading="_loading"
      :table-columns="tableColumns"
      :total-items="_totalItems"
      @sort="loadItems"
    >
      <template #table-standalone-actions="{}">
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.scoring_inps_history_create)"
          :icon="AddIcon"
          size="large"
          type="primary"
          @click="openPensionInfoModal(undefined)"
        >
          {{ $t('buttons.add') }}
        </el-button>
      </template>
      <template #table-inline-actions="{ row }">
        <el-button :icon="DeleteIcon" type="danger" @click="() => deleteBranchs(row)" />
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.scoring_inps_history_view)"
          :disabled="row.status !== STATUS_ENUM.SUCCESS"
          :icon="ViewIcon"
          type="info"
          @click="() => navigateToSingleView(row)"
        />
      </template>
    </universal-table-next>
  </div>
</template>
