<script lang="ts" setup>
import { type FormInstance } from 'element-plus'
import { _rules } from './rules'
import { createPhone_API, CustomerContactPhoneModel, getCustomerContactPhone_DEFAULT, PHONE_TYPES } from '~/src/services/customer'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const emit = defineEmits(['update'])
const _title = ref('')
const _visible = ref(false)
const _formRef = ref<FormInstance>()

const $baseMessage = inject<any>('$baseMessage')

// const router = useRouter()
const route = useRoute()
const _item = ref<CustomerContactPhoneModel>(getCustomerContactPhone_DEFAULT())

function open() {
  _title.value = t('customers.card')
  _visible.value = true
}

function close() {
  emit('update')
  reset()
}

function reset() {
  _formRef.value?.resetFields()
  _item.value = getCustomerContactPhone_DEFAULT()
  _visible.value = false
}

function submit() {
  _formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      _item.value.phone = _item.value.phone.split(' ').join('')
      const [error] = await createPhone_API(_item.value, route.query.id as string)
      if (error) return

      $baseMessage(t('customers.phone_created'), 'success', 'hey')
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
    <el-form ref="_formRef" label-position="top" label-width="160px" :model="_item" :rules="_rules">
      <div class="phone-grid">
        <el-form-item :label="t('customers.fields.type')" prop="type">
          <el-select v-model="_item.type" :placeholder="t('customers.fields.type')">
            <el-option v-for="item in PHONE_TYPES" :key="item[1].value" :label="item[1].label" :value="item[1].value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="t('customers.fields.phone')" prop="phone">
          <el-input v-model="_item.phone" v-mask="'### ## ### ## ##'" maxlength="16" placeholder="998 ## ### ## ##" />
        </el-form-item>
      </div>
      <el-form-item :label="t('customers.fields.comment')" prop="comment">
        <el-input v-model="_item.comment" :placeholder="t('customers.fields.comment')" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">{{ $t('buttons.cancel') }}</el-button>
      <el-button type="primary" @click="submit">{{ $t('buttons.save') }}</el-button>
    </template>
  </el-dialog>
</template>
<style lang="scss">
.phone-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 30px;
}
</style>
