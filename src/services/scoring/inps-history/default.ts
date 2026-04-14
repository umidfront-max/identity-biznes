import {
  type InpsHistoryRequestModel,
  type InpsHistoryResponseModel,
  type IncomeModel,
  presenceReportModel,
  IncomesPeriodModel,
  type ClientResponseModel,
} from './model'
import { STATUS_ENUM } from '/@/services/mib'

import { getPensionInfoRequest_DEFAULT } from '../pension-info'
export function getInpsHistoryRequest_DEFAULT(): InpsHistoryRequestModel {
  return getPensionInfoRequest_DEFAULT()
}
export function getInpsHistoryResponse_DEFAULT(): InpsHistoryResponseModel {
  const object: InpsHistoryResponseModel = {
    id: 0,
    status: STATUS_ENUM.SUCCESS,

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
    incomes: { income: [getIconome_DEFAULT()] },
    incomes_period: getIncomesPeriod_DEFAULT(),
    presence_reports: { presence_report: [getpresenceReport_DEFAULT()] },
  }
  return object
}

export function getIncomesPeriod_DEFAULT(): IncomesPeriodModel {
  const object = {
    incomes_all_summa: '',
    incomes_period_begin: '',
    incomes_period_end: '',
  }
  return object
}
export function getpresenceReport_DEFAULT(): presenceReportModel {
  const object = {
    num: '',
    presence: '',
    report_name: '',
  }
  return object
}
export function getIconome_DEFAULT(): IncomeModel {
  const object = {
    income_summa: '',
    inps_summa: '',
    num: 0,
    org_inn: '',
    orgname: '',
    period: '',
    send_date: '',
  }
  return object
}
