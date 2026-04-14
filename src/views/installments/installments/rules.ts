import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

const validatePassportSeriesMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('installments.messages.fill_field')))
  } else {
    callback()
  }
}
const validatePassportNumberMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('installments.messages.fill_field')))
  } else if (value.length < 7) {
    callback(new Error(t('installments.messages.min_7_symbols')))
  } else {
    callback()
  }
}
const validatePinflMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('installments.messages.fill_field')))
  } else if (value.length < 14) {
    callback(new Error(t('installments.messages.min_14_symbols')))
  } else {
    callback()
  }
}

export const rulesPassportInfo = reactive<any>({
  passport_series: [{ required: true, trigger: 'blur', validator: validatePassportSeriesMessage }],
  passport_number: [
    { required: true, trigger: 'blur', validator: validatePassportNumberMessage },
    {
      min: 7,
      trigger: 'blur',
      validator: validatePassportNumberMessage,
    },
  ],
  pinfl: [
    { required: true, trigger: 'blur', validator: validatePinflMessage },
    {
      min: 14,
      trigger: 'blur',
      validator: validatePinflMessage,
    },
  ],
})
