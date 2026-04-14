<script lang="ts" setup>
import UniversalTableNext from '/@/components/UniversalTableNext.vue'
import TheModal from './Modal.vue'
import { card_UTIL } from '~/src/utils/card'
import { phone_UTIL } from '~/src/utils/phone'
import { STATUS_ENUM } from '/@/services/mib'
import { CardModel } from '~/src/services/instalment'
import { CustomerContactAddressModel } from '/@/services/customer'
import { OPEN_REMOVE_MODAL, type RemoveItemModel } from '/@/services/removeItem'
import { useI18n } from 'vue-i18n'
import DeleteIcon from '/@/icon/action/DeleteIcon.vue'
import AddIcon from '/@/icon/action/AddIcon.vue'
const { t } = useI18n()
const _modalRef = ref()
const route = useRoute()
const _loading = ref(false)
const _totalItems = ref(0)
const emit = defineEmits(['update'])
const props = defineProps({
  items: {
    type: Object as PropType<CardModel[]>,
    required: true,
  },
})
const addressItems = computed(() => {
  return props.items
})

const tableColumns = [
  {
    label: t('customers.fields.status'),
    prop: 'status',
    sortable: true,
    checked: true,
    iconUsing: (row: CardModel) => {
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
    label: t('customers.fields.number'),
    prop: 'number',
    checked: true,
    displayUsing: (row: CardModel) => card_UTIL(+row.number),
  },
  {
    label: t('customers.fields.expiry'),
    prop: 'expiry',
    checked: true,
    displayUsing: (row: CardModel) => row.expiry,
  },
  {
    label: t('customers.fields.phone'),
    prop: 'phone',
    checked: true,
    displayUsing: (row: CardModel) => phone_UTIL(row.phone),
  },
  {
    label: t('customers.fields.balance'),
    prop: 'balance',
    checked: true,
    displayUsing: (row: CardModel) => row.balance,
  },
]

function openCardModal(item?: CardModel) {
  _modalRef.value.open(item)
}
function loadItems() {
  emit('update')
}
function deleteAddress(items: CustomerContactAddressModel | CustomerContactAddressModel[]) {
  const payload: RemoveItemModel = {
    id: [],
    url: `/customer/${route.query.id}/address`,
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
</script>
<template>
  <div class="card">
    <the-modal ref="_modalRef" @update="emit('update')" />
    <universal-table-next
      :items="addressItems"
      :loading="_loading"
      :table-columns="tableColumns"
      :total-items="_totalItems"
      @sort="emit('update')"
    >
      <template #table-inline-actions="{ row }">
        <el-button :icon="DeleteIcon" type="danger" @click="() => deleteAddress(row)" />
      </template>

      <template #table-standalone-actions="{ selectedRows }">
        <el-button :icon="AddIcon" size="large" type="primary" @click="() => openCardModal(selectedRows)">
          {{ $t('buttons.add') }}
        </el-button>

        <el-button v-if="selectedRows.length > 0" :icon="DeleteIcon" size="large" type="danger" @click="() => deleteAddress(selectedRows)">
          {{ $t('buttons.delete') }}
        </el-button>
      </template>
    </universal-table-next>
  </div>
</template>

<style lang="scss">
.card {
  .top-panel {
    display: none !important;
  }
}
</style>
