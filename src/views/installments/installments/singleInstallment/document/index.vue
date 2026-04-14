<script lang="ts" setup>
import TheModal from './Modal.vue'
const _modalRef = ref()
const emit = defineEmits(['update'])
function openDocumentModal(item?: any) {
  _modalRef.value.open(item)
}
</script>
<template>
  <div>
    <the-modal ref="_modalRef" @update="emit('update')" />
    <el-button type="primary" @click="openDocumentModal">{{ $t('installments.add_document') }}</el-button>
    <div>Document</div>
  </div>
</template>

<style></style>
