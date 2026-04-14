import { type AttachPermissionModel, type RoleModel } from './model'
import { BaseResponse, BaseResponseList, axiosInstance } from '/@/services/network'

export async function getRoles_API(): Promise<[null, BaseResponseList<RoleModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponseList<RoleModel>>await axiosInstance.get('/roles')

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}
export async function attachRole_API(id: string, role_id: string): Promise<[null, BaseResponseList<RoleModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponseList<RoleModel>>await axiosInstance.post(`/users/${id}/attach-role`, { role_id })

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}

export async function getSingleRole_API(id: number): Promise<[null, BaseResponse<RoleModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponse<RoleModel>>await axiosInstance.get(`/roles/${id}`)

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}

export async function attachPermissionToRole_API(
  id: number,
  payload: AttachPermissionModel[]
): Promise<[null, BaseResponse<RoleModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponse<RoleModel>>await axiosInstance.post(`/roles/${id}/attach-permissions`, payload)

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}

export async function createRole_API(payload: RoleModel): Promise<[null, BaseResponseList<RoleModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponseList<RoleModel>>await axiosInstance.post('/roles', {
      name: payload.name,
    })

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}

export async function updateRole_API(payload: RoleModel): Promise<[null, BaseResponseList<RoleModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponseList<RoleModel>>await axiosInstance.put(`/roles/${payload.id}`, {
      name: payload.name,
    })

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}

export async function deleteRole_API(ids: number[]): Promise<[null, BaseResponseList<RoleModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponseList<RoleModel>>await axiosInstance.delete('/roles', {
      data: {
        ids,
      },
    })

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}
