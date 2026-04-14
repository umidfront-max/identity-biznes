<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { TariffModel, getTariff_API } from '~/src/services/tariff'
import { rules } from './rules'
import { CalculatorModel, CalculatorResponseModel, getCalculator_API, postCalculator_DEFAULT } from '/@/services/calculator'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const formRef = ref<FormInstance>()
const _formData = ref<CalculatorModel>(postCalculator_DEFAULT())
const _items = ref<CalculatorResponseModel[]>([])
const _tariffOptions = ref<TariffModel[]>([])
const route = useRoute()

_formData.value = route.query?.items ? JSON.parse(route.query.items as any) : postCalculator_DEFAULT()

async function loadItems() {
  const [error, response] = await getTariff_API()

  if (error) return
  _tariffOptions.value = response.data
}
async function sendForm() {
  if (!formRef.value) return
  formRef.value?.validate(async (valid) => {
    if (valid) {
      const [error, response] = await getCalculator_API(_formData.value as CalculatorModel)

      if (error) return
      _items.value = response
    }
  })
}

loadItems()
onMounted(sendForm)
</script>
<template>
  <div class="calculator_formDatas">
    <el-form ref="formRef" class="calculator_form" label-position="top" :model="_formData" :rules="rules">
      <el-form-item :label="t('installments.fields.tariff')" prop="tariff_id">
        <el-select v-model="_formData.tariff_id" class="m-2" :placeholder="t('installments.placeholders.select')" style="width: 100%">
          <el-option v-for="item in _tariffOptions" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>

      <el-form-item :label="t('installments.fields.value')" prop="amount">
        <el-input v-model="_formData.amount" type="number" />
      </el-form-item>
      <el-form-item :label="t('installments.fields.initial_fee')" prop="initial_amount">
        <el-input v-model="_formData.initial_amount" type="number" />
      </el-form-item>
      <el-form-item :label="t('installments.fields.period')" prop="period">
        <el-input v-model="_formData.period" type="number" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sendForm">{{ $t('installments.fields.update') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="_items" height="450" style="width: 100%">
      <el-table-column label="№" prop="id" width="100" />
      <el-table-column :label="t('installments.fields.month')" prop="date" />
      <el-table-column :label="t('installments.fields.value')" prop="amount" />
      <el-table-column :label="t('installments.fields.percent')" prop="portion" />
      <el-table-column :label="t('installments.fields.total')" prop="monthly" />
    </el-table>
  </div>
</template>

<style lang="scss">
.calculator_formDatas {
  .calculator_form {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    column-gap: 30px;
    align-items: end;
  }
}
</style>
