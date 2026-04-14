<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { rules } from './rules'
import { CustomerBasePassportInfoModel, _customerPassportInfoStore, getCustomerPassportInfo_API } from '/@/services/customer'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const ruleFormRef = ref<FormInstance>()
const emit = defineEmits(['next'])
// const router = useRouter()
async function getPassportInfo() {
  const payload: CustomerBasePassportInfoModel = {
    birth_date: _customerPassportInfoStore.value.birth_date,
    passport_number: _customerPassportInfoStore.value.passport_number,
    passport_series: _customerPassportInfoStore.value.passport_series,
  }
  const [error, response] = await getCustomerPassportInfo_API(payload)

  if (error) return
  nextStep()
  if (response.data) {
    _customerPassportInfoStore.value = response.data
  }
}

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
      <div class="pasport_info_1" style="width: 100%; max-width: 540px; margin: auto">
        <el-form-item :label="t('customers.fields.passport_series_number')" prop="passport_series">
          <div style="display: flex; gap: 8px">
            <el-input v-model="_customerPassportInfoStore.passport_series" v-mask="'UU'" placeholder="AA" style="width: 54px" />
            <el-input v-model="_customerPassportInfoStore.passport_number" v-mask="'#######'" :maxlength="7" placeholder="0000000" />
          </div>
        </el-form-item>
        <el-form-item :label="t('customers.fields.birth_date')" prop="birth_date" style="width: 100%">
          <el-date-picker
            v-model="_customerPassportInfoStore.birth_date"
            :default-value="new Date(2000, 0, 1)"
            format="DD-MM-YYYY"
            :placeholder="t('customers.fields.birth_date')"
            type="date"
            value-format="DD-MM-YYYY"
          />
        </el-form-item>
      </div>
      <div>
        <div style="display: flex; justify-content: center; margin-top: 12px">
          <el-button type="primary" @click="getPassportInfo">{{ $t('customers.auto_fill') }}</el-button>
        </div>
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
    gap: 30px;
    align-items: flex-end;
  }
  .el-button {
    height: 44px;
    padding: 12px 32px;
  }
  .el-textarea__inner {
    padding: 12px;
  }
  .pasport_info_1 {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
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
