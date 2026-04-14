import type { FormRules } from 'element-plus'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

const validateNameMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('installments.placeholders.enter_name')))
  } else {
    callback()
  }
}
const validateTypeMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('installments.placeholders.select_type')))
  } else {
    callback()
  }
}
const validatePercentMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('installments.placeholders.enter_percent')))
  } else {
    callback()
  }
}
const validateMinAmountMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('installments.placeholders.enter_min_amount')))
  } else {
    callback()
  }
}
const validateMaxAmountMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('installments.placeholders.enter_max_amount')))
  } else {
    callback()
  }
}
const validateMinInitialFeeMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('installments.placeholders.enter_min_initial_fee')))
  } else {
    callback()
  }
}
const validateMaxInitialFeeMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('installments.placeholders.enter_max_initial_fee')))
  } else {
    callback()
  }
}
export const _rules = ref<FormRules>({
  name: [{ required: true, trigger: 'blur', validator: validateNameMessage }],
  is_annual: [{ required: true, trigger: 'blur', validator: validateTypeMessage }],
  percent: [{ required: true, trigger: 'blur', validator: validatePercentMessage }],
  min_amount: [{ required: true, trigger: 'blur', validator: validateMinAmountMessage }],
  max_amount: [{ required: true, trigger: 'blur', validator: validateMaxAmountMessage }],
  min_initial_fee: [{ required: true, trigger: 'blur', validator: validateMinInitialFeeMessage }],
  max_initial_fee: [{ required: true, trigger: 'blur', validator: validateMaxInitialFeeMessage }],
})
