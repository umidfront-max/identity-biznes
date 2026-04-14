import { BaseResponse } from '~/src/base/baseResponse'
import { BaseListRequest } from '/@/base/baseListRequest.ts'
import { BaseListResponse } from '/@/base/baseListResponse.ts'
import { BaseTableColumn } from '/@/base/baseTableColumn.ts'

export interface CustomerPasportRequestDTO {
  passport_series: string
  passport_number: string
  birth_date: string
}
export interface CustomerPhonesDTO {
  id?: null | number
  phone: string
  type: number
  comment: string
}
export interface CustomerAddressesDTO {
  id?: null | number
  type: number
  address: string
  region_id: number
  district_id: number
  mahalla_id: number
}
export interface RegionsDTO {
  id: number
  name: string
}
export interface OptionDTO {
  value: number
  label: string
}
export interface DistrictsDTO {
  id: number
  name: string
  region_id: number
}
export interface MahallasDTO {
  id: number
  name: string
  district_id: number
}
export interface CustomerPasportResponseDTO {
  pinfl: number
  tin: number
  id?: number
  passport_series: string
  passport_number: string
  passport_given_date: string
  passport_expiration_date: string
  passport_given_place: string
  passport_citizenship: string
  first_name: string
  last_name: string
  middle_name: string
  birth_date: string
  birth_place: string
  gender: 1
  address: {
    address: string
    region_id: number
    district_id: number
    mahalla_id: number
  }
}
export interface SuccessCustomerResponse extends CustomerPasportResponseDTO {
  phones: CustomerPhonesDTO[]
  addresses: CustomerAddressesDTO[]
}

export interface CustomerStoreType<T> {
  customerPasportStore: CustomerPasportResponseDTO
  customerPasportResponse: BaseResponse<T>
  currentFilters: BaseListRequest
  phones: CustomerPhonesDTO[]
  addresses: CustomerAddressesDTO[]
  stepActive: number
  customerList: BaseListResponse<T>
  regionsOption: RegionsDTO[]
  districtsOption: DistrictsDTO[]
  mahallasOption: MahallasDTO[]
  tableColumns: BaseTableColumn[]
  successCustomerResponse: BaseResponse<SuccessCustomerResponse>
}
