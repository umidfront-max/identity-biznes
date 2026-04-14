import {
  type CustomerContactAddressModel,
  type CustomerContactPhoneModel,
  type CustomerContactsModel,
  PHONE_TYPE_ENUM,
  ADDRESS_TYPE_ENUM,
} from './model'
import { getMahalla_DEFAULT, getDistrict_DEFAULT, getRegion_DEFAULT } from '/@/services/info'

export function getCustomerContacts_DEFAULT(): CustomerContactsModel {
  const object: CustomerContactsModel = {
    addresses: [getCustomerContactAddress_DEFAULT()],
    phones: [getCustomerContactPhone_DEFAULT()],
  }

  return object
}

export function getCustomerContactPhone_DEFAULT(): CustomerContactPhoneModel {
  const object: CustomerContactPhoneModel = {
    id: 0,
    phone: '',
    type: PHONE_TYPE_ENUM.PRIVATE,
    comment: '',
  }

  return object
}

export function getCustomerContactAddress_DEFAULT(): CustomerContactAddressModel {
  const object: CustomerContactAddressModel = {
    id: 0,
    type: ADDRESS_TYPE_ENUM.LIVING_PLACE,
    address: '',
    region_id: '',
    district_id: '',
    mahalla_id: '',
    region: getRegion_DEFAULT(),
    district: getDistrict_DEFAULT(),
    mahalla: getMahalla_DEFAULT(),
  }

  return object
}
