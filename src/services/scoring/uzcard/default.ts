import { type UzcardRequestModel, type UzcardResponseModel, UzcardReportModel, UzcardDetailsModel } from './model'
import { STATUS_ENUM } from '/@/services/mib'
export function getUzcardRequest_DEFAULT(): UzcardRequestModel {
  const object: UzcardRequestModel = {
    number: null,
    expiry: null,
  }
  return object
}
export function getUzcardDetails_DEFAULT(): UzcardDetailsModel {
  const object: UzcardDetailsModel = {
    description: '',
    type_code: '',
    amount: 0,
  }
  return object
}
export function getUzcardReport_DEFAULT(): UzcardReportModel {
  const object: UzcardReportModel = {
    month: '',
    details: [getUzcardDetails_DEFAULT()],
    full_amount: 0,
  }
  return object
}

export function getUzcardResponse_DEFAULT(): UzcardResponseModel {
  const object: UzcardResponseModel = {
    id: 0,
    status: STATUS_ENUM.SUCCESS,
    request: getUzcardRequest_DEFAULT(),
    response: {
      report: [getUzcardReport_DEFAULT()],
    },
    created_at: 0,
    updated_at: 0,
  }
  return object
}
