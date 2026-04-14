import type { FormRules } from 'element-plus'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

const validateMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('management_users.messages.fill_field')))
  } else {
    callback()
  }
}
const validatePasswordMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('management_users.messages.fill_field')))
  } else if (value.length < 8) {
    callback(new Error(t('management_users.messages.character_more_than_7')))
  } else {
    callback()
  }
}

export const rules = ref<FormRules>({
  username: [{ required: true, trigger: 'blur', validator: validateMessage }],
  first_name: [{ required: true, trigger: 'blur', validator: validateMessage }],
  last_name: [{ required: true, trigger: 'blur', validator: validateMessage }],
  status: [{ required: true, trigger: 'blur', validator: validateMessage }],
  password: [
    { required: true, trigger: 'blur', validator: validateMessage },
    { min: 8, trigger: 'blur', validator: validatePasswordMessage },
  ],
  password_confirmation: [
    { required: true, trigger: 'blur', validator: validateMessage },
    { min: 8, trigger: 'blur', validator: validatePasswordMessage },
  ],
})
