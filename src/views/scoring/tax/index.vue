<script setup lang="ts">
import { hasAccess } from '~/src/services/profile'
import TheModal from './Modal.vue'
import UniversalTableNext from '/@/components/UniversalTableNext.vue'
import TableLoading from '/@/components/TableLoading.vue'
import { PERMISSION_ENUM } from '/@/router/pemissionsEnum'
import { STATUS_ENUM } from '/@/services/mib'
import { QueryDataModel } from '/@/services/network'
import { OPEN_REMOVE_MODAL, type RemoveItemModel } from '/@/services/removeItem'
import { TaxResponseModel, getTaxs_API } from '/@/services/tax'
import { formatDate_UTIL } from '/@/utils/dateFormat'
import { useI18n } from 'vue-i18n'
import AddIcon from '/@/icon/action/AddIcon.vue'
import DeleteIcon from '/@/icon/action/DeleteIcon.vue'

const { t } = useI18n()
const _items = ref<TaxResponseModel[]>([])
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
    label: t('scoring_tax.fields.status'),
    prop: 'status',
    checked: true,
    sortable: true,

    iconUsing: (row: TaxResponseModel) => {
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
    label: t('scoring_tax.fields.pinfl'),
    prop: 'pinfl',
    checked: true,
    displayUsing: (row: TaxResponseModel) => row.request.pinfl,
  },
  {
    label: t('scoring_tax.fields.debtBal'),
    prop: 'debtBal',
    checked: true,
    displayUsing: (row: TaxResponseModel) =>
      !row.response?.debtBal
        ? "Qarzdorligi yo'q"
        : `Qarzdorligi ${(row.response?.debtBal - 1) * 500000} so'mdan ${row.response?.debtBal * 500000} so'mgacha`,
  },
  {
    label: t('scoring_tax.fields.created_at'),
    prop: 'created_at',
    sortable: true,
    displayUsing: (row: TaxResponseModel) => formatDate_UTIL(new Date(row.created_at * 1000), false),
  },
  {
    label: t('scoring_tax.fields.updated_at'),
    prop: 'updated_at',
    displayUsing: (row: TaxResponseModel) => formatDate_UTIL(new Date(row.created_at * 1000), false),
  },
]
const _modalRef = ref()
const _loading = ref(false)

async function loadItems(item: QueryDataModel = queryData.value) {
  _loading.value = true
  const [error, response] = await getTaxs_API(item)
  _loading.value = false
  if (error) return

  _items.value = response.data
  _totalItems.value = response.meta.total
}

function openTariffModal(item?: TaxResponseModel) {
  _modalRef.value.open(item)
}
const deleteBranchs = (items: TaxResponseModel | TaxResponseModel[]) => {
  const payload: RemoveItemModel = {
    id: [],
    url: '/scoring/mib',
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

loadItems()
</script>

<template>
  <div>
    <the-modal ref="_modalRef" @refresh-table="loadItems" />
    <table-loading v-if="_loading" />
    <universal-table-next
      v-else
      :items="_items"
      :loading="_loading"
      :table-columns="tableColumns"
      :total-items="_totalItems"
      @sort="loadItems"
    >
      <template #table-standalone-actions="">
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.scoring_tax_info_create)"
          :icon="AddIcon"
          size="large"
          type="primary"
          @click="openTariffModal(undefined)"
        >
          {{ $t('buttons.add') }}
        </el-button>
      </template>
      <template #table-inline-actions="{ row }">
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.scoring_tax_info_delete)"
          :icon="DeleteIcon"
          type="danger"
          @click="() => deleteBranchs(row)"
        />
      </template>
    </universal-table-next>
  </div>
</template>
