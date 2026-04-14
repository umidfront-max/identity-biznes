<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { rules } from './rules'
import { GENDER_TYPE, _customerPassportInfoStore } from '/@/services/customer'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const ruleFormRef = ref<FormInstance>()
const emit = defineEmits(['next'])
// const router = useRouter()
// async function getPassportInfo() {
//   const payload: CustomerBasePassportInfoModel = {
//     birth_date: _customerPassportInfoStore.value.birth_date,
//     passport_number: _customerPassportInfoStore.value.passport_number,
//     passport_series: _customerPassportInfoStore.value.passport_series,
//   }
//   const [error, response] = await getCustomerPassportInfo_API(payload)

//   if (error) return
//   if (response.data) {
//     _customerPassportInfoStore.value = response.data
//   }
// }

function nextStep() {
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      // router.push('/customers/setCustomer/contactInfo')
      emit('next')
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<template>
  <div class="pasport">
    <el-form ref="ruleFormRef" label-position="top" :model="_customerPassportInfoStore" :rules="rules">
      <div class="pasport_info">
        <el-form-item :label="t('customers.fields.first_name')" prop="first_name">
          <el-input v-model="_customerPassportInfoStore.first_name" :placeholder="t('customers.placeholders.enter_first_name')" />
        </el-form-item>
        <el-form-item :label="t('customers.fields.last_name')" prop="last_name">
          <el-input v-model="_customerPassportInfoStore.last_name" :placeholder="t('customers.placeholders.enter_last_name')" />
        </el-form-item>
        <el-form-item :label="t('customers.fields.middle_name')">
          <el-input v-model="_customerPassportInfoStore.middle_name" :placeholder="t('customers.placeholders.enter_middle_name')" />
        </el-form-item>
        <el-form-item :label="t('customers.fields.gender')" prop="address.gender">
          <el-select v-model="_customerPassportInfoStore.gender" :placeholder="t('customers.placeholders.enter_gender')">
            <el-option v-for="item in GENDER_TYPE" :key="item[1].value" :label="item[1].label" :value="item[1].value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="t('customers.fields.dwelling_place')">
          <el-input v-model="_customerPassportInfoStore.birth_place" :placeholder="t('customers.fields.enter_dwelling_place')" />
        </el-form-item>
        <el-form-item :label="t('customers.fields.tin')">
          <el-input v-model="_customerPassportInfoStore.tin" maxlength="9" :placeholder="t('customers.placeholders.enter_tin')" />
        </el-form-item>
        <el-form-item :label="t('customers.fields.pinfl')" prop="pinfl">
          <el-input v-model="_customerPassportInfoStore.pinfl" maxlength="14" :placeholder="t('customers.placeholders.enter_pinfl')" />
        </el-form-item>
        <el-form-item :label="t('customers.fields.passport_given_date')" prop="passport_given_date">
          <el-date-picker
            v-model="_customerPassportInfoStore.passport_given_date"
            format="DD-MM-YYYY"
            :placeholder="t('customers.placeholders.enter_passport_given_date')"
            type="date"
            value-format="DD-MM-YYYY"
          />
        </el-form-item>
        <el-form-item :label="t('customers.fields.passport_expiration_date')" prop="passport_expiration_date">
          <el-date-picker
            v-model="_customerPassportInfoStore.passport_expiration_date"
            format="DD-MM-YYYY"
            :placeholder="t('customers.placeholders.enter_passport_expiration_date')"
            type="date"
            value-format="DD-MM-YYYY"
          />
        </el-form-item>
        <el-form-item :label="t('customers.fields.citizenship')" prop="passport_citizenship">
          <el-input
            v-model="_customerPassportInfoStore.passport_citizenship"
            :placeholder="t('customers.placeholders.enter_citizenship')"
          />
        </el-form-item>

        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="nextStep">{{ $t('buttons.next') }}</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<style lang="scss">
.pasport {
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
    column-gap: 30px;
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
