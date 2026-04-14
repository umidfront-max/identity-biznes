<script setup lang="ts">
import { hasAccess } from '~/src/services/profile'
// import TheModal from './Modal.vue'
import { formatDate_UTIL } from '/@/utils/dateFormat'

import UniversalTableNext from '/@/components/UniversalTableNext.vue'
import { PERMISSION_ENUM } from '/@/router/pemissionsEnum'
import { OPEN_REMOVE_MODAL, type RemoveItemModel } from '/@/services/removeItem'
import { getInstalments_API, InstalmentModel } from '../../../services/instalment'
import { useI18n } from 'vue-i18n'
import ViewIcon from '/@/icon/action/ViewIcon.vue'
import EditIcon from '/@/icon/action/EditIcon.vue'
import DeleteIcon from '/@/icon/action/DeleteIcon.vue'
import AddIcon from '/@/icon/action/AddIcon.vue'

const { t } = useI18n()
const _items = ref<InstalmentModel[]>([])
const _totalItems = ref(0)
const tableColumns = [
  {
    label: t('installments.fields.fio'),
    prop: 'type',
    checked: true,
    displayUsing: (row: InstalmentModel) => `${row.customer?.first_name} ${row.customer?.last_name}`,
  },
  {
    label: t('installments.fields.branch'),
    prop: 'branch',
    displayUsing: (row: InstalmentModel) => row?.branch?.name,
    checked: true,
  },
  {
    label: t('installments.fields.tariff'),
    prop: 'tariff',
    displayUsing: (row: InstalmentModel) => row.tariff?.name,
    checked: true,
  },
  {
    label: t('installments.fields.amount'),
    prop: 'amount',
    checked: true,
  },
  {
    label: t('installments.fields.initial_fee'),
    prop: 'initial_fee',
  },
  {
    label: t('installments.fields.starts_in'),
    prop: 'starts_in',
    displayUsing: (row: InstalmentModel) => formatDate_UTIL(new Date(row.starts_in * 1000)),
  },
  {
    label: t('installments.fields.description'),
    prop: 'description',
  },
  {
    label: t('installments.fields.created_at'),
    prop: 'created_at',
    sortable: true,
    displayUsing: (row: InstalmentModel) => formatDate_UTIL(new Date(row.created_at * 1000)),
  },
  {
    label: t('installments.fields.updated_at'),
    prop: 'updated_at',
    displayUsing: (row: InstalmentModel) => formatDate_UTIL(new Date(row.created_at * 1000)),
  },
]
const _modalRef = ref()
const _loading = ref(false)

async function loadItems() {
  _loading.value = true
  const [error, response] = await getInstalments_API()
  _loading.value = false

  if (error) return

  _items.value = response.data
  _totalItems.value = response.meta.total
}

function openTariffModal(item?: InstalmentModel) {
  _modalRef.value.open(item)
}

function deleteTariffs(items: InstalmentModel | InstalmentModel[]) {
  const payload: RemoveItemModel = {
    id: [],
    url: 'installment/installment',
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
    <!-- <the-modal ref="_modalRef" @update="loadItems" /> -->
    <universal-table-next :items="_items" :loading="_loading" :table-columns="tableColumns" :total-items="_totalItems" @sort="loadItems">
      <template #table-inline-actions="{ row }">
        <router-link v-if="hasAccess(PERMISSION_ENUM.installment_view)" :to="`/installments/singleInstallment/?id=${row.id}`">
          <el-button :icon="ViewIcon" type="info" />
        </router-link>
        <el-button v-if="hasAccess(PERMISSION_ENUM.installment_edit)" :icon="EditIcon" type="warning" @click="() => openTariffModal(row)" />
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.installment_delete)"
          :icon="DeleteIcon"
          type="danger"
          @click="() => deleteTariffs(row)"
        />
      </template>
      <template #table-standalone-actions="{ selectedRows }">
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.installment_create)"
          :icon="AddIcon"
          size="large"
          type="primary"
          @click="$router.push('/installments/creditInstallment')"
        >
          {{ $t('buttons.add') }}
        </el-button>
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.installment_delete) && selectedRows.length > 0"
          :icon="DeleteIcon"
          size="large"
          type="danger"
          @click="() => deleteTariffs(selectedRows)"
        >
          {{ $t('buttons.delete') }}
        </el-button>
      </template>
    </universal-table-next>
  </div>
</template>
