import { PensionInfoRequestModel } from '../pension-info'
export interface InpsHistoryRequestModel extends PensionInfoRequestModel {}
import { STATUS_ENUM } from '/@/services/mib'

export interface InpsHistoryResponseModel {
  id: number
  status: STATUS_ENUM
  request: PensionInfoRequestModel
  created_at: number
  updated_at: number
  response: ClientResponseModel
}

export interface ClientResponseModel {
  incomes: { income: IncomeModel[] }
  incomes_period: IncomesPeriodModel
  presence_reports: { presence_report: presenceReportModel[] }
}

export interface IncomesPeriodModel {
  incomes_all_summa: string
  incomes_period_begin: string
  incomes_period_end: string
}

export interface presenceReportModel {
  num: string
  presence: string
  report_name: string
}
export interface IncomeModel {
  income_summa: string
  inps_summa: string
  num: number
  org_inn: string
  orgname: string
  period: string
  send_date: string
}
