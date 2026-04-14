import { type PensionInfoRequestModel, type PensionInfoResponseModel, type DataModel } from './model'
import { STATUS_ENUM } from '/@/services/mib'
import { getRegion_DEFAULT, getDistrict_DEFAULT } from '/@/services/info'
export function getPensionInfoRequest_DEFAULT(): PensionInfoRequestModel {
  const object: PensionInfoRequestModel = {
    pinfl: null,
    passport_series: '',
    passport_number: '',
    passport_given_date: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    phone: null,
    extra_phone: null,
    birth_date: '',
    region_id: 0,
    district_id: 0,
    region: getRegion_DEFAULT(),
    district: getDistrict_DEFAULT(),
  }
  return object
}

export function getPensionInfoResponse_DEFAULT(): PensionInfoResponseModel {
  const object: PensionInfoResponseModel = {
    id: 0,
    status: STATUS_ENUM.SUCCESS,
    request: getPensionInfoRequest_DEFAULT(),
    response: {
      result: 1,
      sizePension: { data: getData_DEFAULT(), row: [] },
      comments: '',
    },
    created_at: 0,
    updated_at: 0,
  }
  return object
}

export function getData_DEFAULT(): DataModel {
  const object: DataModel = {
    address: '',
    apptype: '',
    datepay: '',
    datepens: '',
    document: '',
    experience: '',
    namelatin: '',
    patronymlatin: '',
    summa: '',
    surnamelatin: '',
    type: '',
    pinpp: '',
  }
  return object
}
