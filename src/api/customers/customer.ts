import {
  CustomerAddressesDTO,
  CustomerPasportResponseDTO,
  CustomerPhonesDTO,
  DistrictsDTO,
  MahallasDTO,
  RegionsDTO,
  SuccessCustomerResponse,
} from './dto/customerDto'
import { BaseListRequest } from '/@/base/baseListRequest.ts'
import { BaseListResponse } from '/@/base/baseListResponse.ts'
import { BaseResponse } from '/@/base/baseResponse.ts'
import request from '/@/utils/request'

export function getCustomerList(query: BaseListRequest): Promise<BaseListResponse<SuccessCustomerResponse>> {
  return request({
    url: 'customer',
    method: 'get',
    params: query,
  })
}
export function postPasportInfo(data: Omit<CustomerPasportResponseDTO, 'id'>): Promise<BaseResponse<CustomerPasportResponseDTO>> {
  return request({
    url: 'customer/info-by-passport',
    method: 'post',
    data,
  })
}
export function getRegionInfo(): Promise<BaseResponse<RegionsDTO[]>> {
  return request({
    url: 'info/regions',
    method: 'get',
  })
}
export function getDistrictInfo(id: number): Promise<BaseResponse<DistrictsDTO[]>> {
  return request({
    url: `info/districts`,
    method: 'get',
    params: { region_id: id },
  })
}
export function getMahallasInfo(id: number): Promise<BaseResponse<MahallasDTO[]>> {
  return request({
    url: `info/mahallas`,
    method: 'get',
    params: { district_id: id },
  })
}
export function customerCreate(
  data: CustomerPasportResponseDTO,
  phones: CustomerPhonesDTO[],
  addresses: CustomerAddressesDTO[]
): Promise<BaseResponse<SuccessCustomerResponse>> {
  const phoneItem = phones.map((item: CustomerPhonesDTO) => {
    const contact: CustomerPhonesDTO = {
      type: item.type,
      comment: item.comment,
      phone: item.phone?.split(' ').join(''),
    }
    return contact
  })
  return request({
    url: 'customer/create',
    method: 'post',
    data: { ...data, phones: phoneItem, addresses },
  })
}
export function getSingleCustomer(id: number): Promise<BaseResponse<CustomerPasportResponseDTO>> {
  return request({
    url: `customer/${id}`,
    method: 'get',
  })
}
