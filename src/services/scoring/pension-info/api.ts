import { axiosInstance, BaseResponseList, BaseResponse, QueryDataModel } from '../../network'
import { PensionInfoRequestModel, PensionInfoResponseModel } from './model'

export async function getPensionsInfo_API(
  item: QueryDataModel
): Promise<[null, BaseResponseList<PensionInfoResponseModel>] | [Error, false]> {
  try {
    const response = <BaseResponseList<PensionInfoResponseModel>>await axiosInstance.get('/scoring/pension-info', {
      params: {
        ...item,
      },
    })

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}

export async function singlePensionsInfo_API(id: number): Promise<[null, BaseResponse<PensionInfoResponseModel>] | [Error, false]> {
  try {
    const response = <BaseResponse<PensionInfoResponseModel>>await axiosInstance.get(`/scoring/pension-info/${id}`)

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}

export async function createPensionInfo_API(data: PensionInfoRequestModel): Promise<[null, boolean] | [Error, boolean]> {
  try {
    const method = 'POST'
    const url = '/scoring/pension-info/create'

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
