export interface TariffDTO {
  id: number
  name: string
  is_annual: boolean
  percent: number
  min_amount: number
  max_amount: number
  min_initial_fee: number
  max_initial_fee: number
}
