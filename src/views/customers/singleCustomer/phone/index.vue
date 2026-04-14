<script lang="ts" setup>
import UniversalTableNext from '/@/components/UniversalTableNext.vue'
import TheModal from './Modal.vue'
import { phone_UTIL } from '~/src/utils/phone'
import { CustomerContactPhoneModel, PHONE_TYPES } from '/@/services/customer'
import { OPEN_REMOVE_MODAL, type RemovePhoneItemModel } from '/@/services/removeItem'
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
    type: Object as PropType<CustomerContactPhoneModel[]>,
    required: true,
  },
})
const addressItems = computed(() => {
  return props.items
})

const tableColumns = [
  {
    label: t('customers.fields.phone'),
    prop: 'phone',
    checked: true,
    displayUsing: (row: CustomerContactPhoneModel) => phone_UTIL(row.phone),
  },
  {
    label: t('customers.fields.type'),
    prop: 'type',
    checked: true,
    displayUsing: (row: CustomerContactPhoneModel) => (PHONE_TYPES as any).get(row.type).label,
  },
  {
    label: t('customers.fields.comment'),
    prop: 'comment',
    checked: true,
    displayUsing: (row: CustomerContactPhoneModel) => row.comment,
  },
]

function openTariffModal(item?: CustomerContactPhoneModel) {
  _modalRef.value.open(item)
}
function loadItems() {
  emit('update')
}
function deleteAddress(items: CustomerContactPhoneModel | CustomerContactPhoneModel[]) {
  const payload: RemovePhoneItemModel = {
    id: [],
    url: `/customer/${route.query.id}/phone`,
    callback: loadItems,
  }

  if (Array.isArray(items)) {
    for (const iterator of items) {
      payload.id.push(String(iterator.phone))
    }
  } else {
    payload.id.push(String(items.phone))
  }

  OPEN_REMOVE_MODAL(payload, true)
}
</script>
<template>
  <div class="address">
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
        <el-button :icon="AddIcon" size="large" type="primary" @click="() => openTariffModal(selectedRows)">
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
.address {
  .top-panel {
    display: none !important;
  }
}
</style>
