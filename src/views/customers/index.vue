<script setup lang="ts">
import { hasAccess } from '~/src/services/profile'
import UniversalTableNext from '/@/components/UniversalTableNext.vue'
import { PERMISSION_ENUM } from '/@/router/pemissionsEnum'
import { getCustomers_API, type CustomerShortDetailsModel, CustomerPassportInfoModel } from '/@/services/customer'
import TheModal from './Modal.vue'
import { useI18n } from 'vue-i18n'
import ViewIcon from '/@/icon/action/ViewIcon.vue'
import EditIcon from '/@/icon/action/EditIcon.vue'
import AddIcon from '/@/icon/action/AddIcon.vue'

const { t } = useI18n()
const _items = ref<CustomerShortDetailsModel[]>([])
const _totalItems = ref(0)
const _modalRef = ref()

const tableColumns = [
  {
    label: t('customers.fields.first_name'),
    prop: 'first_name',
    sortable: true,
    checked: true,
  },
  {
    label: t('customers.fields.last_name'),
    prop: 'last_name',
    sortable: true,
    checked: true,
  },
  {
    label: t('customers.fields.birth_date'),
    prop: 'birth_date',
    sortable: true,
    checked: true,
  },
  {
    label: t('customers.fields.pinfl'),
    prop: 'pinfl',
  },
  {
    label: t('customers.fields.tin'),
    prop: 'tin',
  },
  {
    label: t('customers.fields.passport_series'),
    prop: 'passport_series',
  },
  {
    label: t('customers.fields.passport_number'),
    prop: 'passport_number',
  },
  {
    label: t('customers.fields.passport_given_date'),
    prop: 'passport_given_date',
  },
  {
    label: t('customers.fields.passport_expiration_date'),
    prop: 'passport_expiration_date',
  },
  {
    label: t('customers.fields.passport_citizenship'),
    prop: 'passport_citizenship',
  },
  {
    label: t('customers.fields.region_id'),
    prop: 'region_id',
  },
  {
    label: t('customers.fields.district_id'),
    prop: 'district_id',
  },
  {
    label: t('customers.fields.mahalla_id'),
    prop: 'mahalla_id',
  },
]
const _loading = ref(false)
function openCustomerModal(item: CustomerPassportInfoModel) {
  _modalRef.value.open(item)
}

async function loadItems() {
  _loading.value = true
  const [error, response] = await getCustomers_API()
  _loading.value = false

  if (error) return

  _items.value = response.data
  _totalItems.value = response.meta.total
}

loadItems()
</script>

<template>
  <div>
    <the-modal ref="_modalRef" @update="loadItems" />
    <universal-table-next :items="_items" :loading="_loading" :table-columns="tableColumns" :total-items="_totalItems" @sort="loadItems">
      <template #table-inline-actions="{ row }">
        <router-link v-if="hasAccess(PERMISSION_ENUM.customer_view)" :to="`/customers/singleCustomer?id=${row.id}`">
          <el-button :icon="ViewIcon" type="info" />
        </router-link>

        <el-button :icon="EditIcon" type="warning" @click="() => openCustomerModal(row)" />
      </template>

      <template #table-standalone-actions>
        <router-link v-if="hasAccess(PERMISSION_ENUM.customer_create)" :to="`/customers/setCustomer`">
          <el-button :icon="AddIcon" size="large" type="primary">
            {{ $t('buttons.add') }}
          </el-button>
        </router-link>
      </template>
    </universal-table-next>
    <!-- <customer-form ref="customerFormRef" @refresh-table="customersStore.refreshTable" /> -->
  </div>
</template>
