import { TaxResponseModel, TaxRequestModel } from './model'

export function getTaxResponse_DEFAULT(): TaxResponseModel {
  const object: TaxResponseModel = {
    id: 0,
    status: 0,
    request: getTaxRequeste_DEFAULT(),
    response: {
      debtBal: 0,
    },
    created_at: 0,
    updated_at: 0,
  }

  return object
}
export function getTaxRequeste_DEFAULT(): TaxRequestModel {
  const object: TaxRequestModel = {
    pinfl: null,
  }
  return object
}
