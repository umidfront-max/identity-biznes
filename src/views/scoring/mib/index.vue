<script setup lang="ts">
import { hasAccess } from '~/src/services/profile'
import TheModal from './Modal.vue'
import UniversalTableNext from '/@/components/UniversalTableNext.vue'
import TableLoading from '/@/components/TableLoading.vue'
import { PERMISSION_ENUM } from '/@/router/pemissionsEnum'
import { MibResponseModel, STATUS_ENUM, getMibs_API } from '/@/services/mib'
import { QueryDataModel } from '/@/services/network'
import { OPEN_REMOVE_MODAL, type RemoveItemModel } from '/@/services/removeItem'
import { formatDate_UTIL } from '/@/utils/dateFormat'
import { phone_UTIL } from '/@/utils/phone'
import { useI18n } from 'vue-i18n'
import DeleteIcon from '/@/icon/action/DeleteIcon.vue'
import AddIcon from '/@/icon/action/AddIcon.vue'
const { t } = useI18n()
const _items = ref<MibResponseModel[]>([])
const route = useRoute()
const _totalItems = ref(0)

const queryData = ref<QueryDataModel>({
  page: Number(route.query?.currentPage) || 1,
  per_page: 10,
  search: (route.query?.search as string) || null,
  sort: (route.query?.sort as string) || null,
})
const tableColumns = [
  {
    label: t('scoring_mib.fields.status'),
    prop: 'status',
    sortable: true,
    checked: true,
    iconUsing: (row: MibResponseModel) => {
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
    label: t('scoring_mib.fields.pinfl'),
    prop: 'pinfl',
    checked: true,
    displayUsing: (row: MibResponseModel) => row.request.pinfl,
  },
  {
    label: t('scoring_mib.fields.phone'),
    prop: 'phone',
    checked: true,
    displayUsing: (row: MibResponseModel) => phone_UTIL(row.request.phone?.slice(-12)),
  },
  {
    label: t('scoring_mib.fields.debtBal'),
    prop: 'debtBal',
    checked: true,
    displayUsing: (row: MibResponseModel) =>
      !row.response?.debtBal
        ? "Qarzdorligi yo'q"
        : `Qarzdorligi ${((row.response?.debtBal - 1) * 500000)?.toLocaleString()} so'mdan ${(
            row.response?.debtBal * 500000
          )?.toLocaleString()} so'mgacha`,
  },
  {
    label: t('scoring_mib.fields.created_at'),
    prop: 'created_at',
    sortable: true,
    displayUsing: (row: MibResponseModel) => formatDate_UTIL(new Date(row.created_at * 1000), false),
  },
  {
    label: t('scoring_mib.fields.updated_at'),
    prop: 'updated_at',
    displayUsing: (row: MibResponseModel) => formatDate_UTIL(new Date(row.created_at * 1000), false),
  },
]
const _modalRef = ref()
const _loading = ref(false)

async function loadItems(item: QueryDataModel) {
  _loading.value = true
  const [error, response] = await getMibs_API(item)
  _loading.value = false
  if (error) return

  _items.value = response.data
  _totalItems.value = response.meta.total
}

function openTariffModal(item?: MibResponseModel) {
  _modalRef.value.open(item)
}

const deleteBranchs = (items: MibResponseModel | MibResponseModel[]) => {
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

loadItems(queryData.value)
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
      <template #table-inline-actions="{ row }">
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.scoring_mib_info_delete)"
          :icon="DeleteIcon"
          type="danger"
          @click="() => deleteBranchs(row)"
        />
      </template>
      <template #table-standalone-actions="{ selectedRows }">
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.scoring_mib_info_create)"
          :icon="AddIcon"
          size="large"
          type="primary"
          @click="openTariffModal(undefined)"
        >
          {{ $t('buttons.add') }}
        </el-button>
        <el-button
          v-if="selectedRows.length > 0 && hasAccess(PERMISSION_ENUM.scoring_mib_info_delete)"
          :icon="DeleteIcon"
          size="large"
          type="danger"
          @click="() => deleteBranchs(selectedRows)"
        >
          {{ $t('buttons.delete') }}
        </el-button>
      </template>
    </universal-table-next>
  </div>
</template>
