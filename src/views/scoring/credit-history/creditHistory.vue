<script setup lang="ts">
import { hasAccess } from '~/src/services/profile'
import InfoModal from '/@/views/scoring/katm-modal/index.vue'
import { PERMISSION_ENUM } from '/@/router/pemissionsEnum'

import UniversalTableNext from '/@/components/UniversalTableNext.vue'
import TableLoading from '/@/components/TableLoading.vue'
import { STATUS_ENUM } from '/@/services/mib'
import { OPEN_REMOVE_MODAL, type RemoveItemModel } from '/@/services/removeItem'
import {
  CreditHistoryRequestModel,
  CreditHistoryResponseModel,
  createCreditHistory_API,
  getCreditHistory_API,
} from '/@/services/scoring/credit-history'
import { useI18n } from 'vue-i18n'
import AddIcon from '/@/icon/action/AddIcon.vue'
import DeleteIcon from '/@/icon/action/DeleteIcon.vue'
import ViewIcon from '/@/icon/action/ViewIcon.vue'

const $baseMessage = inject<any>('$baseMessage')
const { t } = useI18n()
const _items = ref<CreditHistoryResponseModel[]>([])
const _totalItems = ref(0)
const route = useRoute()

const queryData = ref({
  page: Number(route.query?.currentPage) || 1,
  per_page: 10,
  search: null,
  sort: (route.query?.sort as string) || null,
})
const tableColumns = [
  {
    label: t('scoring_credit.fields.status'),
    prop: 'status',
    sortable: true,
    checked: true,
    iconUsing: (row: CreditHistoryResponseModel) => {
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
    label: t('scoring_credit.fields.pinfl'),
    prop: 'pinfl',
    checked: true,
    displayUsing: (row: CreditHistoryResponseModel) => row.request.pinfl,
  },
  {
    label: t('scoring_credit.fields.passport_series'),
    prop: 'passport_series',
    checked: true,
    displayUsing: (row: CreditHistoryResponseModel) => row.request.passport_series,
  },
  {
    label: t('scoring_credit.fields.passport_number'),
    prop: 'passport_number',
    checked: true,
    displayUsing: (row: CreditHistoryResponseModel) => row.request.passport_number,
  },
  {
    label: t('scoring_credit.fields.passport_given_date'),
    prop: 'passport_given_date',
    checked: true,
    displayUsing: (row: CreditHistoryResponseModel) => row.request.passport_given_date,
  },
  {
    label: t('scoring_credit.fields.first_name'),
    prop: 'first_name',
    displayUsing: (row: CreditHistoryResponseModel) => row.request.first_name,
  },
  {
    label: t('scoring_credit.fields.last_name'),
    prop: 'last_name',
    displayUsing: (row: CreditHistoryResponseModel) => row.request.last_name,
  },
  {
    label: t('scoring_credit.fields.middle_name'),
    prop: 'middle_name',
    displayUsing: (row: CreditHistoryResponseModel) => row.request.middle_name,
  },
  {
    label: t('scoring_credit.fields.phone'),
    prop: 'phone',
    displayUsing: (row: CreditHistoryResponseModel) => row.request.phone,
  },
  {
    label: t('scoring_credit.fields.extra_phone'),
    prop: 'extra_phone',
    displayUsing: (row: CreditHistoryResponseModel) => row.request.extra_phone,
  },
  {
    label: t('scoring_credit.fields.birth_date'),
    prop: 'birth_date',
    displayUsing: (row: CreditHistoryResponseModel) => row.request.birth_date,
  },
  {
    label: t('scoring_credit.fields.region_id'),
    prop: 'region_id',
    displayUsing: (row: CreditHistoryResponseModel) => row.request.region_id,
  },
  {
    label: t('scoring_credit.fields.district_id'),
    prop: 'district_id',
    displayUsing: (row: CreditHistoryResponseModel) => row.request.district_id,
  },
]

const router = useRouter()
const _modalRef = ref()
const _loading = ref(false)

async function loadItems() {
  _loading.value = true
  const [error, response] = await getCreditHistory_API(queryData.value)
  _loading.value = false

  if (error) return

  _items.value = response.data
  _totalItems.value = response.meta.total
}

function openPensionInfoModal(item?: CreditHistoryResponseModel) {
  _modalRef.value.open(item)
}

const navigateToSingleView = (item: CreditHistoryResponseModel) => {
  if (item.id)
    router.push({
      path: '/scoring/single-credit-history',
      query: {
        id: item.id,
      },
    })
}

const deleteBranchs = (items: CreditHistoryResponseModel | CreditHistoryResponseModel[]) => {
  const payload: RemoveItemModel = {
    id: [],
    url: '/scoring/credit-history',
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

async function submit(data: CreditHistoryRequestModel) {
  const [error] = await createCreditHistory_API(data)
  if (error) return

  $baseMessage(t('scoring_credit.created_successfully'), 'success', 'hey')
  loadItems()
}
loadItems()
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
          v-if="hasAccess(PERMISSION_ENUM.scoring_credit_history_create)"
          :icon="AddIcon"
          size="large"
          type="primary"
          @click="openPensionInfoModal(undefined)"
        >
          {{ $t('buttons.add') }}
        </el-button>
      </template>
      <template #table-inline-actions="{ row }">
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.scoring_credit_history_delete)"
          :icon="DeleteIcon"
          type="danger"
          @click="() => deleteBranchs(row)"
        />
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.scoring_credit_history_view)"
          :disabled="row.status !== STATUS_ENUM.SUCCESS"
          :icon="ViewIcon"
          type="info"
          @click="() => navigateToSingleView(row)"
        />
      </template>
    </universal-table-next>
  </div>
</template>
