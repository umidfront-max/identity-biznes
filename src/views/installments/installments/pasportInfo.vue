<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { postCustomerByPasport_API, _instalmentStore, _byPasportStore } from '~/src/services/instalment'
import { _customerFullInfoStore } from '/@/services/customer'
import { rulesPassportInfo } from './rules'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const ruleFormRef = ref<FormInstance>()
const props = defineProps({
  isNext: {
    type: Boolean,
    default: () => true,
  },
})

const router = useRouter()
const _dialogVisible = ref(false)
const emit = defineEmits(['next'])
async function getPassportInfo() {
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      const [error, response] = await postCustomerByPasport_API(_byPasportStore.value)

      if (error) {
        _dialogVisible.value = true
        return
      }
      _customerFullInfoStore.value = response.data
    }
  })
}
function nextStep() {
  _instalmentStore.value.customer_id = _customerFullInfoStore.value.id
  emit('next')
}
function customerCreate() {
  router.push('/customers/setCustomer')
  _dialogVisible.value = false
}
</script>

<template>
  <div>
    <el-form ref="ruleFormRef" class="pasport_info" label-position="top" :model="_byPasportStore" :rules="rulesPassportInfo">
      <el-form-item :label="t('installments.fields.passport_series')" prop="passport_series">
        <el-input v-model="_byPasportStore.passport_series" v-mask="'UU'" placeholder="Pasport seriyasi" />
      </el-form-item>
      <el-form-item :label="t('installments.fields.passport_number')" prop="passport_number">
        <el-input v-model="_byPasportStore.passport_number" v-mask="'#######'" :maxlength="7" placeholder="Pasport raqami" />
      </el-form-item>
      <el-form-item :label="t('installments.fields.pinfl')" prop="pinfl" style="width: 100%">
        <el-input v-model="_byPasportStore.pinfl" :maxlength="14" placeholder="pinfl" />
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" type="primary" @click="getPassportInfo">{{ $t('installments.fields.fill_document') }}</el-button>
      </el-form-item>
    </el-form>
    <el-descriptions
      v-if="_customerFullInfoStore.first_name?.length"
      border
      :column="2"
      :title="_customerFullInfoStore.first_name as string"
    >
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.passport_series') }}</template>
        {{ _customerFullInfoStore.passport_series }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.passport_number') }}</template>
        {{ _customerFullInfoStore.passport_number }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.birth_date') }}</template>
        {{ _customerFullInfoStore.birth_date }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.first_name') }}</template>
        {{ _customerFullInfoStore.first_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.last_name') }}</template>
        {{ _customerFullInfoStore.last_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.middle_name') }}</template>
        {{ _customerFullInfoStore.middle_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.pinfl') }}</template>
        {{ _customerFullInfoStore.pinfl }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.tin') }}</template>
        {{ _customerFullInfoStore.tin }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.tin') }}</template>
        {{ _customerFullInfoStore.tin }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.dwelling_place') }}</template>
        {{ _customerFullInfoStore.birth_place }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.passport_given_date') }}</template>
        {{ _customerFullInfoStore.passport_given_date }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.passport_expiration_date') }}</template>
        {{ _customerFullInfoStore.passport_expiration_date }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('installments.fields.passport_citizenship') }}</template>
        {{ _customerFullInfoStore.passport_citizenship }}
      </el-descriptions-item>
    </el-descriptions>
    <div
      v-if="_customerFullInfoStore.first_name?.length && props.isNext"
      style="display: flex; justify-content: end; margin-top: 20px"
      @click="nextStep"
    >
      <el-button type="primary">{{ $t('buttons.next') }}</el-button>
    </div>

    <el-dialog
      v-model="_dialogVisible"
      append-to-body
      class="vab-table-form-dialog"
      draggable
      :title="t('installments.customer_not_found')"
      width="500px"
    >
      <template #footer>
        <el-button @click="_dialogVisible = false">{{ $t('buttons.cancel') }}</el-button>
        <el-button type="primary" @click="customerCreate">{{ $t('installments.create_customer') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<style>
.pasport_info {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: 30px;
  align-items: flex-end;
}
</style>
