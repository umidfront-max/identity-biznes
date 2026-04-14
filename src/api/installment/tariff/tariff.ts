import request from '/@/utils/request'
import { TariffDTO } from '/@/api/installment/tariff/dto/tariffDTO.ts'
import { BaseResponse } from '/@/base/baseResponse.ts'
import { BaseListRequest } from '/@/base/baseListRequest.ts'
import { BaseListResponse } from '/@/base/baseListResponse.ts'

export function getSingleTariff(id: number): Promise<BaseResponse<TariffDTO>> {
  return request({
    url: `installment/tariffs/${id}`,
    method: 'get',
  })
}

export function getTariffsList(query: BaseListRequest): Promise<BaseListResponse<TariffDTO>> {
  return request({
    url: 'installment/tariffs',
    method: 'get',
    params: query,
  })
}

export function createTariff(data: Omit<TariffDTO, 'id'>): Promise<BaseResponse<TariffDTO>> {
  return request({
    url: 'installment/tariffs',
    method: 'post',
    data,
  })
}

export function updateTariff(id: number, data: Omit<TariffDTO, 'id'>): Promise<BaseResponse<TariffDTO>> {
  return request({
    url: `installment/tariffs/${id}`,
    method: 'put',
    data,
  })
}

export function deleteTariffs(ids: number[]): Promise<BaseResponse<boolean>> {
  return request({
    url: 'installment/tariffs',
    method: 'delete',
    data: { ids },
  })
}
