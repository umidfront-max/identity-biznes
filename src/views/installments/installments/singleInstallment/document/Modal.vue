<script lang="ts" setup>
import { type FormInstance } from 'element-plus'
import { createDocument_API } from '~/src/services/instalment'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emit = defineEmits(['update'])
const _title = ref('')
const _visible = ref(false)
const _formRef = ref<FormInstance>()

const $baseMessage = inject<any>('$baseMessage')

// const router = useRouter()
const route = useRoute()
const _item = ref<any>({
  file: '',
  name: '',
})

function open() {
  _title.value = t('installments.fields.document')
  _visible.value = true
}

function close() {
  emit('update')
  reset()
}

function reset() {
  _formRef.value?.resetFields()
  _item.value.file = ''
  _item.value.name = ''
  _visible.value = false
}
function handleDocument(e: any) {
  console.log('e.target.files[0]', e.target.files[0])

  _item.value.file = e.target.files[0]
}
async function submit() {
  // _formRef.value?.validate(async (valid: boolean) => {
  //   if (valid) {
  const [error] = await createDocument_API(_item.value.file, Number(route.query.id))
  if (error) return

  $baseMessage(t(`installments.document.created`), 'success', 'hey')
  close()
  //   }
  // });
}

defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="_visible" append-to-body draggable :title="_title" width="500px" @close="close">
    <el-form ref="_formRef" label-position="top" label-width="160px">
      <el-form-item label="Nomlanishi">
        <el-input v-model="_item.name" type="text" @change="handleDocument" />
      </el-form-item>
      <div style="position: relative">
        <el-form-item style="z-index: 12">
          <el-input v-model="_item.file.name" type="text" @change="handleDocument" />
        </el-form-item>
        <div class="document-upload">
          <img alt="" src="../../../../../assets/doc.svg" />
          <input class="input-file" type="file" @change="handleDocument" />
        </div>
      </div>
    </el-form>
    <template #footer>
      <el-button @click="close">{{ $t('buttons.cancel') }}</el-button>
      <el-button type="primary" @click="submit">{{ $t('buttons.save') }}</el-button>
    </template>
  </el-dialog>
</template>
<style lang="scss">
.document-upload {
  position: absolute;
  top: 0px;
  z-index: 0;
  width: 100%;
  height: 32px;
  padding: 4px 12px;
  .input-file {
    position: absolute;
    top: 0px;
    left: 0;
    z-index: -10;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>
