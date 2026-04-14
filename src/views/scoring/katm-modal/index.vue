<script lang="ts" setup>
import { ref } from 'vue'
import { rules } from './rules'

import {
  getDistricts_API,
  getRegions_API,
  type DistrictModel,
  type RegionModel,
  PassportInfoRequestModel,
  getPasswordInfoResponse_DEFAULT,
  PasswordInfoResponseModel,
  getCustomerPassportInfo_API,
} from '/@/services/info'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const _regions = ref<RegionModel[]>([])
const _districts = ref<DistrictModel[]>([])

const emit = defineEmits(['refresh-table'])
const _visible = ref<boolean>(false)
const _formRef = ref<any>()

const _formData = ref<PasswordInfoResponseModel>(getPasswordInfoResponse_DEFAULT())
function open() {
  _visible.value = true
}

function close() {
  reset()
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
  _formData.value = getPasswordInfoResponse_DEFAULT()
  _visible.value = false
}

function submit() {
  _formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      const data = {
        ..._formData.value,
        phone: Number(_formData.value.phone?.toString()?.split(' ').join('')),
        extra_phone: Number(_formData.value.extra_phone?.toString()?.split(' ').join('')),
        passport_number: _formData.value.passport_series?.split(' ')[1],
        passport_series: _formData.value.passport_series?.split(' ')[0],
      }
      emit('refresh-table', data)
      setTimeout(() => close(), 500)
    }
  })
}
async function getPassportInfo() {
  const payload: PassportInfoRequestModel = {
    birth_date: _formData.value.birth_date as Date,
    passport_number: _formData.value.passport_series?.split(' ')[1],
    passport_series: _formData.value.passport_series?.split(' ')[0],
  }
  const [error, response] = await getCustomerPassportInfo_API(payload)
  if (error) return
  if (response.data) {
    _formData.value = {
      pinfl: response.data.pinfl,
      region_id: response.data.address.region_id,
      district_id: response.data.address.district_id,
      passport_series: `${response.data.passport_series}${response.data.passport_number}`,
      passport_number: response.data.passport_number,
      birth_date: response.data.birth_date,
      passport_given_date: response.data.passport_given_date,
      first_name: response.data.first_name,
      last_name: response.data.last_name,
      middle_name: response.data.middle_name,
      phone: null,
      extra_phone: null,
    }
    loadRegions()
    loadDistricts(+response.data.address.region_id)
  }
}

defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="_visible" append-to-body width="800px" @close="close">
    <el-form
      ref="_formRef"
      class="form-inline-grid"
      :inline="true"
      label-position="top"
      label-width="200px"
      :model="_formData"
      :rules="rules"
    >
      <div>
        <el-form-item :label="t('scoring_katm_modal.fields.passport_series')" prop="passport_series">
          <el-input v-model="_formData.passport_series" v-mask="'UU #######'" maxlength="10" placeholder="XX #######" />
        </el-form-item>
      </div>
      <el-form-item :label="t('scoring_katm_modal.fields.birth_date')" prop="birth_date">
        <el-date-picker
          v-model="_formData.birth_date"
          format="DD-MM-YYYY"
          :placeholder="t('scoring_katm_modal.placeholders.birth_date')"
          type="date"
          value-format="DD-MM-YYYY"
        />
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" type="primary" @click="getPassportInfo">{{ $t('scoring_katm_modal.avto_fill') }}</el-button>
      </el-form-item>
      <el-form-item :label="t('scoring_katm_modal.fields.pinfl')" prop="pinfl">
        <el-input v-model.trim="_formData.pinfl" />
      </el-form-item>

      <el-form-item :label="t('scoring_katm_modal.fields.passport_given_date')" prop="passport_given_date">
        <el-date-picker
          v-model="_formData.passport_given_date"
          format="DD-MM-YYYY"
          :placeholder="t('scoring_katm_modal.placeholders.birth_date')"
          type="date"
          value-format="DD-MM-YYYY"
        />
      </el-form-item>
      <el-form-item :label="t('scoring_katm_modal.fields.first_name')" prop="first_name">
        <el-input v-model.trim="_formData.first_name" />
      </el-form-item>
      <el-form-item :label="t('scoring_katm_modal.fields.last_name')" prop="last_name">
        <el-input v-model.trim="_formData.last_name" />
      </el-form-item>
      <el-form-item :label="t('scoring_katm_modal.fields.middle_name')">
        <el-input v-model.trim="_formData.middle_name" />
      </el-form-item>
      <el-form-item :label="t('scoring_katm_modal.fields.phone')" prop="phone">
        <el-input v-model.trim="_formData.phone" v-mask="'### ## ### ## ##'" :maxlength="16" placeholder="998 XX XXX XX XX" />
      </el-form-item>
      <el-form-item :label="t('scoring_katm_modal.fields.extra_phone')" prop="extra_phone">
        <el-input v-model.trim="_formData.extra_phone" v-mask="'### ## ### ## ##'" :maxlength="16" placeholder="998 XX XXX XX XX" />
      </el-form-item>

      <el-form-item :label="t('scoring_katm_modal.fields.region_id')" prop="region_id">
        <el-select
          v-model="_formData.region_id"
          :placeholder="t('scoring_katm_modal.placeholders.region')"
          style="width: 100%"
          @click="loadRegions"
        >
          <el-option v-for="item in _regions" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>

      <el-form-item :label="t('scoring_katm_modal.fields.district_id')" prop="district_id">
        <el-select
          v-model="_formData.district_id"
          :placeholder="t('scoring_katm_modal.placeholders.district')"
          style="width: 100%"
          @click="loadDistricts(+_formData.region_id)"
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
.form-inline-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 30px;
  align-items: flex-end;
  .form-flex {
    display: flex;
    gap: 20px;
  }
  .text-required::before {
    margin-right: 4px;
    color: red;
    content: '*';
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
