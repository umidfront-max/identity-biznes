import type { FormRules } from 'element-plus'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

const validateMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('scoring_katm_modal.messages.fill_field')))
  } else {
    callback()
  }
}
const validatePassportMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('scoring_katm_modal.messages.fill_field')))
  } else if (value.length < 10) {
    callback(new Error(t('scoring_katm_modal.messages.enter_passport_series_and_numbers')))
  } else {
    callback()
  }
}

export const rules = ref<FormRules>({
  pinfl: [{ required: true, validator: validateMessage, trigger: 'blur' }],
  passport_series: [{ validator: validatePassportMessage, trigger: 'blur' }],
  passport_number: [{ required: true, validator: validateMessage, trigger: 'blur' }],
  passport_given_date: [{ required: true, validator: validateMessage, trigger: 'blur' }],
  phone: [{ required: true, validator: validateMessage, trigger: 'blur' }],
  first_name: [{ required: true, validator: validateMessage, trigger: 'blur' }],
  last_name: [{ required: true, validator: validateMessage, trigger: 'blur' }],
  middle_name: [{ required: true, validator: validateMessage, trigger: 'blur' }],
  extra_phone: [{ required: true, validator: validateMessage, trigger: 'blur' }],
  status: [{ required: true, validator: validateMessage, trigger: 'blur' }],
  birth_date: [{ required: true, validator: validateMessage, trigger: 'blur' }],
  region_id: [{ required: true, validator: validateMessage, trigger: 'blur' }],
  district_id: [{ required: true, validator: validateMessage, trigger: 'blur' }],
})
