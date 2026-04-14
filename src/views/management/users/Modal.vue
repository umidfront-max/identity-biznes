<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { rules } from './rules'
import { createUser_API, updateUser_API, userResponse_DEFAULT, type UsersResponseModel } from '/@/services/user'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const statusOption = ref([
  {
    label: t('management_users.active'),
    value: '0',
  },
  {
    label: t('management_users.inactive'),
    value: '1',
  },
])
const emit = defineEmits(['refresh-table'])
const _title = ref('')
const _visible = ref(false)
const _formRef = ref<FormInstance>()
const _formData = ref<UsersResponseModel>(userResponse_DEFAULT())

const $baseMessage = inject<any>('$baseMessage')

function open(item: UsersResponseModel) {
  _title.value = t('management_users.create_new')
  if (item) {
    _title.value = `Update user: ${item.username}`
    _formData.value = { ...item }
  }

  _visible.value = true
}

function close() {
  reset()
}

function reset() {
  _formRef.value?.resetFields()
  _formData.value = userResponse_DEFAULT()
  _visible.value = false
}

function submit() {
  _formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      const handleTariffAPI = _formData.value.id ? updateUser_API : createUser_API
      const [error] = await handleTariffAPI(_formData.value)

      if (error) return

      $baseMessage(`User ${!_formData.value.id ? 'created' : 'updated'} successfully`, 'success', 'hey')
      close()
      emit('refresh-table')
    }
  })
}

defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="_visible" append-to-body draggable :title="_title" width="500px" @close="close">
    <el-form ref="_formRef" class="form_modal" label-position="top" label-width="160px" :model="_formData" :rules="rules">
      <el-form-item :label="t('management_users.fields.username')" prop="username">
        <el-input v-model="_formData.username" clearable />
      </el-form-item>
      <el-form-item :label="t('management_users.fields.first_name')" prop="first_name">
        <el-input v-model="_formData.first_name" clearable />
      </el-form-item>
      <el-form-item :label="t('management_users.fields.last_name')" prop="last_name">
        <el-input v-model="_formData.last_name" clearable />
      </el-form-item>
      <el-form-item :label="t('management_users.fields.status')" prop="status">
        <el-select v-model="_formData.status" placeholder="status">
          <el-option v-for="item in statusOption" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('management_users.fields.password')" prop="password">
        <el-input v-model="_formData.password" clearable />
      </el-form-item>
      <el-form-item :label="t('management_users.fields.password_confirmation')" prop="password_confirmation">
        <el-input v-model="_formData.password_confirmation" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">{{ $t('buttons.cancel') }}</el-button>
      <el-button type="primary" @click="submit">{{ $t('buttons.save') }}</el-button>
    </template>
  </el-dialog>
</template>
<style lang="scss">
.form_modal {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 30px;
}
</style>
