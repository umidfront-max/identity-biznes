<template>
  <div>
    <the-modal ref="_modalRef" @update="loadItems" />

    <h2>{{ tariff.name }}</h2>
    <div class="default-table-detail-container">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px">
        <el-button class="single_btn" :icon="ArrowIcon" @click="goBack" />
        <el-button :icon="EditIcon" size="large" type="warning" @click="openTariffModal(tariff)">Изменить</el-button>
      </div>

      <div class="single">
        <div class="single-card">
          <div style="display: flex; align-items: center">
            <p>{{ $t('installments.fields.min_amount') }}</p>
            <div class="single-border"></div>
            <p class="single-val">{{ tariff.min_amount }}</p>
          </div>
        </div>
        <div class="single-card">
          <div style="display: flex; align-items: center">
            <p>{{ $t('installments.fields.max_amount') }}</p>
            <div class="single-border"></div>
            <p class="single-val">{{ tariff.max_amount }}</p>
          </div>
        </div>
        <div class="single-card">
          <div style="display: flex; align-items: center">
            <p>{{ $t('installments.fields.min_initial_fee') }}</p>
            <div class="single-border"></div>
            <p class="single-val">{{ tariff.min_initial_fee }}</p>
          </div>
        </div>
        <div class="single-card">
          <div style="display: flex; align-items: center">
            <p>{{ $t('installments.fields.max_initial_fee') }}</p>
            <div class="single-border"></div>
            <p class="single-val">{{ tariff.max_initial_fee }}</p>
          </div>
        </div>
        <div class="single-card">
          <div style="display: flex; align-items: center">
            <p>{{ $t('installments.fields.max_period') }}</p>
            <div class="single-border"></div>
            <p class="single-val">{{ tariff.max_period }}</p>
          </div>
        </div>
        <div class="single-card">
          <div style="display: flex; align-items: center">
            <p>{{ $t('installments.fields.min_period') }}</p>
            <div class="single-border"></div>
            <p class="single-val">{{ tariff.min_period }}</p>
          </div>
        </div>
        <div class="single-card">
          <div style="display: flex; align-items: center">
            <p>{{ $t('installments.fields.percent') }}</p>
            <div class="single-border"></div>
            <p class="single-val">{{ tariff.percent }}%</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTabsStore } from '/@/store/modules/tabs.ts'
import { handleActivePath } from '/@/utils/routes'
import { TariffModel, singleTariff_API, getTariff_DEFAULT } from '/@/services/tariff'
import ArrowIcon from '/@/icon/action/ArrowIcon.vue'
import EditIcon from '/@/icon/action/EditIcon.vue'
import TheModal from './Modal.vue'

defineOptions({
  name: 'SingleTariff',
})

const _modalRef = ref()
const route: any = useRoute()
const tabsStore = useTabsStore()
const { delVisitedRoute } = tabsStore
const tariff = ref<TariffModel>(getTariff_DEFAULT())

const goBack = async () => {
  await delVisitedRoute(handleActivePath(route, true))
  history.back()
}
function openTariffModal(item?: TariffModel) {
  _modalRef.value.open(item)
}
async function loadItems() {
  const [error, response] = await singleTariff_API(route.query.id)

  if (error) return
  tariff.value = response.data
}
loadItems()
</script>

<style lang="scss" scoped>
.default-table-detail-container {
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
<style lang="scss">
.default-table-detail-container {
  height: 100%;
  min-height: 420px;
  padding: 24px;
  padding-right: 70px !important;
  background: white;
  border-radius: 10px;
}
.single_btn {
  width: 40px;
  height: 40px;
  background: var(--el-background-color) !important;
  border-radius: 50% !important;
}
.single {
  padding: 18px 24px;
  border: 1px solid #d9dbe8;
  border-radius: 10px;
}
.single-card {
  p {
    line-height: 0.5 !important;
  }
}
.single-border {
  flex-grow: 1;
  height: 3px;
  padding: 0px 2px;
  margin-top: 5px;
  border-bottom: 1px dashed #d8dee9;
}
.single-val {
  max-width: 200px;
  font-weight: 600;
  text-align: right;
}
.single-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 16px;
  align-items: start;
}
</style>
