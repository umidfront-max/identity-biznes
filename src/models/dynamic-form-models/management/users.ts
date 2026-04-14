import { ElInput, FormRules } from 'element-plus'
import { useUsersStore } from '/@/store/crud/management/users-store'
import VabRadio from '/@/components/form-components/VabRadio/index.vue'
import DynamicFormModelConfig, { FORM_TYPE_ON_MODAL } from '/@/config/dynamic-form-model.config.ts'

const store = useUsersStore()

export default class Users extends DynamicFormModelConfig {
  store = store
  redirectPath = 'users'
  formTitle = 'User'
  formType = FORM_TYPE_ON_MODAL

  fields = {
    username: {
      label: 'User name',
      component: ElInput,
      colOptions: {
        span: 24,
      },
    },
    first_name: {
      label: 'First name',
      component: ElInput,
      colOptions: {
        span: 12,
      },
    },
    last_name: {
      label: 'Last name',
      component: ElInput,
      colOptions: {
        span: 12,
      },
    },
    password: {
      label: 'Password',
      component: ElInput,
      colOptions: {
        span: 12,
      },
      type: 'password',
    },
    password_confirmation: {
      label: 'Confirm Password',
      component: ElInput,
      colOptions: {
        span: 12,
      },
      type: 'password',
    },
    status: {
      label: 'Active',
      component: VabRadio,
      colOptions: {
        span: 24,
      },
      items: [
        {
          label: 'Active',
          value: 1,
        },

        {
          label: 'InActive',
          value: 0,
        },
      ],
    },
  }

  validatePassword = (rule: any, value: any, callback: any) => {
    if (value !== this.store.formData.password) {
      callback(new Error('The passwords do not match'))
    } else {
      callback()
    }
  }

  rules = reactive<FormRules>({
    username: [{ required: true, message: `${this.fields.username.label} is required`, trigger: 'blur' }],
    password_confirmation: [
      { validator: this.validatePassword, trigger: 'blur' },
      {
        min: 8,
        message: 'Password must be more than 8 characters',
        trigger: 'blur',
      },
    ],
    password: [
      { validator: this.validatePassword, trigger: 'blur' },
      {
        min: 8,
        message: 'Password must be more than 8 characters',
        trigger: 'blur',
      },
    ],
  })
}
