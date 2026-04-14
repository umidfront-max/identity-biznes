import { STATUS_ENUM } from '/@/services/mib'

export interface UzcardRequestModel {
  number: null | number
  expiry: null | number
}
export interface UzcardDetailsModel {
  description: string
  type_code: string
  amount: number
}
export interface UzcardReportModel {
  month: string
  details: UzcardDetailsModel[]
  full_amount: number
}

export interface UzcardResponseModel {
  id: number
  status: STATUS_ENUM
  request: UzcardRequestModel
  response: { report: UzcardReportModel[] }
  created_at: number
  updated_at: number
}
