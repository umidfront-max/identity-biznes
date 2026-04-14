<script lang="ts" setup>
import { type FormInstance } from 'element-plus'
import { CardRequestModel, getCardRequest_DEFAULT } from '~/src/services/instalment'
import { _rules } from './rules'
import { createCard_API, ConfirmCardModel, confirmCard_API, getConfirmCard_DEFAULT } from '~/src/services/customer'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const emit = defineEmits(['update'])
const _title = ref('')
const _visible = ref(false)
const _formRef = ref<FormInstance>()
const _confirm = ref<ConfirmCardModel>(getConfirmCard_DEFAULT())
const $baseMessage = inject<any>('$baseMessage')

// const router = useRouter()
const route = useRoute()
const _item = ref<CardRequestModel>(getCardRequest_DEFAULT())

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
  _item.value = getCardRequest_DEFAULT()
  _visible.value = false
}

function submit() {
  _formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      _item.value.customer_id = Number(route.query.id)
      _item.value.phone = _item.value.phone.split(' ').join('')
      _item.value.number = _item.value.number.split(' ').join('')
      const [error, response] = await createCard_API(
        {
          ..._item.value,
          expiry: _item.value.expiry.substring(3, 5) + _item.value.expiry.substring(0, 2),
        },
        route.query.id as string
      )
      if (error) return

      _confirm.value.session = response.attachData.session
      _confirm.value.card_id = response.card.id
      $baseMessage(t('customers.card_created'), 'success', 'hey')
    }
  })
}
function confirmCard() {
  _formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      const [error] = await confirmCard_API(_confirm.value, route.query.id as string)
      if (error) return
      $baseMessage(t('customers.card_created'), 'success', 'hey')
    }
  })
}

defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="_visible" append-to-body draggable :title="_title" width="500px" @close="close">
    <el-form ref="_formRef" class="card-grid" label-position="top" label-width="160px" :model="_item" :rules="_rules">
      <el-form-item :label="t('customers.fields.number')" prop="number">
        <el-input v-model="_item.number" v-mask="'#### #### #### ####'" maxlength="19" placeholder="#### #### #### ####" />
      </el-form-item>
      <el-form-item :label="t('customers.fields.expiry')" prop="expiry">
        <el-input v-model="_item.expiry" v-mask="'##/##'" maxlength="5" placeholder="##/##" />
      </el-form-item>
      <el-form-item :label="t('customers.fields.phone')" prop="phone">
        <el-input v-model="_item.phone" v-mask="'### ## ### ## ##'" maxlength="16" placeholder="998 ## ### ## ##" />
      </el-form-item>
      <el-form-item v-if="_confirm.session" label="SMS" prop="session">
        <el-input v-model="_confirm.otp" v-mask="'######'" maxlength="6" placeholder="######" />
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" type="primary" @click="submit">{{ $t('buttons.submit') }}</el-button>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">{{ $t('buttons.cancel') }}</el-button>
      <el-button type="primary" @click="confirmCard">{{ $t('buttons.save') }}</el-button>
    </template>
  </el-dialog>
</template>
<style lang="scss">
.card-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 30px;
  align-items: end;
}
</style>
