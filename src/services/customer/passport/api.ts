import { BaseResponse, axiosInstance } from '../../network'
import { CustomerBasePassportInfoModel, CustomerPassportInfoModel } from './model'

export async function getCustomerPassportInfo_API(
  payload: CustomerBasePassportInfoModel
): Promise<[null, BaseResponse<CustomerPassportInfoModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponse<CustomerPassportInfoModel>>await axiosInstance.post('/customer/info-by-passport', payload)

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}
export async function updateCustomer_API(
  payload: CustomerPassportInfoModel
): Promise<[null, BaseResponse<CustomerPassportInfoModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponse<CustomerPassportInfoModel>>await axiosInstance.put(`/customer/${payload.id}`, { ...payload })

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}
