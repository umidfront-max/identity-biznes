import type { FormRules } from 'element-plus'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

const validateMessage = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('profile.messages.fill_field')))
  } else {
    callback()
  }
}

export const rules = ref<FormRules>({
  layout_name: [{ required: true, trigger: 'blur', validator: validateMessage }],
  theme_name: [{ required: true, trigger: 'blur', validator: validateMessage }],
  menu_width: [{ required: true, trigger: 'blur', validator: validateMessage }],
  column_style: [{ required: true, trigger: 'blur', validator: validateMessage }],
  color: [{ required: true, trigger: 'blur', validator: validateMessage }],
  is_follow: [{ required: true, trigger: 'blur', validator: validateMessage }],
  fixed_header: [{ required: true, trigger: 'blur', validator: validateMessage }],
  fold_sidebar: [{ required: true, trigger: 'blur', validator: validateMessage }],
  show_progress_bar: [{ required: true, trigger: 'blur', validator: validateMessage }],
  show_footer: [{ required: true, trigger: 'blur', validator: validateMessage }],
  show_tabs: [{ required: true, trigger: 'blur', validator: validateMessage }],
  page_transition_style: [{ required: true, trigger: 'blur', validator: validateMessage }],
  radius: [{ required: true, trigger: 'blur', validator: validateMessage }],
  show_lock: [{ required: true, trigger: 'blur', validator: validateMessage }],
  background: [{ required: true, trigger: 'blur', validator: validateMessage }],
  passcode: [{ required: true, trigger: 'blur', validator: validateMessage }],
})
