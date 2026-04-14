<script lang="ts" setup>
import { type FormInstance } from 'element-plus'
import { InstalmentRequestModel } from '~/src/services/instalment'
import { CalculatorModel, getCalculator_API, CalculatorResponseModel } from '/@/services/calculator'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const _visible = ref(false)
const _formRef = ref<FormInstance>()
const _calculate = ref<CalculatorResponseModel[]>([])

async function calculateForm(item: CalculatorModel) {
  const [error, response] = await getCalculator_API(item)

  if (error) return
  _calculate.value = response
}

function open(item: InstalmentRequestModel) {
  const data = {
    tariff_id: item.tariff_id,
    amount: item.amount,
    initial_amount: item.initial_fee,
    period: item?.period,
  }
  calculateForm(data as CalculatorModel)
  _visible.value = true
}

function close() {
  reset()
}

function reset() {
  _formRef.value?.resetFields()
  _visible.value = false
}

defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="_visible" append-to-body draggable title="To'lov grafigi" width="70%" @close="close">
    <el-table :data="_calculate" height="450" style="width: 100%">
      <el-table-column label="№" prop="id" width="60" />
      <el-table-column :label="t('installments.fields.month')" prop="date" />
      <el-table-column :label="t('installments.fields.value')" prop="amount" />
      <el-table-column :label="t('installments.fields.percent')" prop="portion" />
      <el-table-column :label="t('installments.fields.total')" prop="monthly" />
    </el-table>
  </el-dialog>
</template>
<style lang="scss">
.tariff-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 30px;
  .el-input {
    width: 100% !important;
  }
}
</style>
