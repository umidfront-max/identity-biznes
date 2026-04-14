import { axiosInstance, BaseResponseList, BaseResponse, QueryDataModel } from '../../network'
import { UzcardRequestModel, UzcardResponseModel } from './model'

export async function getUzcard_API(item: QueryDataModel): Promise<[null, BaseResponseList<UzcardResponseModel>] | [Error, false]> {
  try {
    const response = <BaseResponseList<UzcardResponseModel>>await axiosInstance.get('/scoring/uzcard', {
      params: {
        ...item,
      },
    })

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}

export async function singleUzcard_API(id: number): Promise<[null, BaseResponse<UzcardResponseModel>] | [Error, false]> {
  try {
    const response = <BaseResponse<UzcardResponseModel>>await axiosInstance.get(`/scoring/uzcard/${id}`)

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}

export async function createUzcard_API(data: UzcardRequestModel): Promise<[null, boolean] | [any, boolean]> {
  try {
    const method = 'POST'
    const url = '/scoring/uzcard/create'

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
