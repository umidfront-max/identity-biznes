<template>
  <el-dialog v-model="dialogFormVisible" append-to-body draggable :title="title" width="500px" @close="close">
    <el-form ref="formRef" label-width="160px" :model="form" :rules="rules">
      <el-form-item :label="t('management_branches.fields.name')" prop="name">
        <el-input v-model="form.name" clearable />
      </el-form-item>
      <el-form-item :label="t('management_branches.fields.address')" prop="address">
        <el-input v-model="form.address" clearable />
      </el-form-item>
      <el-form-item :label="t('management_branches.fields.inn')" prop="inn">
        <el-input v-model="form.inn" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">{{ $t('buttons.cancel') }}</el-button>
      <el-button type="primary" @click="save">{{ $t('buttons.save') }}</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { BranchRequestDTO } from '/@/api/branches/dto/branchesDTO'
import { createBranch, updateBranch } from '/@/api/branches/branches'
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'BranchesFormRef',
})

const { t } = useI18n()
const emit = defineEmits(['refresh-table'])
const $baseMessage = inject<any>('$baseMessage')
const formRef = ref<any>(null)
const title = ref<string>('')
const dialogFormVisible = ref<boolean>(false)
const formDefaultValues = {
  id: null,
  name: '',
  address: '',
  inn: 0,
}
let form = reactive<BranchRequestDTO | Omit<BranchRequestDTO, 'id'>>(formDefaultValues)
const rules = reactive<any>({
  name: [{ required: true, trigger: 'blur', message: t('management_branches.messages.enter_name') }],
  address: [{ required: true, trigger: 'blur', message: t('management_branches.messages.enter_percent') }],
  inn: [
    {
      required: true,
      trigger: 'blur',
      message: t('management_branches.messages.enter_min_amount'),
    },
  ],
})

const showEdit = (row: BranchRequestDTO) => {
  if (!row) {
    title.value = t('management_branches.create_new')
    form = reactive<Omit<BranchRequestDTO, 'id'>>(formDefaultValues)
  } else {
    title.value = `Update branch: ${row.name}`
    form = reactive<BranchRequestDTO>({ ...row })
  }
  dialogFormVisible.value = true
}

defineExpose({
  showEdit,
})

const close = () => {
  formRef.value.resetFields()
  emit('refresh-table')
  dialogFormVisible.value = false
}

const save = () => {
  formRef.value.validate(async (valid: any) => {
    if (valid) {
      let data
      if ((form as BranchRequestDTO).id) {
        data = await updateBranch((form as BranchRequestDTO).id as number, form)
      } else {
        data = await createBranch(form as BranchRequestDTO)
      }

      if (data.success) {
        $baseMessage(`Branch ${(form as BranchRequestDTO).id ? 'created' : 'updated'} successfully`, 'success', 'hey')
        close()
      }
    }
  })
}
</script>
