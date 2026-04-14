import { axiosInstance, BaseResponseList, BaseResponse } from '../network'
import { UsersResponseModel } from './model'

export async function getUser_API(): Promise<[null, BaseResponseList<UsersResponseModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponseList<UsersResponseModel>>await axiosInstance.get('users')

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}
export async function getSingleUser_API(id: number): Promise<[null, BaseResponse<UsersResponseModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponse<UsersResponseModel>>await axiosInstance.get(`users/${id}`)

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}

export async function createUser_API(data: UsersResponseModel): Promise<[null, boolean] | [Error, boolean]> {
  try {
    const response = <UsersResponseModel>await axiosInstance.post('users', data)
    console.log(response)

    return [null, true]
  } catch (error) {
    console.error(error)
    return [error as Error, false]
  }
}

export async function updateUser_API(data: UsersResponseModel): Promise<[null, boolean] | [Error, boolean]> {
  try {
    const response = <UsersResponseModel>await axiosInstance.put(`users/${data.id}`, data)
    console.log(response)

    return [null, true]
  } catch (error) {
    console.error(error)
    return [error as Error, false]
  }
}
