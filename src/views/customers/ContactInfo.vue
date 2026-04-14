<script lang="ts" setup>
import {
  _customerContactInfoStore,
  _customerFullInfoStore,
  _customerPassportInfoStore,
  addAddress,
  addPhones,
  ADDRESS_TYPE,
  PHONE_TYPES,
} from '/@/services/customer'
import {
  getDistricts_API,
  getMahallas_API,
  getRegions_API,
  type DistrictModel,
  type MahallaModel,
  type RegionModel,
} from '/@/services/info'
import type { FormInstance } from 'element-plus'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const formRef = ref<FormInstance>()
const emit = defineEmits(['next', 'prew'])
const _regions = ref<RegionModel[]>([])
const _districts = ref<DistrictModel[]>([])
const _mahallas = ref<MahallaModel[]>([])
// const router = useRouter()

async function loadRegions() {
  const [error, response] = await getRegions_API()

  if (error) return
  _regions.value = response.data
  console.log(_customerPassportInfoStore.value.address)
  if (_customerPassportInfoStore.value.address.region_id) await loadDistricts(+_customerPassportInfoStore.value.address.region_id)
  if (_customerPassportInfoStore.value.address.district_id) await loadMahallas(+_customerPassportInfoStore.value.address.district_id)
  _customerContactInfoStore.value.addresses[0].region_id = _customerPassportInfoStore.value.address.region_id
  _customerContactInfoStore.value.addresses[0].district_id = _customerPassportInfoStore.value.address.district_id
  _customerContactInfoStore.value.addresses[0].mahalla_id = _customerPassportInfoStore.value.address.mahalla_id
  _customerContactInfoStore.value.addresses[0].region = _regions.value.find(
    (el) => el.id == _customerContactInfoStore.value.addresses[0].region_id
  )
  _customerContactInfoStore.value.addresses[0].district = _districts.value.find(
    (el) => el.id == _customerContactInfoStore.value.addresses[0].district_id
  )
  _customerContactInfoStore.value.addresses[0].mahalla = _mahallas.value.find(
    (el) => el.id == _customerContactInfoStore.value.addresses[0].mahalla_id
  )
  _customerContactInfoStore.value.addresses[0].district_id = _customerPassportInfoStore.value.address.district_id
  _customerContactInfoStore.value.addresses[0].mahalla_id = _customerPassportInfoStore.value.address.mahalla_id
  _customerContactInfoStore.value.addresses[0].address = _customerPassportInfoStore.value.address.address
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

function handleEmit() {
  if (!formRef.value) return
  formRef.value.validate((valid) => {
    if (valid) {
      _customerFullInfoStore.value = {
        ..._customerPassportInfoStore.value,
        phones: _customerContactInfoStore.value.phones.map((item) => {
          delete item.id
          item.phone = item.phone?.split(' ').join('')
          return item
        }),
        addresses: _customerContactInfoStore.value.addresses.map((address) => {
          delete address.id
          return address
        }),
        cards: [],
      }
      // router.push('/customers/setCustomer/single-customer')
      emit('next')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

function validates(rule: any, value: any, callback: any) {
  let isCurrent = true
  console.log('val', value)

  for (const iterator of _customerContactInfoStore.value.phones) {
    if (isCurrent && iterator.phone == value) {
      isCurrent = false
      continue
    }
    if (!isCurrent && iterator.phone == value) {
      callback(t('customers.messages.same_numbers'))
      return
    }
  }
  if (!value) {
    callback(t('customers.messages.fill_field'))
  } else if (value.length < 16) {
    callback(t('customers.messages.must_be_12_characters'))
  } else {
    callback()
  }
}
</script>

<template>
  <div class="pasport_contact">
    <el-form ref="formRef" label-position="top" :model="_customerContactInfoStore">
      <div v-for="(contact, index) in _customerContactInfoStore.phones" :key="index" class="pasport_info">
        <div class="pasport_info">
          <el-form-item
            :key="'phones' + index"
            :label="t('customers.fields.phone')"
            :prop="'phones.' + index + '.phone'"
            :rules="[
              {
                required: true,
                trigger: 'blur',
                validator: validates,
              },
              {
                min: 16,
                validator: validates,
                trigger: 'blur',
              },
            ]"
          >
            <el-input v-model="contact.phone" v-mask="'### ## ### ## ##'" :maxlength="16" :placeholder="t('customers.fields.phone')" />
          </el-form-item>
          <el-form-item :label="t('customers.fields.type')">
            <el-select v-model="contact.type" :placeholder="t('customers.fields.type')">
              <el-option v-for="item in PHONE_TYPES" :key="item[1].value" :label="item[1].label" :value="item[1].value" />
            </el-select>
          </el-form-item>
        </div>
        <div class="pasport_address">
          <el-form-item class="textarea" :label="t('customers.fields.comment')">
            <el-input v-model="contact.comment" :placeholder="t('customers.fields.comment')" />
          </el-form-item>
          <el-form-item>
            <el-button v-if="!index" size="large" style="width: 44px; padding: 0px; font-size: 36px" type="primary" @click="addPhones()">
              +
            </el-button>
            <el-button v-else size="large" style="width: 44px; padding: 0px; font-size: 36px" type="primary" @click="addPhones(contact.id)">
              -
            </el-button>
          </el-form-item>
        </div>
      </div>
      <h2>{{ $t('customers.addresses') }}</h2>
      <div>
        <div v-for="(address, ind) in _customerContactInfoStore.addresses" :key="ind" class="pasport_info1">
          <div class="regions">
            <el-form-item :label="t('customers.address')">
              <el-select v-model="address.type" :placeholder="t('customers.choose_address')">
                <el-option v-for="item in ADDRESS_TYPE" :key="item[1].value" :label="item[1].label" :value="item[1].value" />
              </el-select>
            </el-form-item>

            <el-form-item
              :key="'addresses' + ind"
              :label="t('customers.fields.region_id')"
              :prop="'addresses.' + ind + '.region_id'"
              :rules="[
                {
                  trigger: 'blur',
                  validator: validates,
                },
              ]"
            >
              <el-select
                v-model="address.region_id"
                :placeholder="t('customers.fields.region_id')"
                @change="address.region = _regions.find((el) => el.id == address.region_id) as RegionModel"
                @click="loadRegions"
              >
                <el-option v-for="item in _regions" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item
              :key="'addresses' + ind"
              :label="t('customers.fields.district_id')"
              :prop="'addresses.' + ind + '.district_id'"
              :rules="[
                {
                  trigger: 'blur',
                  validator: validates,
                },
              ]"
            >
              <el-select
                v-model="address.district_id"
                :placeholder="t('customers.fields.district_id')"
                @change="address.district = _districts.find((el) => el.id == address.district_id) as DistrictModel"
                @click="loadDistricts(+address.region_id)"
              >
                <el-option v-for="item in _districts" :key="item.region_id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item :label="t('customers.fields.mahalla')">
              <el-select
                v-model="address.mahalla_id"
                :placeholder="t('customers.fields.mahalla')"
                @change="address.mahalla = _mahallas?.find((el) => el.id == address.mahalla_id) as MahallaModel"
                @click="loadMahallas(+address.district_id)"
              >
                <el-option v-for="item in _mahallas" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </div>
          <div class="pasport_address">
            <el-form-item
              class="textarea"
              :label="t('customers.address')"
              :prop="'addresses.' + ind + '.address'"
              :rules="[
                {
                  required: true,
                  trigger: 'blur',
                  validator: validates,
                },
              ]"
            >
              <el-input v-model="address.address" maxlength="128" :rows="5" type="textarea" />
            </el-form-item>
            <el-form-item>
              <el-button
                v-if="!ind"
                size="large"
                style="width: 44px; padding: 0px; font-size: 36px; font-weight: 400"
                type="primary"
                @click="addAddress()"
              >
                +
              </el-button>
              <el-button
                v-else
                size="large"
                style="width: 44px; padding: 0px; font-size: 36px"
                type="primary"
                @click="addAddress(address.id)"
              >
                -
              </el-button>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <div style="display: flex; justify-content: center; width: 100%">
      <el-form-item>
        <el-button size="large" style="width: 150px" type="primary" @click="handleEmit">
          {{ $t('buttons.next') }}
        </el-button>
      </el-form-item>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pasport_contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .el-button--large {
    height: 42px;
  }
  .pasport_address {
    display: flex;
    column-gap: 10px;
    align-items: flex-end;
    .textarea {
      width: 80%;
    }
  }
  .pasport_info {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 16px;
    align-items: flex-end;
  }
  .regions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 30px;
    align-items: flex-end;
  }
  .pasport_info1 {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
    margin-bottom: 10px;
  }
  .next {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 30px;
    align-items: flex-end;
  }
}
</style>
