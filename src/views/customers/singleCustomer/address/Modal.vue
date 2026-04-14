<script lang="ts" setup>
import { type FormInstance } from 'element-plus'
import { getCustomerContactAddress_DEFAULT, CustomerContactAddressModel, createAddress_API, ADDRESS_TYPE } from '~/src/services/customer'
import {
  getDistricts_API,
  getMahallas_API,
  getRegions_API,
  type DistrictModel,
  type MahallaModel,
  type RegionModel,
} from '/@/services/info'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const emit = defineEmits(['update'])
const _title = ref('')
const _visible = ref(false)
const _formRef = ref<FormInstance>()

const $baseMessage = inject<any>('$baseMessage')
const _regions = ref<RegionModel[]>([])
const _districts = ref<DistrictModel[]>([])
const _mahallas = ref<MahallaModel[]>([])
// const router = useRouter()
const route = useRoute()
const _item = ref<CustomerContactAddressModel>(getCustomerContactAddress_DEFAULT())
async function loadRegions() {
  const [error, response] = await getRegions_API()

  if (error) return
  _regions.value = response.data

  if (_item.value.region_id) await loadDistricts(+_item.value.region_id)
  if (_item.value.district_id) await loadMahallas(+_item.value.district_id)
}
loadRegions()

async function loadDistricts(region_id: number) {
  const [error, response] = await getDistricts_API(region_id)

  if (error) return
  _districts.value = response.data
}

async function loadMahallas(district_id: number) {
  const [error, response] = await getMahallas_API(district_id)

  if (error) return
  _mahallas.value = response.data
}

function open() {
  _title.value = t('customers.address')
  _visible.value = true
}

function close() {
  emit('update')
  reset()
}

function reset() {
  _formRef.value?.resetFields()
  _item.value = getCustomerContactAddress_DEFAULT()
  _visible.value = false
}

function submit() {
  _formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      const [error] = await createAddress_API(_item.value, route.query.id as string)
      if (error) return

      $baseMessage(t('customers.address_created'), 'success', 'hey')
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
      <div class="regions">
        <el-form-item :label="t('customers.address')">
          <el-select v-model="_item.type" :placeholder="t('customers.choose_address')">
            <el-option v-for="item in ADDRESS_TYPE" :key="item[1].value" :label="item[1].label" :value="item[1].value" />
          </el-select>
        </el-form-item>

        <el-form-item :label="t('customers.fields.region_id')">
          <el-select v-model="_item.region_id" :placeholder="t('customers.fields.region_id')" @click="loadRegions">
            <el-option v-for="item in _regions" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item :label="t('customers.fields.district_id')">
          <el-select v-model="_item.district_id" :placeholder="t('customers.fields.district_id')" @click="loadDistricts(+_item.region_id)">
            <el-option v-for="item in _districts" :key="item.region_id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item :label="t('customers.fields.mahalla_id')">
          <el-select v-model="_item.mahalla_id" :placeholder="t('customers.fields.mahalla_id')" @click="loadMahallas(+_item.district_id)">
            <el-option v-for="item in _mahallas" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
      <div class="pasport_address">
        <el-form-item class="textarea" :label="t('customers.address')">
          <el-input v-model="_item.address" maxlength="128" :rows="5" type="textarea" />
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <el-button @click="close">{{ $t('buttons.cancel') }}</el-button>
      <el-button type="primary" @click="submit">{{ $t('buttons.save') }}</el-button>
    </template>
  </el-dialog>
</template>
<style lang="scss">
.regions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 30px;
  align-items: flex-end;
}
</style>
