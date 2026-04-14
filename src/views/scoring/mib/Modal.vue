<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { getMibRequeste_DEFAULT, createMib_API, MibRequestModel } from '/@/services/mib'
import { rules } from './rules'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const emit = defineEmits(['refresh-table'])
const _title = ref('')
const _visible = ref(false)
const _formRef = ref<FormInstance>()
const _formData = ref<MibRequestModel>(getMibRequeste_DEFAULT())

const $baseMessage = inject<any>('$baseMessage')
const _rules = computed(() => rules.value)
function open() {
  _title.value = t('scoring_mib.create_new')
  _visible.value = true
}

function close() {
  reset()
}

function reset() {
  _formRef.value?.resetFields()
  _formData.value = getMibRequeste_DEFAULT()
  _visible.value = false
}

function submit() {
  console.log('valid')
  console.log('_formRef.value', _formRef.value)
  _formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      const item = {
        pinfl: _formData.value.pinfl,
        phone: _formData.value.phone.toString().split(' ').join(''),
      }
      const [error] = await createMib_API(item)
      if (error) return
      $baseMessage(t('scoring_mib.created_successfully'), 'success', 'hey')
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
    <el-form ref="_formRef" label-width="160px" :model="_formData" :rules="_rules">
      <el-form-item :label="t('scoring_mib.fields.pinfl')" prop="pinfl">
        <el-input v-model="_formData.pinfl" clearable :maxlength="14" :placeholder="t('scoring_mib.placeholders.pinfl')" />
      </el-form-item>
      <el-form-item :label="t('scoring_mib.fields.phone')" prop="phone">
        <el-input v-model="_formData.phone" v-mask="'### ## ### ## ##'" clearable :maxlength="16" placeholder="XXX XX XXX XX XX" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">{{ $t('buttons.cancel') }}</el-button>
      <el-button type="primary" @click="submit">{{ $t('buttons.save') }}</el-button>
    </template>
  </el-dialog>
</template>
