import type { FormRules } from 'element-plus'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

const validateMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('customers.messages.fill_field')))
  } else if (value.length < 16) {
    callback(new Error(t('customers.messages.must_be_12_characters')))
  } else if (value.length > 128) {
    callback(new Error(t('customers.messages.must_be_128_characters')))
  } else {
    callback()
  }
}
export const _rules = ref<FormRules>({
  type: [{ required: true, trigger: 'blur', validator: validateMessage }],
  comment: [
    { required: true, trigger: 'blur', validator: validateMessage },
    { max: 128, trigger: 'blur', validator: validateMessage },
  ],
  phone: [
    { required: true, trigger: 'blur', validator: validateMessage },
    { min: 16, trigger: 'blur', validator: validateMessage },
  ],
})
