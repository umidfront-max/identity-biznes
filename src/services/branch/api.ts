import { axiosInstance, BaseResponseList, BaseResponse } from '../network'
import { BranchModel } from './model'

export async function getBranch_API(): Promise<[null, BaseResponseList<BranchModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponseList<BranchModel>>await axiosInstance.get('/management/branches')

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}

export async function getSingleBranch_API(id: number): Promise<[null, BaseResponse<BranchModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponse<BranchModel>>await axiosInstance.get(`/management/branches/${id}`)

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}
export async function createBranch_API(data: BranchModel): Promise<[null, boolean] | [Error, boolean]> {
  try {
    <BranchModel>await axiosInstance.post('/management/branches', data)

    return [null, true]
  } catch (error) {
    console.error(error)
    return [error as Error, false]
  }
}
export async function updateBranch_API(data: BranchModel): Promise<[null, boolean] | [Error, boolean]> {
  try {
    <BranchModel>await axiosInstance.put(`/management/branches/${data.id}`, data)

    return [null, true]
  } catch (error) {
    console.error(error)
    return [error as Error, false]
  }
}
