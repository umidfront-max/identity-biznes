import type { FormRules } from 'element-plus'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

const validatePinflMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('scoring_mib.messages.fill_field')))
  } else if (value.length < 14) {
    callback(new Error(t('scoring_mib.messages.must_14_characters')))
  } else {
    callback()
  }
}
const validatePhoneMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('scoring_mib.messages.fill_field')))
  } else if (value.length < 16) {
    callback(new Error(t('scoring_mib.messages.must_12_characters')))
  } else {
    callback()
  }
}

export const rules = ref<FormRules>({
  pinfl: [{ required: true, validator: validatePinflMessage, trigger: 'blur' }],
  phone: [{ required: true, validator: validatePhoneMessage, trigger: 'blur' }],
})
