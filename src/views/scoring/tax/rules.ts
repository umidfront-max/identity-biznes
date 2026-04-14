import type { FormRules } from 'element-plus'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

const validateMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('scoring_tax.messages.fill_field')))
  } else {
    callback()
  }
}

const validatePinflMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('scoring_tax.messages.fill_field')))
  } else if (value.length < 14) {
    callback(new Error(t('scoring_tax.messages.must_be_14_characters')))
  } else {
    callback()
  }
}

export const rules = ref<FormRules>({
  pinfl: [
    { required: true, trigger: 'blur', validator: validateMessage },
    { min: 14, required: true, trigger: 'blur', validator: validatePinflMessage },
  ],
})
