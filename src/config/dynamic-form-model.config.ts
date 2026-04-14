import { Store } from 'pinia'
import { inject } from 'vue'
import router from '/@/router'

export const FORM_TYPE_ON_PAGE = 'page'
export const FORM_TYPE_ON_MODAL = 'modal'

export default abstract class DynamicFormModelConfig {
  $baseConfirm = inject<any>('$baseConfirm')
  $baseMessage = inject<any>('$baseMessage')

  ACTION_DELETE = 'delete'
  ACTION_UPDATE = 'update'
  ACTION_CREATE = 'create'
  ACTION_GET = 'get'

  formRef = ref<any>(null)
  loading = ref(false)
  submitButtonText = ref('Save')
  cancelButtonText = ref('Cancel')
  abstract rules: any
  abstract formType: string
  abstract formTitle: string
  abstract store: Store | any
  abstract redirectPath: string
  abstract fields: { [key: string]: FieldType }

  submit = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.formRef.value.validate((valid: any) => {
        if (valid) {
          this.loading.value = true

          this.store
            .createOrUpdate()
            .then((value: any) => {
              if (value.success) {
                this.$baseMessage(`Successfully ${this.store.formData.id ? 'Updated' : 'Created'}`, 'success', 'hey')
                this.redirectByType()
                resolve(value)
              } else {
                reject(value)
                this.$baseMessage(value.message, 'warning', 'hey')
              }
            })
            .catch((reason: any) => {
              console.log(reason)
            })
            .finally(() => {
              this.loading.value = false
            })
        } else {
          this.$baseMessage('Check Form fields', 'warning', 'hey')
          reject('Form validation failed') // Reject the promise here
        }
      })
    })
  }

  setFormData = (data: any) => {
    this.store.$patch((state: any) => {
      state.formData = data
    })
  }

  resetFormData = () => {
    this.setFormData({ ...this.store.initialFormData })
  }

  cancel = (): void => {
    this.resetFormData()
    this.redirectByType()
  }

  redirectByType = (): void => {
    if (this.formType === FORM_TYPE_ON_PAGE) {
      router.push({ name: this.redirectPath })
    }
  }

  formData: any = computed({
    get: () => {
      return this.store.formData
    },
    set: (newValue) => {
      this.store.$patch({ formData: newValue })
    },
  })
}
