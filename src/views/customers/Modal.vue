<script lang="ts" setup>
import { type FormInstance } from 'element-plus'
import { CustomerPassportInfoModel, updateCustomer_API, getCustomerPassportInfo_DEFAULT } from '~/src/services/customer'
import { GENDER_TYPE } from '~/src/services/customer'
import { rules } from '../customers/rules'
const { t } = useI18n()

const emit = defineEmits(['update'])
const _title = ref('')
const _visible = ref(false)
const _formRef = ref<FormInstance>()
const _customerPassportInfoStore = ref(getCustomerPassportInfo_DEFAULT())
const $baseMessage = inject<any>('$baseMessage')

function open(item: CustomerPassportInfoModel) {
  _title.value = t('customers.meta.single_title')
  _customerPassportInfoStore.value = { ...item }
  _visible.value = true
}

function close() {
  emit('update')
  reset()
}

function reset() {
  _formRef.value?.resetFields()
  _customerPassportInfoStore.value = getCustomerPassportInfo_DEFAULT()
  _visible.value = false
}

function submit() {
  _formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      const [error] = await updateCustomer_API(_customerPassportInfoStore.value)
      if (error) return
      $baseMessage(t('customers.descriptions.success'), 'success', 'hey')
      close()
    }
  })
}

defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="_visible" append-to-body draggable :title="_title" width="60%" @close="close">
    <div class="pasport">
      <el-form ref="_formRef" label-position="top" :model="_customerPassportInfoStore" :rules="rules">
        <div class="pasport_info_base">
          <el-form-item :label="t('customers.fields.passport_series_number')" prop="passport_series">
            <div style="display: flex; gap: 8px; width: 100%">
              <el-input v-model="_customerPassportInfoStore.passport_series" v-mask="'UU'" placeholder="AA" style="width: 54px" />
              <el-input
                v-model="_customerPassportInfoStore.passport_number"
                v-mask="'#######'"
                :maxlength="7"
                placeholder="0000000"
                style="width: 100%"
              />
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

          <el-form-item :label="t('customers.fields.passport_expiration_date')" prop="passport_expiration_date">
            <el-date-picker
              v-model="_customerPassportInfoStore.passport_expiration_date"
              format="DD-MM-YYYY"
              :placeholder="t('customers.fields.passport_expiration_date')"
              type="date"
              value-format="DD-MM-YYYY"
            />
          </el-form-item>

          <el-form-item :label="t('customers.fields.pinfl')" prop="pinfl">
            <el-input v-model="_customerPassportInfoStore.pinfl" maxlength="14" :placeholder="t('customers.placeholders.enter_pinfl')" />
          </el-form-item>

          <el-form-item :label="t('customers.fields.first_name')" prop="first_name">
            <el-input v-model="_customerPassportInfoStore.first_name" :placeholder="t('customers.placeholders.enter_first_name')" />
          </el-form-item>
          <el-form-item :label="t('customers.fields.last_name')" prop="last_name">
            <el-input v-model="_customerPassportInfoStore.last_name" :placeholder="t('customers.placeholders.enter_last_name')" />
          </el-form-item>
          <el-form-item :label="t('customers.fields.middle_name')">
            <el-input v-model="_customerPassportInfoStore.middle_name" :placeholder="t('customers.placeholders.enter_middle_name')" />
          </el-form-item>
          <el-form-item :label="t('customers.fields.passport_expiration_date')" prop="address.gender">
            <el-select v-model="_customerPassportInfoStore.gender" :placeholder="t('customers.placeholders.enter_gender')">
              <el-option v-for="item in GENDER_TYPE" :key="item[1].value" :label="item[1].label" :value="item[1].value" />
            </el-select>
          </el-form-item>

          <el-form-item :label="t('customers.fields.dwelling_place')">
            <el-input v-model="_customerPassportInfoStore.birth_place" :placeholder="t('customers.placeholders.enter_dwelling_place')" />
          </el-form-item>
          <el-form-item :label="t('customers.fields.tin')">
            <el-input v-model="_customerPassportInfoStore.tin" maxlength="9" :placeholder="t('customers.placeholders.enter_tin')" />
          </el-form-item>

          <el-form-item :label="t('customers.fields.passport_given_date')" prop="passport_given_date">
            <el-date-picker
              v-model="_customerPassportInfoStore.passport_given_date"
              format="DD-MM-YYYY"
              placeholder="DD-MM-YYYY"
              type="date"
              value-format="DD-MM-YYYY"
            />
          </el-form-item>
          <el-form-item :label="t('customers.fields.passport_citizenship')" prop="passport_citizenship">
            <el-input
              v-model="_customerPassportInfoStore.passport_citizenship"
              :placeholder="t('customers.placeholders.enter_citizenship')"
            />
          </el-form-item>
        </div>
      </el-form>
    </div>
    <template #footer>
      <el-button @click="close">{{ $t('buttons.cancel') }}</el-button>
      <el-button type="primary" @click="submit">{{ $t('buttons.save') }}</el-button>
    </template>
  </el-dialog>
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
  .pasport_info_base {
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
