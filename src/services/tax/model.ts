export interface TaxResponseModel {
  id: number
  status: number
  request: TaxRequestModel
  response: {
    debtBal: number
  }
  created_at: number
  updated_at: number
}
export interface TaxRequestModel {
  pinfl: null | number
}
