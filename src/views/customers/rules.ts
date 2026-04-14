import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

const validateMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('customers.messages.fill_field')))
  } else if (value.length > 32) {
    callback(new Error(t('customers.messages.max_32_symbols')))
  } else {
    callback()
  }
}

export const rules = reactive<any>({
  passport_series: [{ required: true, trigger: 'blur', validator: validateMessage }],
  passport_number: [{ required: true, trigger: 'blur', validator: validateMessage }],
  birth_date: [{ required: true, trigger: 'blur', validator: validateMessage }],
  period: [{ required: true, trigger: 'blur', validator: validateMessage }],
  pinfl: [{ required: true, trigger: 'blur', validator: validateMessage }],
  tin: [{ required: true, trigger: 'blur', validator: validateMessage }],
  first_name: [
    { required: true, trigger: 'blur', validator: validateMessage },
    { max: 32, trigger: 'blur', validator: validateMessage },
  ],
  middle_name: [
    { required: true, trigger: 'blur', validator: validateMessage },
    { max: 32, trigger: 'blur', validator: validateMessage },
  ],
  last_name: [
    { required: true, trigger: 'blur', validator: validateMessage },
    { max: 32, trigger: 'blur', validator: validateMessage },
  ],
  birth_place: [{ required: true, trigger: 'blur', validator: validateMessage }],
  passport_citizenship: [{ max: 32, trigger: 'blur', validator: validateMessage }],
  passport_given_date: [{ required: true, trigger: 'blur', validator: validateMessage }],
  passport_expiration_date: [{ required: true, trigger: 'blur', validator: validateMessage }],
  passport_given_place: [{ required: true, trigger: 'blur', validator: validateMessage }],
  address: {
    region_id: [{ required: true, trigger: 'blur', validator: validateMessage }],
    district_id: [{ required: true, trigger: 'blur', validator: validateMessage }],
    mahalla_id: [{ required: true, trigger: 'blur', validator: validateMessage }],
  },
})
