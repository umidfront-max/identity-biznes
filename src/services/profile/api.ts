import { type ProfileModel, ProfilePasswordModel } from './model'
import { axiosInstance, type BaseResponse, BaseResponseList, QueryDataModel } from '/@/services/network'
import { LogsModel } from '/@/services/activeLogs'
export async function login_API(username: string, password: string): Promise<[null, BaseResponse<{ token: string }>] | [Error, boolean]> {
  try {
    const response = <BaseResponse<{ token: string }>>await axiosInstance.post('/login', {
      username,
      password,
    })

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}

export async function getProfile_API(): Promise<[null, BaseResponse<ProfileModel>] | [Error, null]> {
  try {
    const response = <BaseResponse<ProfileModel>>await axiosInstance.get('/profile/me')

    return [null, response]
  } catch (error) {
    return [error as Error, null]
  }
}

export async function logout_API() {
  try {
    const response = <BaseResponse<string>>await axiosInstance.post('/logout')

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}
export async function ProfilePassword_API(item: ProfilePasswordModel): Promise<[null, boolean] | [Error, null]> {
  try {
    const response = <boolean>await axiosInstance.post('/profile/change-password', item)

    return [null, response]
  } catch (error) {
    return [error as Error, null]
  }
}
export async function getOwnLogs_API(item: QueryDataModel): Promise<[null, BaseResponseList<LogsModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponseList<LogsModel>>await axiosInstance.get('/log/own', {
      params: {
        ...item,
      },
    })

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}
