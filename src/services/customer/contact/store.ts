import { getCustomerContacts_DEFAULT } from './default'
import { type CustomerContactsModel, ADDRESS_TYPE_ENUM, PHONE_TYPE_ENUM } from './model'
import { getMahalla_DEFAULT, getDistrict_DEFAULT, getRegion_DEFAULT } from '/@/services/info'
export const _customerContactInfoStore = ref<CustomerContactsModel>(getCustomerContacts_DEFAULT())
export function addPhones(id: null | number = null) {
  if (id) {
    _customerContactInfoStore.value.phones = _customerContactInfoStore.value.phones.filter((phone) => phone.id != id)
  } else {
    _customerContactInfoStore.value.phones.push({
      id: +new Date(),
      phone: '998',
      type: PHONE_TYPE_ENUM.PRIVATE,
      comment: '',
    })
  }
}
export function addAddress(id: null | number = null) {
  if (id) {
    _customerContactInfoStore.value.addresses = _customerContactInfoStore.value.addresses.filter((address) => address.id != id)
  } else {
    _customerContactInfoStore.value.addresses.push({
      id: +new Date(),
      type: ADDRESS_TYPE_ENUM.LIVING_PLACE,
      address: '',
      region_id: '',
      district_id: '',
      mahalla_id: '',
      region: getRegion_DEFAULT(),
      district: getDistrict_DEFAULT(),
      mahalla: getMahalla_DEFAULT(),
    })
  }
}
