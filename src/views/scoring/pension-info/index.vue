<script setup lang="ts">
import { hasAccess } from '~/src/services/profile'
import UniversalTableNext from '/@/components/UniversalTableNext.vue'
import TableLoading from '/@/components/TableLoading.vue'
import InfoModal from '/@/views/scoring/katm-modal/index.vue'
import { PERMISSION_ENUM } from '/@/router/pemissionsEnum'
import {
  PensionInfoRequestModel,
  PensionInfoResponseModel,
  createPensionInfo_API,
  getPensionsInfo_API,
} from '/@/services/scoring/pension-info'

import { STATUS_ENUM } from '/@/services/mib'
import { QueryDataModel } from '/@/services/network'
import { OPEN_REMOVE_MODAL, type RemoveItemModel } from '/@/services/removeItem'
import { phone_UTIL } from '/@/utils/phone'
import { useI18n } from 'vue-i18n'
import AddIcon from '/@/icon/action/AddIcon.vue'
import DeleteIcon from '/@/icon/action/DeleteIcon.vue'
import ViewIcon from '/@/icon/action/ViewIcon.vue'

const $baseMessage = inject<any>('$baseMessage')

const { t } = useI18n()
const _items = ref<PensionInfoResponseModel[]>([])
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
    label: t('scoring_pension.fields.status'),
    prop: 'status',
    sortable: true,
    checked: true,
    iconUsing: (row: PensionInfoResponseModel) => {
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
    label: t('scoring_pension.fields.pinfl'),
    prop: 'pinfl',
    checked: true,
    displayUsing: (row: PensionInfoResponseModel) => row.request.pinfl,
  },
  {
    label: t('scoring_pension.fields.passport_series'),
    prop: 'passport_series',
    checked: true,
    displayUsing: (row: PensionInfoResponseModel) => row.request.passport_series,
  },
  {
    label: t('scoring_pension.fields.passport_number'),
    prop: 'passport_number',
    checked: true,
    displayUsing: (row: PensionInfoResponseModel) => row.request.passport_number,
  },
  {
    label: t('scoring_pension.fields.passport_given_date'),
    prop: 'passport_given_date',
    checked: true,
    displayUsing: (row: PensionInfoResponseModel) => row.request.passport_given_date,
  },
  {
    label: t('scoring_pension.fields.first_name'),
    prop: 'first_name',
    displayUsing: (row: PensionInfoResponseModel) => row.request.first_name,
  },
  {
    label: t('scoring_pension.fields.last_name'),
    prop: 'last_name',
    displayUsing: (row: PensionInfoResponseModel) => row.request.last_name,
  },
  {
    label: t('scoring_pension.fields.middle_name'),
    prop: 'middle_name',
    displayUsing: (row: PensionInfoResponseModel) => row.request.middle_name,
  },
  {
    label: t('scoring_pension.fields.phone'),
    prop: 'phone',
    displayUsing: (row: PensionInfoResponseModel) => phone_UTIL(row.request.phone as number),
  },
  {
    label: t('scoring_pension.fields.extra_phone'),
    prop: 'extra_phone',
    displayUsing: (row: PensionInfoResponseModel) => phone_UTIL(row.request.extra_phone as number),
  },
  {
    label: t('scoring_pension.fields.birth_date'),
    prop: 'birth_date',
    displayUsing: (row: PensionInfoResponseModel) => row.request.birth_date,
  },
  {
    label: t('scoring_pension.fields.region_id'),
    prop: 'region_id',
    displayUsing: (row: PensionInfoResponseModel) => row.request.region_id,
  },
  {
    label: t('scoring_pension.fields.district_id'),
    prop: 'district_id',
    displayUsing: (row: PensionInfoResponseModel) => row.request.district_id,
  },
]

const router = useRouter()
const _modalRef = ref()
const _loading = ref(false)

async function loadItems(item: QueryDataModel) {
  _loading.value = true
  const [error, response] = await getPensionsInfo_API(item)
  _loading.value = false

  if (error) return

  _items.value = response.data
  _totalItems.value = response.meta.total
}

function openPensionInfoModal(item?: PensionInfoResponseModel) {
  _modalRef.value.open(item)
}

const navigateToSingleView = (item: PensionInfoResponseModel) => {
  if (item.id)
    router.push({
      path: '/scoring/single-pension-info',
      query: {
        id: item.id,
      },
    })
}
const deleteBranchs = (items: PensionInfoResponseModel | PensionInfoResponseModel[]) => {
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
async function submit(data: PensionInfoRequestModel) {
  console.log('data', data)
  const [error] = await createPensionInfo_API(data)

  if (error) return

  $baseMessage(t('scoring_pension.created_successfully'), 'success', 'hey')
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
      <template #table-standalone-actions="{ selectedRows }">
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.scoring_pension_info_create)"
          :icon="AddIcon"
          size="large"
          type="primary"
          @click="openPensionInfoModal(undefined)"
        >
          {{ $t('buttons.add') }}
        </el-button>
        <el-button
          v-if="selectedRows.length > 0 && hasAccess(PERMISSION_ENUM.scoring_pension_info_delete)"
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
          v-if="hasAccess(PERMISSION_ENUM.scoring_pension_info_delete)"
          :icon="DeleteIcon"
          type="danger"
          @click="() => deleteBranchs(row)"
        />
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.scoring_pension_info_view)"
          :disabled="row.status !== STATUS_ENUM.SUCCESS"
          :icon="ViewIcon"
          type="info"
          @click="() => navigateToSingleView(row)"
        />
      </template>
    </universal-table-next>
  </div>
</template>
