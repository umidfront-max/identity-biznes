<script lang="ts" setup>
import { createGuarantor_API, _byPasportStore, getByPasport_DEFAULT } from '~/src/services/instalment'
import PasportInfo from '/@/views/installments/installments/pasportInfo.vue'
import { _customerFullInfoStore, getCustomerFullRequestInfo_DEFAULT } from '/@/services/customer'

const emit = defineEmits(['update'])
const _title = ref('')
const _visible = ref(false)

const $baseMessage = inject<any>('$baseMessage')

// const router = useRouter()
const route = useRoute()
const _item = ref<string>('')

function open(item: string) {
  _title.value = "Kafil qo'shish"
  _visible.value = true
  _item.value = item
}

function close() {
  emit('update')
  _customerFullInfoStore.value = getCustomerFullRequestInfo_DEFAULT()
  _byPasportStore.value = getByPasport_DEFAULT()
  reset()
}

function reset() {
  _item.value = ''
  _visible.value = false
}

async function submit() {
  const [error] = await createGuarantor_API(_customerFullInfoStore.value.id, Number(route.query.id))
  if (error) return

  $baseMessage(`comment creted successfully`, 'success', 'hey')
  close()
}

defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="_visible" append-to-body draggable :title="_title" width="90%" @close="close">
    <pasport-info :is-next="false" />
    <template #footer>
      <el-button @click="close">Cancel</el-button>
      <el-button type="primary" @click="submit">Save</el-button>
    </template>
  </el-dialog>
</template>
<style lang="scss"></style>
