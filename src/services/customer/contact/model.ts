import { MahallaModel, RegionModel, DistrictModel } from '/@/services/info'

export interface CustomerContactPhoneModel {
  id?: number
  phone: string
  type: PHONE_TYPE_ENUM
  comment: string
}

export interface CustomerContactAddressModel {
  id?: number
  type: ADDRESS_TYPE_ENUM
  address: string
  region_id: number | string
  district_id: number | string
  mahalla_id: number | string
  region?: RegionModel
  district?: DistrictModel
  mahalla?: MahallaModel
}

export interface CustomerContactsModel {
  addresses: CustomerContactAddressModel[]
  phones: CustomerContactPhoneModel[]
}
export enum PHONE_TYPE_ENUM {
  PRIVATE = 1,
  WORK = 2,
  RELATIVE = 3,
}
export enum ADDRESS_TYPE_ENUM {
  LIVING_PLACE = 1,
  TEMPORARY_PLACE = 2,
}
export const ADDRESS_TYPE = new Map<ADDRESS_TYPE_ENUM, { label: string; value: number }>()
ADDRESS_TYPE.set(ADDRESS_TYPE_ENUM.LIVING_PLACE, {
  label: 'Yashash joyi',
  value: 1,
})
ADDRESS_TYPE.set(ADDRESS_TYPE_ENUM.TEMPORARY_PLACE, {
  label: 'Vaqtinchalik yashash joyi',
  value: 2,
})

export const PHONE_TYPES = new Map<PHONE_TYPE_ENUM, { label: string; value: number }>()
PHONE_TYPES.set(PHONE_TYPE_ENUM.PRIVATE, {
  label: 'Shaxsiy',
  value: 1,
})
PHONE_TYPES.set(PHONE_TYPE_ENUM.WORK, {
  label: 'Ishxonadagi nomer',
  value: 2,
})
PHONE_TYPES.set(PHONE_TYPE_ENUM.RELATIVE, {
  label: 'Qarindosh',
  value: 3,
})
