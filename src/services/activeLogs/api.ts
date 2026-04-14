import { axiosInstance, BaseResponseList, QueryDataModel } from '../network'
import { LogsModel } from './model'
export async function getLogs_API(item: QueryDataModel): Promise<[null, BaseResponseList<LogsModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponseList<LogsModel>>await axiosInstance.get('/log', {
      params: {
        ...item,
      },
    })

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}
