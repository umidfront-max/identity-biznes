import { axiosInstance, BaseResponseList, QueryDataModel } from '../network'
import type { TaxRequestModel, TaxResponseModel } from './model'

export async function getTaxs_API(item: QueryDataModel): Promise<[null, BaseResponseList<TaxResponseModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponseList<TaxResponseModel>>await axiosInstance.get('/scoring/tax', {
      params: {
        ...item,
      },
    })

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}
export async function createTax_API(data: TaxRequestModel): Promise<[null, BaseResponseList<TaxResponseModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponseList<TaxResponseModel>>await axiosInstance.post('/scoring/tax/create', data)

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}
