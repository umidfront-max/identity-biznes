<template>
  <el-dialog
    v-model="dialogFormVisible"
    append-to-body
    class="vab-table-form-dialog"
    draggable
    :title="modalTitle"
    :width="dialogWidth ?? '500px'"
    @close="close"
  >
    <div v-loading="isFetchingItem">
      <vab-dynamic-form :form-model="formModel" @on-close="close" @on-success="onSuccess" />
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import DynamicFormModelConfig from '/@/config/dynamic-form-model.config.ts'
defineOptions({ name: 'VabTableFormDialog' })

const { formModel } = defineProps<{
  formModel: DynamicFormModelConfig
  isFetchingItem: boolean
  modalTitle: string
  dialogWidth?: string
}>()

const emit = defineEmits(['fetch-data'])
const dialogFormVisible = ref<boolean>(false)

const openFormModal = () => {
  dialogFormVisible.value = true
}

defineExpose({
  openFormModal,
})

const close = () => {
  formModel.resetFormData()
  formModel.formRef.value.resetFields()
  dialogFormVisible.value = false
}

const onSuccess = () => {
  emit('fetch-data')
  close()
}
</script>
<style lang="scss">
.vab-table-form-dialog {
  .el-dialog__body {
    padding: 15px 15px 25px 15px !important;
  }

  .el-card {
    margin: 0;
  }
}
</style>
