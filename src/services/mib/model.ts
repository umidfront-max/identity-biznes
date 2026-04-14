export interface MibResponseModel {
  id: number
  status: number
  request: MibRequestModel
  response: {
    debtBal: number
  }
  created_at: number
  updated_at: number
}
export interface MibRequestModel {
  pinfl: null | number
  phone: string
}

export enum STATUS_ENUM {
  CRETED = 0,
  WAITING = 1,
  SUCCESS = 2,
  FAILED = -1,
}
