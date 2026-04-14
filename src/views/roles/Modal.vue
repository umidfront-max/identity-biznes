<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { createRole_API, getRole_DEFAULT, updateRole_API, type RoleModel } from '~/src/services/roles'
import { rules } from './rules'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emit = defineEmits(['update'])
const _title = ref('')
const _visible = ref(false)
const _formRef = ref<FormInstance>()
const _formData = ref<RoleModel>(getRole_DEFAULT())

const $baseMessage = inject<any>('$baseMessage')

function open(item: RoleModel) {
  _title.value = t('management_roles.create_new')
  if (item) {
    _title.value = `Update role: ${item.name}`
    _formData.value = { ...item }
  }

  _visible.value = true
}

function close() {
  reset()
}

function reset() {
  _formRef.value?.resetFields()
  _formData.value = getRole_DEFAULT()
  _visible.value = false
}

function submit() {
  _formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      const handleBranchAPI = _formData.value.id ? updateRole_API : createRole_API
      const [error] = await handleBranchAPI(_formData.value)

      if (error) return

      $baseMessage(`Branch ${_formData.value.id ? 'updated' : 'created'} successfully`, 'success', 'hey')
      close()
      emit('update')
    }
  })
}

defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="_visible" append-to-body draggable :title="_title" width="500px" @close="close">
    <el-form ref="_formRef" label-width="160px" :model="_formData" :rules="rules">
      <el-form-item :label="t('management_roles.fields.name')" prop="name">
        <el-input v-model="_formData.name" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">{{ $t('buttons.cancel') }}</el-button>
      <el-button type="primary" @click="submit">{{ $t('buttons.save') }}</el-button>
    </template>
  </el-dialog>
</template>
