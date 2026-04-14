import {
  type CreditHistoryRequestModel,
  type CreditHistoryResponseModel,
  type CurrentDebtModel,
  ScoreModel,
  type ClientResponseModel,
  ClientModel,
} from './model'
import { getPensionInfoRequest_DEFAULT } from '../pension-info'
export function getCreditHistoryRequest_DEFAULT(): CreditHistoryRequestModel {
  return getPensionInfoRequest_DEFAULT()
}
export function getCreditHistoryResponse_DEFAULT(): CreditHistoryResponseModel {
  const object: CreditHistoryResponseModel = {
    id: 0,
    status: 0,
    request: getPensionInfoRequest_DEFAULT(),

    response: {
      ...getClientResponse_DEFAULT(),
    },

    created_at: 0,
    updated_at: 0,
  }
  return object
}
export function getClientResponse_DEFAULT(): ClientResponseModel {
  const object = {
    additional_info: {
      current_debt: getIconome_DEFAULT(),
      closed_debt: getIconome_DEFAULT(),
      average_monthly_payment: '',
      notifications: [],
    },
    score: getScore_DEFAULT(),
    client: getClient_DEFAULT(),
  }
  return object
}
export function getClient_DEFAULT(): ClientModel {
  const object = {
    name: '',
    birth_date: '',
    gender: '',
    resident: '',
    address: '',
    phone_number: '',
    pinfl: '',
    inn: '',
    score_level: '',
    score_date: '',
    document_type: '',
    document_serial: '',
    document_number: '',
    document_date: '',
    document_type_id: null,
    subject_id: null,
    credit_start_date: null,
  }
  return object
}

export function getScore_DEFAULT(): ScoreModel {
  const object = {
    score_point: 0,
    score_class: '',
    score_level: '',
    score_date: '',
    score_version: '',
  }
  return object
}
export function getIconome_DEFAULT(): CurrentDebtModel {
  const object = {
    all_delays_qty: 0,
    all_delays_sum: 0,
    contracts_wo_delays_qty: 0,
    contracts_wo_delays_sum: 0,
    expired_percent_qty: 0,
    expired_percent_sum: 0,
    revised_contracts_qty: 0,
    revised_contracts_sum: 0,
    delays_less_30_qty: 0,
    delays_less_30_sum: 0,
    switched_month_qty: 0,
    switched_month_sum: 0,
    delays_less_60_qty: 0,
    delays_less_60_sum: 0,
    delays_less_90_qty: 0,
    delays_less_90_sum: 0,
    delays_more_90_qty: 0,
    delays_more_90_sum: 0,
    delays_in_court_qty: 0,
    delays_in_court_sum: 0,
    delays_decommissioned_qty: 0,
    delays_decommissioned_sum: 0,
    delays_decommissioned_pcnt_qty: 0,
    delays_decommissioned_pcnt_sum: 0,
  }
  return object
}
