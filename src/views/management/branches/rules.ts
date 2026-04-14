import type { FormRules } from 'element-plus'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

const validateNameMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('management_branches.messages.enter_name')))
  } else {
    callback()
  }
}
const validatePercentMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('management_branches.messages.enter_percent')))
  } else {
    callback()
  }
}
const validateMinAmountMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('management_branches.messages.enter_min_amount')))
  } else {
    callback()
  }
}

export const rules = ref<FormRules>({
  name: [{ required: true, trigger: 'blur', validator: validateNameMessage }],
  address: [{ required: true, trigger: 'blur', validator: validatePercentMessage }],
  inn: [
    {
      required: true,
      trigger: 'blur',
      validator: validateMinAmountMessage,
    },
  ],
})
