<script lang="ts" setup>
import UniversalTableNext from '/@/components/UniversalTableNext.vue'
import TheModal from './Modal.vue'
import { useI18n } from 'vue-i18n'

import { CustomerContactAddressModel, CustomerAddressModel } from '/@/services/customer'
import { OPEN_REMOVE_MODAL, type RemoveItemModel } from '/@/services/removeItem'
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
    type: Object as PropType<CustomerAddressModel[]>,
    required: true,
  },
})
const addressItems = computed(() => {
  return props.items
})

const tableColumns = [
  {
    label: t('customers.fields.region_id'),
    prop: 'region_id',
    checked: true,
    displayUsing: (row: CustomerContactAddressModel) => row.region?.name,
  },
  {
    label: t('customers.fields.district_id'),
    prop: 'district.name',
    checked: true,
    displayUsing: (row: CustomerContactAddressModel) => row.district?.name,
  },
  {
    label: t('customers.fields.mahalla_id'),
    prop: 'mahalla_id',
    checked: true,
    displayUsing: (row: CustomerContactAddressModel) => row.mahalla?.name,
  },
  {
    label: t('customers.address'),
    prop: 'address',
    checked: true,
    displayUsing: (row: CustomerContactAddressModel) => row.address,
  },
]

function openTariffModal(item?: CustomerContactAddressModel) {
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
    <!-- <el-table :data="items?.addresses" style="width: 100%">
      <el-table-column
        v-if="!route?.query?.id"
        label="Type"
        prop="type"
        width="200"
      >
        <template #default="{ row }">
          <p>{{ ADDRESS_TYPE.get(row.type)?.label }}</p>
        </template>
      </el-table-column>
      <el-table-column label="Viloyat" prop="region.name" />
      <el-table-column label="Tuman" prop="district.name" />
      <el-table-column label="Mahalla" prop="mahalla.name" />
      <el-table-column label="address" prop="address" width="400" />
      <el-table-column width="120">
        <template #default="scope">
          <el-button
            :icon="Delete"
            size=""
            type="danger"
            @click="deleteAddres(scope.$index, scope.row)"
          />
        </template>
      </el-table-column>
    </el-table> -->
  </div>
</template>

<style lang="scss">
.address {
  .top-panel {
    display: none !important;
  }
}
</style>
