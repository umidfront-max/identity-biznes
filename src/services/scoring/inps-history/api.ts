import { axiosInstance, BaseResponseList, BaseResponse, QueryDataModel } from '../../network'
import { InpsHistoryRequestModel, InpsHistoryResponseModel } from './model'

export async function getInpsHistory_API(
  item: QueryDataModel
): Promise<[null, BaseResponseList<InpsHistoryResponseModel>] | [Error, false]> {
  try {
    const response = <BaseResponseList<InpsHistoryResponseModel>>await axiosInstance.get('/scoring/inps-history', {
      params: {
        ...item,
      },
    })

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}

export async function singleInpsHistory_API(id: number): Promise<[null, BaseResponse<InpsHistoryResponseModel>] | [Error, false]> {
  try {
    const response = <BaseResponse<InpsHistoryResponseModel>>await axiosInstance.get(`/scoring/inps-history/${id}`)

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}

export async function createInpsHistory_API(data: InpsHistoryRequestModel): Promise<[null, boolean] | [Error, boolean]> {
  try {
    const method = 'POST'
    const url = '/scoring/inps-history/create'

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
