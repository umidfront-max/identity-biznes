import { PensionInfoRequestModel } from '../pension-info'
export interface CreditHistoryRequestModel extends PensionInfoRequestModel {}

export interface CreditHistoryResponseModel {
  id: number
  status: number
  request: PensionInfoRequestModel
  created_at: number
  updated_at: number
  response: ClientResponseModel
}

export interface ClientResponseModel {
  additional_info: {
    current_debt: CurrentDebtModel
    closed_debt: CurrentDebtModel
    average_monthly_payment: string
    notifications: string[]
  }
  client: ClientModel
  score: ScoreModel
}
export interface ClientModel {
  name: string
  birth_date: string
  gender: string
  resident: string
  address: string
  phone_number: string
  pinfl: string
  inn: string
  score_level: string
  score_date: string
  document_type: string
  document_serial: string
  document_number: string
  document_date: string
  document_type_id: null
  subject_id: null
  credit_start_date: null
}
export interface ScoreModel {
  score_point: number
  score_class: string
  score_level: string
  score_date: string
  score_version: string
}

export interface CurrentDebtModel {
  all_delays_qty: number
  all_delays_sum: number
  contracts_wo_delays_qty: number
  contracts_wo_delays_sum: number
  expired_percent_qty: number
  expired_percent_sum: number
  revised_contracts_qty: number
  revised_contracts_sum: number
  delays_less_30_qty: number
  delays_less_30_sum: number
  switched_month_qty: number
  switched_month_sum: number
  delays_less_60_qty: number
  delays_less_60_sum: number
  delays_less_90_qty: number
  delays_less_90_sum: number
  delays_more_90_qty: number
  delays_more_90_sum: number
  delays_in_court_qty: number
  delays_in_court_sum: number
  delays_decommissioned_qty: number
  delays_decommissioned_sum: number
  delays_decommissioned_pcnt_qty: number
  delays_decommissioned_pcnt_sum: number
}
