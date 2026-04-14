import { STATUS_ENUM } from '/@/services/mib'
import { RegionModel, DistrictModel } from '/@/services/info'
export interface PensionInfoRequestModel {
  pinfl: null | number
  passport_series: string
  passport_number: string
  passport_given_date: string
  first_name: string
  last_name: string
  middle_name: string
  phone: null | number
  extra_phone: null | number
  birth_date: string | Date
  region_id: number
  district_id: number
  district: DistrictModel
  region: RegionModel
}
export interface RowModel {
  period: string
  month: string
  summa: number
}
export interface DataModel {
  address: string
  apptype: string
  datepay: string
  datepens: string
  document: string
  experience: string
  namelatin: string
  patronymlatin: string
  pinpp: string
  summa: string
  surnamelatin: string
  type: string
}

export interface PensionInfoResponseModel {
  id: number
  status: STATUS_ENUM
  request: PensionInfoRequestModel
  response: {
    result: number
    sizePension: { data: DataModel; row: RowModel[] }
    comments: string
  }
  created_at: number
  updated_at: number
}
