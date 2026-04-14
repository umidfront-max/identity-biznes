<script lang="ts" setup>
import { ref } from 'vue'
import { rules } from './rules'
import { PensionInfoRequestModel, createPensionInfo_API, getPensionInfoRequest_DEFAULT } from '/@/services/scoring/pension-info'
import { useI18n } from 'vue-i18n'

import { getDistricts_API, getRegions_API, type DistrictModel, type RegionModel } from '/@/services/info'

const { t } = useI18n()
const _regions = ref<RegionModel[]>([])
const _districts = ref<DistrictModel[]>([])
// const _mahallas = ref<MahallaModel[]>([])

const emit = defineEmits(['refresh-table'])
const $baseMessage = inject<any>('$baseMessage')
const _visible = ref<boolean>(false)
const _formRef = ref<any>()
const _title = ref<string>('')

const _formData = ref<PensionInfoRequestModel>(getPensionInfoRequest_DEFAULT())

function open() {
  _title.value = t('scoring_pension.create_new')
  _visible.value = true
}

function close() {
  reset()
  emit('refresh-table')
}

async function loadRegions() {
  const [error, response] = await getRegions_API()

  if (error) return
  _regions.value = response.data
}

async function loadDistricts(region_id: number) {
  const [error, response] = await getDistricts_API(region_id)

  if (error) return
  _districts.value = response.data
}

function reset() {
  _formRef.value.resetFields()
  _formData.value = getPensionInfoRequest_DEFAULT()
  _visible.value = false
}

function submit() {
  _formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      const data = {
        ..._formData.value,
        phone: Number(_formData.value.phone?.toString()?.split(' ').join('')),
        extra_phone: Number(_formData.value.extra_phone?.toString()?.split(' ').join('')),
      }
      const [error] = await createPensionInfo_API(data)

      if (error) return

      $baseMessage(t('scoring_pension.created_successfully'), 'success', 'hey')
      close()
    }
  })
}

defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="_visible" append-to-body :title="_title" width="600px" @close="close">
    <el-form ref="_formRef" class="form-inline" :inline="true" label-position="top" label-width="200px" :model="_formData" :rules="rules">
      <el-form-item :label="t('scoring_pension.fields.pinfl')" prop="pinfl">
        <el-input v-model.trim="_formData.pinfl" />
      </el-form-item>
      <el-form-item :label="t('scoring_pension.fields.passport_series')" prop="passport_series">
        <el-input v-model="_formData.passport_series" v-mask="'UU'" placeholder="Pasport seriyasi" />
      </el-form-item>
      <el-form-item :label="t('scoring_pension.fields.passport_number')" prop="passport_number">
        <el-input v-model="_formData.passport_number" v-mask="'#######'" :maxlength="7" placeholder="Pasport raqami" />
      </el-form-item>
      <el-form-item :label="t('scoring_pension.fields.passport_given_date')" prop="passport_given_date">
        <el-date-picker
          v-model="_formData.passport_given_date"
          format="DD-MM-YYYY"
          :placeholder="t('scoring_pension.placeholders.birth_date')"
          type="date"
          value-format="DD-MM-YYYY"
        />
      </el-form-item>
      <el-form-item :label="t('scoring_pension.fields.first_name')" prop="first_name">
        <el-input v-model.trim="_formData.first_name" />
      </el-form-item>
      <el-form-item :label="t('scoring_pension.fields.last_name')" prop="last_name">
        <el-input v-model.trim="_formData.last_name" />
      </el-form-item>
      <el-form-item :label="t('scoring_pension.fields.middle_name')" prop="middle_name">
        <el-input v-model.trim="_formData.middle_name" />
      </el-form-item>
      <el-form-item :label="t('scoring_pension.fields.phone')" prop="phone">
        <el-input v-model.trim="_formData.phone" v-mask="'### ## ### ## ##'" :maxlength="16" placeholder="998 XX XXX XX XX" />
      </el-form-item>
      <el-form-item :label="t('scoring_pension.fields.extra_phone')" prop="extra_phone">
        <el-input v-model.trim="_formData.extra_phone" v-mask="'### ## ### ## ##'" :maxlength="16" placeholder="998 XX XXX XX XX" />
      </el-form-item>
      <el-form-item :label="t('scoring_pension.fields.birth_date')" prop="birth_date">
        <el-date-picker
          v-model="_formData.birth_date"
          format="DD-MM-YYYY"
          :placeholder="t('scoring_pension.placeholders.birth_date')"
          type="date"
          value-format="DD-MM-YYYY"
        />
      </el-form-item>
      <el-form-item :label="t('scoring_pension.fields.region_id')" prop="region_id">
        <el-select v-model="_formData.region_id" :placeholder="t('scoring_pension.placeholders.region')" @click="loadRegions">
          <el-option v-for="item in _regions" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>

      <el-form-item :label="t('scoring_pension.fields.district_id')" prop="district_id">
        <el-select
          v-model="_formData.district_id"
          :placeholder="t('scoring_pension.placeholders.district')"
          @click="loadDistricts(_formData?.region_id)"
        >
          <el-option v-for="item in _districts" :key="item.region_id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">{{ $t('buttons.cancel') }}</el-button>
      <el-button type="primary" @click="submit">{{ $t('buttons.save') }}</el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.form-inline {
  .el-input {
    --el-input-width: 240px;
  }
}

.el-form--inline.el-form--label-top {
  justify-content: space-between;
}

.el-form {
  &-item {
    flex-basis: 48%;
    margin-right: 0;
  }
}
</style>
