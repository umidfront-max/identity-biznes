import type { FormRules } from 'element-plus'
import { isPassword } from '/@/utils/validate'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

const validateUsername = (rule: any, value: any, callback: any) => {
  if ('' === value) callback(new Error(t('login.messages.user_name_cannot_be_empty')))
  else callback()
}
const validatePassword = (rule: any, value: any, callback: any) => {
  if (!isPassword(value)) callback(new Error(t('login.messages.password_cannot_be_less_than_6_digits')))
  else callback()
}

export const rules = ref<FormRules>({
  username: [
    {
      required: true,
      trigger: 'blur',
      validator: validateUsername,
    },
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword,
    },
  ],
})
