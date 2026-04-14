import { axiosInstance, BaseResponseList, BaseResponse } from '../network'
import type { DistrictModel, MahallaModel, RegionModel } from './model'
import { CustomerBasePassportInfoModel, CustomerPassportInfoModel } from '/@/services/customer'

export async function getCustomerPassportInfo_API(
  payload: CustomerBasePassportInfoModel
): Promise<[null, BaseResponse<CustomerPassportInfoModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponse<CustomerPassportInfoModel>>await axiosInstance.post('/customer/info-by-passport', { ...payload })

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}

export async function getRegions_API(): Promise<[null, BaseResponseList<RegionModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponseList<RegionModel>>await axiosInstance.get('/info/regions')

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}

export async function getDistricts_API(region_id: number): Promise<[null, BaseResponseList<DistrictModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponseList<DistrictModel>>await axiosInstance.get('/info/districts', { params: { region_id } })

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}

export async function getMahallas_API(district_id: number): Promise<[null, BaseResponseList<MahallaModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponseList<MahallaModel>>await axiosInstance.get('/info/mahallas', { params: { district_id } })

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}
