<script setup lang="ts">
import { hasAccess } from '~/src/services/profile'
import TheModal from './Modal.vue'
import UniversalTableNext from '/@/components/UniversalTableNext.vue'
import { PERMISSION_ENUM } from '/@/router/pemissionsEnum'
import { OPEN_REMOVE_MODAL, type RemoveItemModel } from '/@/services/removeItem'
import { getTransactionType_API, type TransactionTypeModel } from '/@/services/transactionType'
import { formatDate_UTIL } from '/@/utils/dateFormat'
import { useI18n } from 'vue-i18n'
import EditIcon from '/@/icon/action/EditIcon.vue'
import DeleteIcon from '/@/icon/action/DeleteIcon.vue'
import AddIcon from '/@/icon/action/AddIcon.vue'
import ViewIcon from '/@/icon/action/ViewIcon.vue'

const { t } = useI18n()
const _items = ref<TransactionTypeModel[]>([])
const _totalItems = ref(0)
const tableColumns = [
  {
    label: t('installments.fields.name'),
    prop: 'name',
    sortable: true,
    checked: true,
  },
  {
    label: t('installments.fields.is_system'),
    prop: 'is_system',
    sortable: true,
    checked: true,
  },
  {
    label: t('installments.fields.created_at'),
    prop: 'created_at',
    sortable: true,
    checked: true,
    displayUsing: (row: TransactionTypeModel) => formatDate_UTIL(new Date(row.created_at * 1000), false),
  },
  {
    label: t('installments.fields.updated_at'),
    prop: 'updated_at',
    checked: true,
    displayUsing: (row: TransactionTypeModel) => formatDate_UTIL(new Date(row.created_at * 1000), false),
  },
]
const _modalRef = ref()
const _loading = ref(false)

async function loadItems() {
  _loading.value = true
  const [error, response] = await getTransactionType_API()
  _loading.value = false

  if (error) return

  _items.value = response.data
  _totalItems.value = response.meta.total
}

function openTariffModal(item?: TransactionTypeModel) {
  _modalRef.value.open(item)
}

function deleteTariffs(items: TransactionTypeModel | TransactionTypeModel[]) {
  const payload: RemoveItemModel = {
    id: [],
    url: 'installment/transaction-type',
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
        <router-link v-if="hasAccess(PERMISSION_ENUM.transaction_type_view)" :to="`/installments/singleTransactionType?id=${row.id}`">
          <el-button :icon="ViewIcon" type="info" />
        </router-link>
        <el-button
          v-if="row.id >= 100 && hasAccess(PERMISSION_ENUM.transaction_type_edit)"
          :icon="EditIcon"
          type="warning"
          @click="() => openTariffModal(row)"
        />
        <el-button
          v-if="row.id >= 100 && hasAccess(PERMISSION_ENUM.transaction_type_delete)"
          :icon="DeleteIcon"
          type="danger"
          @click="() => deleteTariffs(row)"
        />
      </template>
      <template #table-standalone-actions="{ selectedRows }">
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.transaction_type_create)"
          :icon="AddIcon"
          size="large"
          type="primary"
          @click="openTariffModal(undefined)"
        >
          {{ $t('buttons.add') }}
        </el-button>
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.transaction_type_delete) && selectedRows.length > 0"
          :icon="EditIcon"
          size="large"
          type="warning"
          @click="() => deleteTariffs(selectedRows)"
        >
          {{ $t('buttons.edit') }}
        </el-button>
      </template>
    </universal-table-next>
  </div>
</template>
