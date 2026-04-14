import { MibResponseModel, MibRequestModel } from './model'

export function getMibResponse_DEFAULT(): MibResponseModel {
  const object: MibResponseModel = {
    id: 0,
    status: 0,
    request: getMibRequeste_DEFAULT(),
    response: {
      debtBal: 0,
    },
    created_at: 0,
    updated_at: 0,
  }

  return object
}
export function getMibRequeste_DEFAULT(): MibRequestModel {
  const object: MibRequestModel = {
    pinfl: null,
    phone: '',
  }
  return object
}
