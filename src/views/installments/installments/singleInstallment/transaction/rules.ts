import type { FormRules } from 'element-plus'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

const validateNameMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('installments.placeholders.customer_id')))
  } else {
    callback()
  }
}
const validateTypeMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('installments.placeholders.transaction_type_id')))
  } else {
    callback()
  }
}
const validatePercentMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('installments.placeholders.amount')))
  } else {
    callback()
  }
}

export const _rules = ref<FormRules>({
  customer_id: [{ required: true, trigger: 'blur', validator: validateNameMessage }],
  transaction_type_id: [{ required: true, trigger: 'blur', validator: validateTypeMessage }],
  amount: [{ required: true, trigger: 'blur', validator: validatePercentMessage }],
})
