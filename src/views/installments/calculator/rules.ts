import type { FormRules } from 'element-plus'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

const validateMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('installments.messages.fill_field')))
  } else {
    callback()
  }
}
export const rules = ref<FormRules>({
  tariff_id: [{ required: true, trigger: 'blur', validator: validateMessage }],
  amount: [{ required: true, trigger: 'blur', validator: validateMessage }],
  initial_amount: [{ required: true, trigger: 'blur', validator: validateMessage }],
  period: [{ required: true, trigger: 'blur', validator: validateMessage }],
})
