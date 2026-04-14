import { axiosInstance, BaseResponseList, QueryDataModel } from '../network'
import type { MibRequestModel, MibResponseModel } from './model'

export async function getMibs_API(item: QueryDataModel): Promise<[null, BaseResponseList<MibResponseModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponseList<MibResponseModel>>await axiosInstance.get('/scoring/mib', {
      params: {
        ...item,
      },
    })

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}
export async function createMib_API(data: MibRequestModel): Promise<[null, BaseResponseList<MibResponseModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponseList<MibResponseModel>>await axiosInstance.post('/scoring/mib/create', data)

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}
