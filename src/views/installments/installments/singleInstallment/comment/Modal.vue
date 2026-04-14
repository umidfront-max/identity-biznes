<script lang="ts" setup>
import { type FormInstance } from 'element-plus'
import { CommentsModel, getCommentsModel_DEFAULT, createComment_API, updateComment_API } from '~/src/services/instalment'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emit = defineEmits(['update'])
const _title = ref('')
const _visible = ref(false)
const _formRef = ref<FormInstance>()

const $baseMessage = inject<any>('$baseMessage')

// const router = useRouter()
const route = useRoute()
const _item = ref<CommentsModel>(getCommentsModel_DEFAULT())

function open(item?: CommentsModel) {
  _title.value = t('installments.fields.comment')
  _visible.value = true
  if (item?.comment) {
    _title.value = `Update Comment: ${item.comment}`
    _item.value = { ...item }
  }
}

function close() {
  emit('update')
  reset()
}

function reset() {
  _formRef.value?.resetFields()
  _item.value = getCommentsModel_DEFAULT()
  _visible.value = false
}

function submit() {
  _formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      const handleCommentAPI = _item.value.creator_id ? updateComment_API : createComment_API

      const [error] = await handleCommentAPI(_item.value, route.query.id as string)
      if (error) return

      $baseMessage(t('installments.comment_created'), 'success', 'hey')
      close()
    }
  })
}

defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="_visible" append-to-body draggable :title="_title" width="500px" @close="close">
    <el-form ref="_formRef" label-position="top" label-width="160px" :model="_item">
      <el-form-item class="textarea" :label="t('installments.fields.comment')">
        <el-input v-model="_item.comment" maxlength="128" :rows="5" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">{{ $t('buttons.cancel') }}</el-button>
      <el-button type="primary" @click="submit">{{ $t('buttons.save') }}</el-button>
    </template>
  </el-dialog>
</template>
<style lang="scss"></style>
