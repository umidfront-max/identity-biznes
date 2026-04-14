<script lang="ts" setup>
import { useTabsStore } from '/@/store/modules/tabs.ts'
import { handleActivePath } from '/@/utils/routes'
import { singleInstallment_API, InstalmentModel, getInstallment_DEFAULT } from '/@/services/instalment'
import SingleLoading from '../../../../components/SingleLoading.vue'
import AllAbout from './about.vue'
import Comment from './comment/index.vue'
import Document from './document/index.vue'
import Guarantor from './guarantor/index.vue'
import Transaction from './transaction/index.vue'
import { useI18n } from 'vue-i18n'
// import { formatDate_UTIL } from '/@/utils/dateFormat'
defineOptions({
  name: 'SingleBranches',
})
const { t } = useI18n()
const activeName = ref('first')

const route: any = useRoute()
const tabsStore = useTabsStore()
const { delVisitedRoute } = tabsStore
const _item = ref<InstalmentModel>(getInstallment_DEFAULT())
const _loading = ref(false)
const goBack = async () => {
  await delVisitedRoute(handleActivePath(route, true))
  history.back()
}
async function loadItems() {
  _loading.value = true
  const [error, response] = await singleInstallment_API(route.query.id)
  _loading.value = false
  if (error) return
  _item.value = response.data
  console.log('_item.value', _item.value)
}
loadItems()
</script>

<template>
  <div>
    <single-loading v-if="_loading" />
    <div v-else class="default-table-detail-container">
      <el-page-header :content="'Credit history: ' + _item.customer.first_name + ' ' + _item.customer.last_name" @back="goBack" />
      <el-tabs v-if="route?.query?.id" v-model="activeName" class="demo-tabs" type="border-card">
        <el-tab-pane :label="t('installments.fields.total_info')" name="first">
          <all-about :items="_item" />
        </el-tab-pane>
        <el-tab-pane :label="t('installments.fields.comment')" name="fourth">
          <comment :items="_item" @update="loadItems" />
        </el-tab-pane>
        <el-tab-pane :label="t('installments.fields.document')" name="second">
          <document :items="_item" @update="loadItems" />
        </el-tab-pane>
        <el-tab-pane :label="t('installments.fields.guarantor')" name="third">
          <guarantor :items="_item" @update="loadItems" />
        </el-tab-pane>
        <el-tab-pane :label="t('installments.fields.transaction')" name="fifth">
          <transaction />
        </el-tab-pane>
      </el-tabs>
      <all-about v-else :items="_item" />
      <!-- <el-descriptions style="margin: 20px 0" border :column="2">
        <el-descriptions-item>
          <template #label>branch</template>
          {{ _item.branch.name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>tariff</template>
          {{ _item.tariff.name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>amount</template>
          {{ _item.amount }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>Yaratilgan sana</template>
          {{ formatDate_UTIL(_item.created_at * 1000) }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>initial_fee</template>
          {{ _item.initial_fee }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>next_pay_date</template>
          {{ _item.next_pay_date }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions border :column="2" title="Passport malumotlari">
        <el-descriptions-item>
          <template #label>Pasport seriyasi</template>
          {{ _item.customer.passport_series }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>Pasport raqami</template>
          {{ _item.customer.passport_number }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>Tug'ilgan sanasi</template>
          {{ _item.customer.birth_date }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>Ism</template>
          {{ _item.customer.first_name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>Familiya</template>
          {{ _item.customer.last_name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>Otaning ismi</template>
          {{ _item.customer.middle_name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>JSHSHIR</template>
          {{ _item.customer.pinfl }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>STIR</template>
          {{ _item.customer.tin }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>INN</template>
          {{ _item.customer.tin }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>Yashash joyi</template>
          {{ _item.customer.birth_place }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>Pasport berilgan sana</template>
          {{ _item.customer.passport_given_date }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>Pasportning amal qilish muddati</template>
          {{ _item.customer.passport_expiration_date }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>Fuqaroligi</template>
          {{ _item.customer.passport_citizenship }}
        </el-descriptions-item>
      </el-descriptions> -->
    </div>
  </div>
</template>

<style lang="scss">
.default-table-detail-container {
  padding: 20px;
  background: white;
  border: 1px solid #e1dede;
  border-radius: 5px;
  .scoring {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    .progress {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  :deep() {
    .el-form--inline {
      .el-form-item {
        margin-right: 10px;
      }
    }
    .el-descriptions__label {
      min-width: 80px !important;
      text-align: right;
    }
  }
}
</style>
