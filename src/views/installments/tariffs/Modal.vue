<script lang="ts" setup>
import { type FormInstance } from 'element-plus'
import { _rules } from './rules'
import {
  TARIFF_TYPES,
  TARIFF_TYPES_ENUM,
  createTariff_API,
  getTariff_DEFAULT,
  updateTariff_API,
  type TariffModel,
} from '/@/services/tariff'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emit = defineEmits(['update'])
const _title = ref('')
const _visible = ref(false)
const _formRef = ref<FormInstance>()
const _formData = ref<TariffModel>(getTariff_DEFAULT())

const $baseMessage = inject<any>('$baseMessage')

function open(item?: TariffModel) {
  _title.value = t('add')
  if (item) {
    _title.value = t('edit')
    _formData.value = { ...item }
    item?.is_annual == true
      ? (_formData.value.is_annual = TARIFF_TYPES_ENUM.ANNUITY)
      : (_formData.value.is_annual = TARIFF_TYPES_ENUM.DIFFERENTIAL)
  }
  _visible.value = true
}

function close() {
  emit('update')
  reset()
}

function reset() {
  _formRef.value?.resetFields()
  _formData.value = getTariff_DEFAULT()
  _visible.value = false
}

function submit() {
  _formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      _formData.value.is_annual == TARIFF_TYPES_ENUM.ANNUITY ? (_formData.value.is_annual = true) : (_formData.value.is_annual = false)
      const handleTariffAPI = _formData.value.id ? updateTariff_API : createTariff_API

      const [error] = await handleTariffAPI(_formData.value)
      if (error) return

      $baseMessage(`Tariff ${_formData.value.id ? 'updated' : 'created'} successfully`, 'success', 'hey')
      close()
    }
  })
}

defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="_visible" append-to-body draggable :title="_title" width="700px" @close="close">
    <el-form ref="_formRef" class="tariff-grid" label-position="top" label-width="160px" :model="_formData" :rules="_rules">
      <el-form-item :label="t('installments.fields.name')" prop="name">
        <el-input v-model.trim="_formData.name" clearable />
      </el-form-item>
      <el-form-item :label="t('installments.fields.min_initial_fee')" prop="min_initial_fee">
        <el-input v-model="_formData.min_initial_fee" clearable type="number" />
      </el-form-item>
      <div style="position: relative">
        <el-form-item :label="t('installments.fields.percent')" prop="percent">
          <el-input v-model.number="_formData.percent" type="number" />
        </el-form-item>
        <p style="position: absolute; top: 23px; right: 10px">%</p>
      </div>
      <el-form-item :label="t('installments.fields.max_initial_fee')" prop="max_initial_fee">
        <el-input v-model="_formData.max_initial_fee" clearable type="number" />
      </el-form-item>
      <el-form-item :label="t('installments.fields.type')" prop="is_annual">
        <el-select v-model="_formData.is_annual">
          <el-option
            v-for="tariffType of TARIFF_TYPES"
            :key="tariffType[1].label"
            :label="$t(tariffType[1].label)"
            :value="tariffType[1].value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('installments.fields.min_period')" prop="min_period">
        <el-input v-model="_formData.min_period" clearable type="number" />
      </el-form-item>
      <el-form-item :label="t('installments.fields.min_amount')" prop="min_amount">
        <el-input v-model="_formData.min_amount" clearable type="number" />
      </el-form-item>
      <el-form-item :label="t('installments.fields.max_period')" prop="max_initial_fee">
        <el-input v-model="_formData.max_period" clearable type="number" />
      </el-form-item>
      <el-form-item :label="t('installments.fields.max_amount')" prop="max_amount">
        <el-input v-model="_formData.max_amount" clearable type="number" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="large" @click="close">{{ $t('buttons.cancel') }}</el-button>
      <el-button size="large" type="primary" @click="submit">{{ $t('buttons.save') }}</el-button>
    </template>
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
