import type { FormRules } from 'element-plus'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

const validateMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('scoring_pension.messages.fill_field')))
  } else {
    callback()
  }
}

export const rules = ref<FormRules>({
  pinfl: [{ required: true, trigger: 'blur', validator: validateMessage }],
  passport_series: [{ required: true, trigger: 'blur', validator: validateMessage }],
  passport_number: [{ required: true, trigger: 'blur', validator: validateMessage }],
  passport_given_date: [{ required: true, trigger: 'blur', validator: validateMessage }],
  phone: [{ required: true, trigger: 'blur', validator: validateMessage }],
  first_name: [{ required: true, trigger: 'blur', validator: validateMessage }],
  last_name: [{ required: true, trigger: 'blur', validator: validateMessage }],
  middle_name: [{ required: true, trigger: 'blur', validator: validateMessage }],
  extra_phone: [{ required: true, trigger: 'blur', validator: validateMessage }],
  status: [{ required: true, trigger: 'blur', validator: validateMessage }],
  birth_date: [{ required: true, trigger: 'blur', validator: validateMessage }],
  region_id: [{ required: true, trigger: 'blur', validator: validateMessage }],
  district_id: [{ required: true, trigger: 'blur', validator: validateMessage }],
})
