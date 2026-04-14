<script setup lang="ts">
import {
  _customerFullInfoStore,
  CustomerFullRequestInfoModel,
  ADDRESS_TYPE,
  PHONE_TYPES,
  customerCreate_API,
  GENDER_TYPE,
} from '/@/services/customer'
import { PropType } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const $baseMessage = inject<any>('$baseMessage')
const router = useRouter()
const route = useRoute()
const props = defineProps({
  items: {
    type: Object as PropType<CustomerFullRequestInfoModel>,
    required: true,
  },
})
console.log(props)

async function createCustomer() {
  const addressItem = _customerFullInfoStore.value.addresses.map((address) => {
    const item = {
      region_id: address.region_id,
      district_id: address.district_id,
      mahalla_id: address.mahalla_id,
      type: address.type,
      address: address.address,
    }
    return item
  })

  const data = (_customerFullInfoStore.value = {
    ..._customerFullInfoStore.value,
    addresses: addressItem,
  })

  const [error] = await customerCreate_API(data as CustomerFullRequestInfoModel)
  if (error) return
  $baseMessage(t('customers.customer_created'), 'success', 'hey')
  router.push('/customers/')
}

// async function singleCustomer() {
//   const [error, response] = await singleCustomers_API(Number(route.query.id));
//   if (error) return;
//   items.value = response.data;
// }
// onMounted(() => {
//   if (route?.query?.id) {
//     singleCustomer();
//   }
// });
</script>
<template>
  <div>
    <div class="customer-grid">
      <div class="customer-card">
        <p class="customer-title">
          {{ items.first_name + ' ' + items.last_name + ' ' + items.middle_name }}
        </p>
        <div style="display: flex; align-items: center">
          <p>{{ $t('customers.fields.passport_series_number') }}</p>
          <div class="customer-border"></div>
          <p class="customer-val">
            {{ items.passport_series + items.passport_number }}
          </p>
        </div>
        <div style="display: flex; align-items: center">
          <p>{{ $t('customers.fields.birth_date') }}</p>
          <div class="customer-border"></div>
          <p class="customer-val">{{ items.birth_date }}</p>
        </div>
        <div style="display: flex; align-items: center">
          <p>{{ $t('customers.fields.pinfl') }}</p>
          <div class="customer-border"></div>
          <p class="customer-val">{{ items.pinfl }}</p>
        </div>
        <div style="display: flex; align-items: center">
          <p>{{ $t('customers.fields.tin') }}</p>
          <div class="customer-border"></div>
          <p class="customer-val">{{ items.tin }}</p>
        </div>
        <div style="display: flex; align-items: center">
          <p>{{ $t('customers.fields.dwelling_place') }}</p>
          <div class="customer-border"></div>
          <p class="customer-val">{{ items.birth_place }}</p>
        </div>
        <div style="display: flex; align-items: center">
          <p>{{ $t('customers.fields.passport_given_date') }}</p>
          <div class="customer-border"></div>
          <p class="customer-val">{{ items.passport_given_date }}</p>
        </div>
        <div style="display: flex; align-items: center">
          <p>{{ $t('customers.fields.passport_expiration_date') }}</p>
          <div class="customer-border"></div>
          <p class="customer-val">{{ items.passport_expiration_date }}</p>
        </div>
        <div style="display: flex; align-items: center">
          <p>{{ $t('customers.fields.citizenship') }}</p>
          <div class="customer-border"></div>
          <p class="customer-val">{{ items.passport_citizenship }}</p>
        </div>
        <div style="display: flex; align-items: center">
          <p>{{ $t('customers.fields.gender') }}</p>
          <div class="customer-border"></div>
          <p class="customer-val">{{ GENDER_TYPE.get(items.gender)?.label }}</p>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; row-gap: 16px">
        <div class="customer-card">
          <div v-for="(address, ind) in items?.addresses" :key="ind">
            <p class="customer-title">{{ $t('customers.address') }} {{ ind + 1 }}</p>
            <div style="display: flex; align-items: center">
              <p>{{ $t('customers.fields.region_id') }}</p>
              <div class="customer-border"></div>
              <p class="customer-val">{{ address.region?.name }}</p>
            </div>
            <div style="display: flex; align-items: center">
              <p>{{ $t('customers.fields.district_id') }}</p>
              <div class="customer-border"></div>
              <p class="customer-val">{{ address.district?.name }}</p>
            </div>
            <div style="display: flex; align-items: center">
              <p>{{ $t('customers.fields.mahalla_id') }}</p>
              <div class="customer-border"></div>
              <p class="customer-val">{{ address.mahalla?.name }}</p>
            </div>
            <div style="display: flex; align-items: center">
              <p>{{ $t('customers.address') }}</p>
              <div class="customer-border"></div>
              <p class="customer-val">{{ address.address }}</p>
            </div>
            <div style="display: flex; align-items: center">
              <p>{{ $t('customers.fields.type') }}</p>
              <div class="customer-border"></div>
              <p class="customer-val">{{ ADDRESS_TYPE.get(address.type)?.label }}</p>
            </div>
          </div>
        </div>
        <div class="customer-card">
          <div v-for="(item, ind) in items?.phones" :key="ind">
            <p class="customer-title">{{ $t('customers.contact') }} {{ ind + 1 }}</p>
            <div style="display: flex; align-items: center">
              <p>{{ $t('customers.fields.phone') }}</p>
              <div class="customer-border"></div>
              <p class="customer-val">{{ item.phone }}</p>
            </div>
            <div style="display: flex; align-items: center">
              <p>{{ $t('customers.fields.type') }}</p>
              <div class="customer-border"></div>
              <p class="customer-val">{{ PHONE_TYPES.get(item.type)?.label }}</p>
            </div>
            <div style="display: flex; align-items: center">
              <p>{{ $t('customers.fields.comment') }}</p>
              <div class="customer-border"></div>
              <p class="customer-val">{{ item.comment }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!route?.query?.id" style="display: flex; justify-content: center; margin-top: 20px">
      <el-button style="height: 48px; padding: 0px 30px" type="primary" @click="createCustomer">
        {{ $t('customers.create_new_customer') }}
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.customer-card {
  padding: 16px;
  border: 1px solid #d9dbe8;
  border-radius: 16px;
}
p {
  margin: 8px;
}
.customer-title {
  font-size: 18px;
  color: #008dff;
  text-transform: capitalize;
}
.customer-border {
  flex-grow: 1;
  height: 3px;
  padding: 0px 2px;
  margin-top: 5px;
  border-bottom: 1px dashed #d8dee9;
}
.customer-val {
  max-width: 200px;
  font-weight: 600;
  text-align: right;
}
.customer-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 16px;
  align-items: start;
}
</style>
