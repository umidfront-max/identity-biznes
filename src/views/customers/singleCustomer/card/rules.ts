import type { FormRules } from 'element-plus'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

const validateNumberMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('customers.messages.fill_field')))
  } else if (value.length < 19) {
    callback(new Error(t('customers.messages.must_be_16_characters')))
  } else {
    callback()
  }
}
const validateExpiryMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('customers.messages.fill_field')))
  } else if (value.length < 5) {
    callback(new Error(t('customers.messages.must_be_4_characters')))
  } else {
    callback()
  }
}
const validatePhoneMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('customers.messages.fill_field')))
  } else if (value.length < 16) {
    callback(new Error(t('customers.messages.must_be_12_characters')))
  } else {
    callback()
  }
}
export const _rules = ref<FormRules>({
  number: [
    { required: true, trigger: 'blur', validator: validateNumberMessage },
    { min: 19, trigger: 'blur', validator: validateNumberMessage },
  ],
  expiry: [
    { required: true, trigger: 'blur', validator: validateExpiryMessage },
    { min: 5, trigger: 'blur', validator: validateExpiryMessage },
  ],
  phone: [
    { required: true, trigger: 'blur', validator: validatePhoneMessage },
    { min: 16, trigger: 'blur', validator: validatePhoneMessage },
  ],
})
