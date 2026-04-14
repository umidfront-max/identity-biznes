<script setup lang="ts">
import { hasAccess } from '~/src/services/profile'
import TheModal from './Modal.vue'
import UniversalTableNext from '/@/components/UniversalTableNext.vue'
import { PERMISSION_ENUM } from '/@/router/pemissionsEnum'
import { OPEN_REMOVE_MODAL, type RemoveItemModel } from '/@/services/removeItem'
import { getTransaction_API, type TransactionRequestModel, TransactionResponseModel } from '/@/services/instalment/transaction'
import { formatDate_UTIL } from '/@/utils/dateFormat'
import { useI18n } from 'vue-i18n'
import ViewIcon from '/@/icon/action/ViewIcon.vue'
import EditIcon from '/@/icon/action/EditIcon.vue'
import DeleteIcon from '/@/icon/action/DeleteIcon.vue'
import AddIcon from '/@/icon/action/AddIcon.vue'
const { t } = useI18n()
const _items = ref<TransactionResponseModel[]>([])
const _totalItems = ref(0)
const tableColumns = [
  {
    label: t('installments.fields.amount'),
    prop: 'amount',
    sortable: true,
    checked: true,
  },
  {
    label: t('installments.fields.transaction_type'),
    prop: 'amount',
    sortable: true,
    checked: true,
    displayUsing: (row: TransactionResponseModel) => row.transaction_type.name_uz,
  },
  {
    label: t('installments.fields.created_at'),
    prop: 'created_at',
    sortable: true,
    displayUsing: (row: TransactionResponseModel) => formatDate_UTIL(new Date(row.created_at * 1000), false),
  },
  {
    label: t('installments.fields.updated_at'),
    prop: 'updated_at',
    displayUsing: (row: TransactionResponseModel) => formatDate_UTIL(new Date(row.created_at * 1000), false),
  },
]
const _modalRef = ref()
const _loading = ref(false)

async function loadItems() {
  _loading.value = true
  const [error, response] = await getTransaction_API()
  _loading.value = false

  if (error) return

  _items.value = response.data
  _totalItems.value = response.meta.total
}

function openTariffModal(item?: TransactionRequestModel) {
  _modalRef.value.open(item)
}

function deleteTariffs(items: TransactionResponseModel | TransactionResponseModel[]) {
  const payload: RemoveItemModel = {
    id: [],
    url: 'installment/transaction',
    callback: loadItems,
  }

  if (Array.isArray(items)) {
    for (const iterator of items) {
      payload.id.push(iterator.id as number)
    }
  } else {
    payload.id.push(items.id as number)
  }

  OPEN_REMOVE_MODAL(payload)
}

loadItems()
</script>

<template>
  <div>
    <the-modal ref="_modalRef" @update="loadItems" />

    <universal-table-next :items="_items" :loading="_loading" :table-columns="tableColumns" :total-items="_totalItems" @sort="loadItems">
      <template #table-inline-actions="{ row }">
        <router-link
          v-if="hasAccess(PERMISSION_ENUM.transaction_view) && row.installment?.branch_id"
          :to="`/installments/transaction?id=${row.id}`"
        >
          <el-button :icon="ViewIcon" type="info" />
        </router-link>
        <el-button
          v-if="!row.transaction_type.is_system && row.installment?.branch_id && hasAccess(PERMISSION_ENUM.transaction_edit)"
          :icon="EditIcon"
          type="warning"
          @click="() => openTariffModal(row)"
        />
        <el-button
          v-if="!row.transaction_type.is_system && row.installment?.branch_id && hasAccess(PERMISSION_ENUM.transaction_delete)"
          :icon="DeleteIcon"
          type="danger"
          @click="() => deleteTariffs(row)"
        />
      </template>
      <template #table-standalone-actions="{ selectedRows }">
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.transaction_create)"
          :icon="AddIcon"
          size="large"
          type="primary"
          @click="openTariffModal(undefined)"
        >
          {{ $t('buttons.add') }}
        </el-button>
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.transaction_delete) && selectedRows.length > 0"
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
