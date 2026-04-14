import { FormRules } from 'element-plus'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

const validateMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('profile.messages.user_required')))
  } else {
    callback()
  }
}

export const rules = ref<FormRules>({
  username: [{ required: true, validator: validateMessage, trigger: 'blur' }],
  password_confirmation: [
    { validator: validatePassword, trigger: 'blur' },
    {
      min: 8,
      validator: validatePassword,
      trigger: 'blur',
    },
  ],
  password: [
    { validator: validatePassword, trigger: 'blur' },
    {
      min: 8,
      validator: validatePassword,
      trigger: 'blur',
    },
  ],
})
function validatePassword(rule: any, value: any, callback: any) {
  if (value.length < 8) {
    callback(new Error(t('profile.messages.must_be_more_8_characters')))
  } else if (value !== rules.value.password) {
    callback(new Error(t('profile.messages.passwords_not_match')))
  } else {
    callback()
  }
}
