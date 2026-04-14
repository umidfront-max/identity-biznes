import { axiosInstance, BaseResponseList, BaseResponse, QueryDataModel } from '../../network'
import { HumoRequestModel, HumoResponseModel } from './model'

export async function getHumo_API(item: QueryDataModel): Promise<[null, BaseResponseList<HumoResponseModel>] | [Error, false]> {
  try {
    const response = <BaseResponseList<HumoResponseModel>>await axiosInstance.get('/scoring/humo', {
      params: {
        ...item,
      },
    })

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}

export async function singleHumo_API(id: number): Promise<[null, BaseResponse<HumoResponseModel>] | [Error, false]> {
  try {
    const response = <BaseResponse<HumoResponseModel>>await axiosInstance.get(`/scoring/humo/${id}`)

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}

export async function createHumo_API(data: HumoRequestModel): Promise<[null, boolean] | [any, boolean]> {
  try {
    const method = 'POST'
    const url = '/scoring/humo/create'

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
