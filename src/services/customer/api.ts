import { BaseResponseList, BaseResponse, axiosInstance } from '../network'
import {
  CustomerFullInfoModel,
  CustomerFullRequestInfoModel,
  ConfirmCardModel,
  CustomerContactPhoneModel,
  CustomerContactAddressModel,
} from './'
import { CardRequestModel, CardResponseModel } from '../instalment'
export async function customerCreate_API(
  items: CustomerFullRequestInfoModel
): Promise<[null, BaseResponseList<CustomerFullInfoModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponseList<CustomerFullInfoModel>>await axiosInstance.post('/customer', items)

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}

export async function createAddress_API(
  items: CustomerContactAddressModel,
  id: string
): Promise<[null, BaseResponseList<CustomerContactAddressModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponseList<CustomerContactAddressModel>>await axiosInstance.post(`/customer/${id}/address`, items)

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}
export async function createCard_API(items: CardRequestModel, id: string): Promise<[null, CardResponseModel] | [Error, boolean]> {
  try {
    const response = <BaseResponse<CardResponseModel>>await axiosInstance.post(`/customer/${id}/card`, items)

    return [null, response.data]
  } catch (error) {
    return [error as Error, false]
  }
}
export async function confirmCard_API(items: ConfirmCardModel, id: string): Promise<[null, CardResponseModel] | [Error, boolean]> {
  try {
    const response = <CardResponseModel>await axiosInstance.post(`/customer/${id}/confirm-card`, items)

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}
export async function createPhone_API(
  items: CustomerContactPhoneModel,
  id: string
): Promise<[null, BaseResponseList<CustomerContactPhoneModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponseList<CustomerContactPhoneModel>>await axiosInstance.post(`/customer/${id}/phone`, items)

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}
