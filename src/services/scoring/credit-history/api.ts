import { axiosInstance, BaseResponseList, BaseResponse, QueryDataModel } from '../../network'
import { CreditHistoryRequestModel, CreditHistoryResponseModel } from './model'

export async function getCreditHistory_API(
  item: QueryDataModel
): Promise<[null, BaseResponseList<CreditHistoryResponseModel>] | [Error, false]> {
  try {
    const response = <BaseResponseList<CreditHistoryResponseModel>>await axiosInstance.get('/scoring/credit-history', {
      params: {
        ...item,
      },
    })

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}
export async function singleCreditHistory_API(id: number): Promise<[null, BaseResponse<CreditHistoryResponseModel>] | [Error, false]> {
  try {
    const response = <BaseResponse<CreditHistoryResponseModel>>await axiosInstance.get(`/scoring/credit-history/${id}`)

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}

export async function createCreditHistory_API(data: CreditHistoryRequestModel): Promise<[null, boolean] | [Error, boolean]> {
  try {
    const method = 'POST'
    const url = '/scoring/credit-history/create'

    const response = await axiosInstance({
      method,
      url,
      data,
    })
    console.log(response)

    return [null, true]
  } catch (error) {
    console.error(error)
    return [error as Error, false]
  }
}
