import type { FormRules } from 'element-plus'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

const validateMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('scoring_uzcard.messages.fill_field')))
  } else {
    callback()
  }
}

export const rules = ref<FormRules>({
  expiry: [{ required: true, trigger: 'blur', validator: validateMessage }],
  number: [{ required: true, trigger: 'blur', validator: validateMessage }],
})
