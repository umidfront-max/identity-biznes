<script setup lang="ts">
import {
  _customerFullInfoStore,
  CustomerFullRequestInfoModel,
  getCustomerFullRequestInfo_DEFAULT,
  singleCustomers_API,
} from '/@/services/customer'
// import type { TabsPaneContext } from "element-plus";
import AllAbout from './about.vue'
import ThePhone from './phone/index.vue'
import TheCard from './card/index.vue'
import TheAddress from './address/index.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const activeName = ref('first')

// const $baseMessage = inject<any>("$baseMessage");
const router = useRouter()
const route = useRoute()
// const emit = defineEmits(['prew'])

const _items = ref<CustomerFullRequestInfoModel>(getCustomerFullRequestInfo_DEFAULT())
defineOptions({
  name: 'SingleCustomers',
})

const goBack = async () => {
  router.push('/customers/')
  // customerStore.stepActive = 2;
}
_items.value = _customerFullInfoStore.value
// async function createCustomer() {
//   const addressItem = _customerFullInfoStore.value.addresses.map((address) => {
//     const item = {
//       region_id: address.region_id,
//       district_id: address.district_id,
//       mahalla_id: address.mahalla_id,
//       type: address.type,
//       address: address.address,
//     };
//     return item;
//   });

//   const data = (_customerFullInfoStore.value = {
//     ..._customerFullInfoStore.value,
//     addresses: addressItem,
//   });

//   const [error] = await customerCreate_API(
//     data as CustomerFullRequestInfoModel
//   );
//   if (error) return;
//   $baseMessage(`Customer created successfully`, "success", "hey");
//   router.push("/customers/");
// }
// function reset() {
//   emit("prew");
// _customerFullInfoStore.value = getCustomerFullRequestInfo_DEFAULT()
// _customerContactInfoStore.value = getCustomerContacts_DEFAULT()
// _customerPassportInfoStore.value = getCustomerPassportInfo_DEFAULT()
// $baseMessage(`Customer o'chirildi`, 'success', 'hey')
// router.push('/customers/')
// }

async function singleCustomer() {
  const [error, response] = await singleCustomers_API(Number(route.query.id))
  if (error) return
  _items.value = response.data
}
onMounted(() => {
  if (route?.query?.id) {
    singleCustomer()
  }
})
</script>
<template>
  <div>
    <div class="customer-tab">
      <el-page-header v-if="route?.query?.id" :content="_items.first_name + ' ' + _items.last_name" @back="goBack" />
      <el-tabs v-if="route?.query?.id" v-model="activeName" class="demo-tabs" type="border-card">
        <el-tab-pane :label="t('customers.general_info')" name="first">
          <all-about :items="_items" />
        </el-tab-pane>
        <el-tab-pane :label="t('customers.address')" name="fourth">
          <the-address :items="_items.addresses" @update="singleCustomer" />
        </el-tab-pane>
        <el-tab-pane :label="t('customers.contacts')" name="second">
          <the-phone :items="_items.phones" @update="singleCustomer" />
        </el-tab-pane>
        <el-tab-pane :label="t('customers.card')" name="third">
          <the-card :items="_items.cards" @update="singleCustomer" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <all-about v-if="!route?.query?.id" :items="_items" />
  </div>
</template>

<style lang="scss">
.customer-tab {
  .demo-tabs > .el-tabs__content {
    padding: 32px !important;
  }

  .el-tabs--border-card {
    overflow: hidden;
    border-radius: 10px;
  }
}
</style>
