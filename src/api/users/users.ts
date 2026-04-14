import request from '/@/utils/request'
import { BaseResponse } from '/@/base/baseResponse.ts'
import { BaseListRequest } from '/@/base/baseListRequest.ts'
import { BaseListResponse } from '/@/base/baseListResponse.ts'

import { UsersResponseDTO, UsersRequestDTO } from '/@/api/users/dto/usersDTO'

export function getSingleUser(id: number): Promise<BaseResponse<UsersResponseDTO>> {
  return request({
    url: `users/${id}`,
    method: 'get',
  })
}

export function getUsersList(query: BaseListRequest): Promise<BaseListResponse<UsersResponseDTO>> {
  return request({
    url: 'users',
    method: 'get',
    params: query,
  })
}

export function createUser(data: Omit<UsersRequestDTO, 'id'>): Promise<BaseResponse<UsersResponseDTO>> {
  return request({
    url: 'users',
    method: 'post',
    data,
  })
}

export function updateUser(id: number, data: Omit<UsersRequestDTO, 'id'>): Promise<BaseResponse<UsersResponseDTO>> {
  return request({
    url: `users/${id}`,
    method: 'put',
    data,
  })
}

export function deleteUsers(ids: number[]): Promise<BaseResponse<boolean>> {
  return request({
    url: 'users',
    method: 'delete',
    data: { ids },
  })
}

export function deleteUser(ids: number[]): Promise<BaseResponse<boolean>> {
  return request({
    url: 'users',
    method: 'delete',
    data: { ids },
  })
}
