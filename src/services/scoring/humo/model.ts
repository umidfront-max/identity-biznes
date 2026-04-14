import { STATUS_ENUM } from '/@/services/mib'

export interface HumoRequestModel {
  number: null | number
  expiry: null | number
}
export interface HumoDetailsModel {
  description: string
  type_code: string
  amount: number
}
export interface HumoReportModel {
  month: string
  details: HumoDetailsModel[]
  full_amount: number
}

export interface HumoResponseModel {
  id: number
  status: STATUS_ENUM
  request: HumoRequestModel
  response: { report: HumoReportModel[] }
  created_at: number
  updated_at: number
}
