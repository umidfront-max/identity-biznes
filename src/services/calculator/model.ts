export interface CalculatorModel {
  id: string | number
  tariff_id: string | number
  amount: string | number
  initial_amount: null | number
  period: null | number
  portion?: null | number
}
export interface CalculatorResponseModel {
  id: number
  date: string
  amount: number
  portion: number
  monthly: number
}
