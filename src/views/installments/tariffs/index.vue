<script setup lang="ts">
import { hasAccess } from '~/src/services/profile'
import TheModal from './Modal.vue'
import UniversalTableNext from '/@/components/UniversalTableNext.vue'
import { PERMISSION_ENUM } from '/@/router/pemissionsEnum'
import { OPEN_REMOVE_MODAL, type RemoveItemModel } from '/@/services/removeItem'
import { getTariff_API, type TariffModel } from '/@/services/tariff'
import { useI18n } from 'vue-i18n'
import EditIcon from '/@/icon/action/EditIcon.vue'
import DeleteIcon from '/@/icon/action/DeleteIcon.vue'
import AddIcon from '/@/icon/action/AddIcon.vue'
import ViewIcon from '/@/icon/action/ViewIcon.vue'

const { t } = useI18n()
const _items = ref<TariffModel[]>([])
const _totalItems = ref(0)
const tableColumns = [
  {
    label: t('installments.fields.name'),
    prop: 'name',
    sortable: true,
    checked: true,
  },
  {
    label: t('installments.fields.type'),
    prop: 'is_annual',
    sortable: true,
    checked: true,
    displayUsing: (row: TariffModel) => (row.is_annual ? t('Annuity') : t('Dependent')),
  },
  {
    label: t('installments.fields.percent'),
    prop: 'percent',
    sortable: true,
    checked: true,
  },
  {
    label: t('installments.fields.min_amount'),
    prop: 'min_amount',
  },
  {
    label: t('installments.fields.max_amount'),
    prop: 'max_amount',
  },
  {
    label: t('installments.fields.min_initial_fee'),
    prop: 'min_initial_fee',
  },
  {
    label: t('installments.fields.max_initial_fee'),
    prop: 'max_initial_fee',
  },
  {
    label: t('installments.fields.max_period'),
    prop: 'max_period',
  },
  {
    label: t('installments.fields.min_period'),
    prop: 'min_period',
  },
]
const _modalRef = ref()
const _loading = ref(false)

async function loadItems() {
  _loading.value = true
  const [error, response] = await getTariff_API()
  _loading.value = false

  if (error) return

  _items.value = response.data
  _totalItems.value = response.meta.total
}

function openTariffModal(item?: TariffModel) {
  _modalRef.value.open(item)
}

function deleteTariffs(items: TariffModel | TariffModel[]) {
  const payload: RemoveItemModel = {
    id: [],
    url: 'installment/tariffs',
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

console.log('open123')
loadItems()
</script>

<template>
  <div>
    <the-modal ref="_modalRef" @update="loadItems" />

    <universal-table-next :items="_items" :loading="_loading" :table-columns="tableColumns" :total-items="_totalItems" @sort="loadItems">
      <template #table-inline-actions="{ row }">
        <router-link v-if="hasAccess(PERMISSION_ENUM.tariff_view)" :to="`/installments/tariff?id=${row.id}`">
          <el-button :icon="ViewIcon" type="info" />
        </router-link>
        <el-button v-if="hasAccess(PERMISSION_ENUM.tariff_edit)" :icon="EditIcon" type="warning" @click="() => openTariffModal(row)" />
        <el-button v-if="hasAccess(PERMISSION_ENUM.tariff_delete)" :icon="DeleteIcon" type="danger" @click="() => deleteTariffs(row)" />
      </template>
      <template #table-standalone-actions="{ selectedRows }">
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.tariff_create)"
          :icon="AddIcon"
          size="large"
          type="primary"
          @click="openTariffModal(undefined)"
        >
          {{ $t('buttons.add') }}
        </el-button>
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.tariff_delete) && selectedRows.length > 0"
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
