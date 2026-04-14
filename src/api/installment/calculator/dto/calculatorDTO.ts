import { BaseResponse } from '~/src/base/baseResponse'

export interface CalculatorDTO {
  id: string | number
  tariff_id: string | number
  amount: string
  initial_amount: null | number
  period: null | number
  portion?: null | number
}
export interface BaseCalculatorResponse<T> {
  calculatorStore: CalculatorDTO
  calculatorResponse: BaseResponse<T>
}
