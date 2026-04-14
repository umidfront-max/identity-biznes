import { BranchResponseDTO, BranchRequestDTO } from './dto/branchesDTO'
import { BaseResponse } from '/@/base/baseResponse.ts'
import { BaseListRequest } from '/@/base/baseListRequest.ts'
import { BaseListResponse } from '/@/base/baseListResponse.ts'
import request from '/@/utils/request'

export function getSingleBranch(id: number): Promise<BaseResponse<BranchResponseDTO>> {
  return request({
    url: `/management/branches/${id}`,
    method: 'get',
  })
}

export function getBranchesList(query: BaseListRequest): Promise<BaseListResponse<BranchResponseDTO>> {
  return request({
    url: '/management/branches',
    method: 'get',
    params: query,
  })
}

export function createBranch(data: Omit<BranchRequestDTO, 'id'>): Promise<BaseResponse<BranchResponseDTO>> {
  return request({
    url: '/management/branches',
    method: 'post',
    data,
  })
}

export function updateBranch(id: number, data: Omit<BranchRequestDTO, 'id'>): Promise<BaseResponse<BranchResponseDTO>> {
  return request({
    url: `/management/branches/${id}`,
    method: 'put',
    data,
  })
}

export function deleteBranches(ids: number[]): Promise<BaseResponse<boolean>> {
  return request({
    url: '/management/branches',
    method: 'delete',
    data: { ids },
  })
}
