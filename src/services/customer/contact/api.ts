import { BaseResponse, BaseResponseList, axiosInstance } from '../../network'
import { CustomerFullRequestInfoModel } from '../'
export async function getCustomers_API(): Promise<[null, BaseResponseList<any>] | [Error, boolean]> {
  try {
    const response = <BaseResponseList<any>>await axiosInstance.get('/customer')

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}
export async function singleCustomers_API(id: number): Promise<[null, BaseResponse<CustomerFullRequestInfoModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponse<CustomerFullRequestInfoModel>>await axiosInstance.get(`/customer/${id}`)

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}
