import Profile from '/@/api/user/dto/profile.ts'
import { BaseResponse } from '/@/base/baseResponse.ts'
import { axiosInstance } from '/@/services/network'
import request from '/@/utils/request'

export async function login(username: string, password: string): Promise<[null, BaseResponse<string>] | [Error, boolean]> {
  try {
    const response = <BaseResponse<string>>await axiosInstance.post('/login', {
      username,
      password,
    })

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}

export function getProfile(): Promise<BaseResponse<Profile>> {
  return request({
    url: 'profile/me',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  })
}
