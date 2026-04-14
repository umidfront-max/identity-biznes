import { PensionDTORequest, PensionDTOResponse } from './dto/pensionDTO'
import { BaseListRequest } from '/@/base/baseListRequest.ts'
import { BaseListResponse } from '/@/base/baseListResponse.ts'
import { BaseResponse } from '/@/base/baseResponse.ts'
import request from '/@/utils/request'

export function getPensionInfoList(query: BaseListRequest): Promise<BaseListResponse<PensionDTOResponse>> {
  return request({
    url: `/scoring/pension-info`,
    method: 'get',
    params: query,
  })
}

export function createPensionInfo(data: Omit<PensionDTORequest, 'id'>): Promise<BaseResponse<PensionDTOResponse>> {
  return request({
    url: `/scoring/pension-info/create`,
    method: 'post',
    data,
  })
}
