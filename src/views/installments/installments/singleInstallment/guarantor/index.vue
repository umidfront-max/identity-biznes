<script lang="ts" setup>
import UniversalTableNext from '/@/components/UniversalTableNext.vue'
import TheModal from './Modal.vue'

// import { PERMISSION_ENUM } from "/@/router/pemissionsEnum";
// import { hasAccess } from "~/src/services/profile";
import { CustomerModel2, InstalmentModel } from '~/src/services/instalment'
import { OPEN_REMOVE_MODAL, type RemoveItemModel } from '/@/services/removeItem'
import EditIcon from '/@/icon/action/EditIcon.vue'
import DeleteIcon from '/@/icon/action/DeleteIcon.vue'
import AddIcon from '/@/icon/action/AddIcon.vue'

const _modalRef = ref()
const _loading = ref(false)
const _totalItems = ref(0)
const emit = defineEmits(['update'])
const props = defineProps({
  items: {
    type: Object as PropType<InstalmentModel>,
    required: true,
  },
})
const commentItems = computed(() => {
  return props.items.guarantors
})

const tableColumns = [
  {
    label: 'Ism',
    prop: 'first_name',
    sortable: true,
    checked: true,
  },
  {
    label: 'Familiya',
    prop: 'last_name',
    sortable: true,
    checked: true,
  },
  {
    label: "Tug'ilgan kun",
    prop: 'birth_date',
    sortable: true,
    checked: true,
  },
  {
    label: 'JSHSHIR ',
    prop: 'pinfl',
  },
  {
    label: 'INN',
    prop: 'tin',
  },
  {
    label: 'Pasport seria',
    prop: 'passport_series',
  },
  {
    label: 'Pasport nomer',
    prop: 'passport_number',
  },
  {
    label: 'Pasport berilgan sana',
    prop: 'passport_given_date',
  },
  {
    label: 'Pasportning amal qilish muddati',
    prop: 'passport_expiration_date',
  },
  {
    label: 'Fuqaroligi',
    prop: 'passport_citizenship',
  },
  {
    label: 'Viloyat',
    prop: 'region_id',
  },
  {
    label: 'Tuman',
    prop: 'district_id',
  },
  {
    label: 'Mahalla',
    prop: 'mahalla_id',
  },
]

function openGuarantorModal(item?: CustomerModel2) {
  _modalRef.value.open(item)
}
function loadItems() {
  emit('update')
}
function deleteGuarantor(items: CustomerModel2 | CustomerModel2[]) {
  const payload: RemoveItemModel = {
    id: [],
    url: `/installment/installment/detach-guarantor`,
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
      :items="commentItems"
      :loading="_loading"
      :table-columns="tableColumns"
      :total-items="_totalItems"
      @sort="emit('update')"
    >
      <template #table-inline-actions="{ row }">
        <el-button :icon="EditIcon" type="warning" />

        <el-button :icon="DeleteIcon" type="danger" @click="() => deleteGuarantor(row)" />
      </template>
      <template #table-standalone-actions="{ selectedRows }">
        <el-button :icon="AddIcon" size="large" type="primary" @click="() => openGuarantorModal(selectedRows)">
          {{ $t('buttons.add') }}
        </el-button>
        <!-- $router.push({
                path: `/customers`,
                query: { id: $route.query.id, rediract: 'guarantor' },
              }) -->
        <el-button
          v-if="selectedRows.length > 0"
          :icon="DeleteIcon"
          size="large"
          type="danger"
          @click="() => deleteGuarantor(selectedRows)"
        >
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
