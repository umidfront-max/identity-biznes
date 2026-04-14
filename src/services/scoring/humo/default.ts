import { type HumoRequestModel, type HumoResponseModel, HumoReportModel, HumoDetailsModel } from './model'
import { STATUS_ENUM } from '/@/services/mib'
export function getHumoRequest_DEFAULT(): HumoRequestModel {
  const object: HumoRequestModel = {
    number: null,
    expiry: null,
  }
  return object
}
export function getHumoDetails_DEFAULT(): HumoDetailsModel {
  const object: HumoDetailsModel = {
    description: '',
    type_code: '',
    amount: 0,
  }
  return object
}
export function getHumoReport_DEFAULT(): HumoReportModel {
  const object: HumoReportModel = {
    month: '',
    details: [getHumoDetails_DEFAULT()],
    full_amount: 0,
  }
  return object
}

export function getHumoResponse_DEFAULT(): HumoResponseModel {
  const object: HumoResponseModel = {
    id: 0,
    status: STATUS_ENUM.SUCCESS,
    request: getHumoRequest_DEFAULT(),
    response: {
      report: [getHumoReport_DEFAULT()],
    },
    created_at: 0,
    updated_at: 0,
  }
  return object
}
