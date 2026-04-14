<script setup lang="ts">
import type { FormInstance } from 'element-plus'
// import { rules } from './rules'
import TheModal from './Modal.vue'

import { InstalmentRequestModel, _instalmentStore, _creditStore } from '~/src/services/instalment'
import { BranchModel, getBranch_API } from '/@/services/branch'
import { TariffModel, getTariff_API } from '/@/services/tariff'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t
const ruleFormRef = ref<FormInstance>()
const emit = defineEmits(['next', 'prew'])
const _branches = ref<BranchModel[]>([])
const _tariffs = ref<TariffModel[]>([])
const _modalRef = ref()

const validateMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('installments.messages.fill_field')))
  } else {
    callback()
  }
}

const _rules = ref<any>({
  branch_id: [{ required: true, trigger: 'blur', validator: validateMessage }],
  tariff_id: [{ required: true, trigger: 'blur', validator: validateMessage }],
  amount: [
    { required: true, trigger: 'blur', validator: validateMessage },
    {
      min: +_creditStore.value.tariff.min_amount,
      max: +_creditStore.value.tariff.max_amount,
      type: 'number',
      trigger: ['blur', 'change'],
      message: `Miqdori ${+_creditStore.value.tariff.min_amount} dan ${+_creditStore.value.tariff.max_amount} gacha`,
    },
  ],
  period: [
    { required: true, trigger: 'blur', validator: validateMessage },
    {
      min: +_creditStore.value.tariff.min_period,
      max: +_creditStore.value.tariff.max_period,
      type: 'number',
      trigger: ['blur', 'change'],
      message: `Period ${_creditStore.value.tariff.min_period} dan ${_creditStore.value.tariff.max_period} gacha`,
    },
  ],
  initial_fee: [
    { required: true, trigger: 'blur', validator: validateMessage },
    {
      min: +_creditStore.value.tariff.min_initial_fee,
      max: +_creditStore.value.tariff.max_initial_fee,
      type: 'number',
      trigger: ['blur', 'change'],
      message: `Boshlang'ich summa ${_creditStore.value.tariff.min_amount} dan ${_creditStore.value.tariff.max_amount} gacha`,
    },
  ],
  starts_in: [{ required: true, trigger: 'blur', validator: validateMessage }],
})
function changeTariff() {
  _creditStore.value.tariff = _tariffs.value.find((el) => el.id == _instalmentStore.value.tariff_id) as TariffModel

  _rules.value.amount[1].min = +_creditStore.value.tariff.min_amount
  _rules.value.amount[1].max = +_creditStore.value.tariff.max_amount
  _rules.value.amount[1].message = `Miqdori ${+_creditStore.value.tariff.min_amount} dan ${+_creditStore.value.tariff.max_amount} gacha`
  _rules.value.period[1].min = +_creditStore.value.tariff.min_period
  _rules.value.period[1].max = +_creditStore.value.tariff.max_period
  _rules.value.period[1].message = `Period ${_creditStore.value.tariff.min_period} dan ${_creditStore.value.tariff.max_period} gacha`
  _rules.value.initial_fee[1].min = +_creditStore.value.tariff.min_initial_fee
  _rules.value.initial_fee[1].max = +_creditStore.value.tariff.max_initial_fee
  _rules.value.initial_fee[1].message = `Boshlang'ich summa ${_creditStore.value.tariff.min_amount} dan ${_creditStore.value.tariff.max_amount} gacha`
}
function nextStep() {
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      emit('next')
    } else {
      console.log('error submit!', fields)
      console.log('valid', valid)
    }
  })
}
async function loadBranch() {
  const [error, response] = await getBranch_API()
  if (error) return
  _branches.value = response.data
}

function openTariffModal(item: InstalmentRequestModel) {
  _modalRef.value.open(item)
}
async function loadTariff() {
  const [error, response] = await getTariff_API()
  if (error) return
  _tariffs.value = response.data
}
loadBranch()
loadTariff()
</script>

<template>
  <div>
    <the-modal ref="_modalRef" />

    <div class="pasport">
      <el-form ref="ruleFormRef" label-position="top" :model="_instalmentStore" :rules="_rules">
        <div class="pasport_info">
          <el-form-item :label="t('installments.fields.branch')" prop="branch_id">
            <el-select
              v-model="_instalmentStore.branch_id"
              :placeholder="t('installments.fields.branch')"
              @change="_creditStore.branch = _branches.find((el) => el.id == _instalmentStore.branch_id) as BranchModel"
            >
              <el-option v-for="item in _branches" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('installments.fields.tariff')" prop="tariff_id">
            <el-select v-model="_instalmentStore.tariff_id" :placeholder="t('installments.fields.tariff')" @change="changeTariff">
              <el-option v-for="item in _tariffs" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('installments.fields.amount')" prop="amount">
            <el-input v-model.number="_instalmentStore.amount" :placeholder="t('installments.fields.amount')" type="number" />
          </el-form-item>
        </div>
        <div class="pasport_info">
          <el-form-item :label="t('installments.fields.period')" prop="period">
            <el-input v-model.number="_instalmentStore.period" :placeholder="t('installments.fields.period')" type="number" />
          </el-form-item>
          <el-form-item :label="t('installments.fields.intial_fee')" prop="initial_fee">
            <el-input v-model.number="_instalmentStore.initial_fee" :placeholder="t('installments.fields.initial_fee')" type="number" />
          </el-form-item>
          <el-form-item :label="t('installments.fields.starts_in')" prop="starts_in">
            <el-date-picker
              v-model="_instalmentStore.starts_in"
              format="DD-MM-YYYY"
              :placeholder="t('installments.fields.starts_in')"
              type="date"
            />
          </el-form-item>
        </div>

        <div class="pasport_info">
          <el-form-item :label="t('installments.fields.description')">
            <el-input v-model="_instalmentStore.description" :placeholder="t('installments.fields.description')" type="textarea" />
          </el-form-item>
        </div>
        <div class="pasport">
          <el-form-item>
            <el-button style="width: 100%" type="danger" @click="$emit('prew')">{{ $t('buttons.prev') }}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              :disabled="
                !(_instalmentStore.tariff_id && _instalmentStore.amount && _instalmentStore.initial_fee && _instalmentStore.period)
              "
              plain
              type="primary"
              @click="() => openTariffModal(_instalmentStore)"
            >
              {{ $t('installments.get_payment_graphic') }}
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="nextStep">{{ $t('buttons.next') }}</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss">
.pasport {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
  .el-select {
    width: 100% !important;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__wrapper {
    width: 100%;
  }
  .next-btn {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 30px;
    align-items: flex-end;
  }
  .pasport_info {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 16px;
    align-items: flex-end;
  }
  .next {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 30px;
    align-items: flex-end;
  }
}
</style>
