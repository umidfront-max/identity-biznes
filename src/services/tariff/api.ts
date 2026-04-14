import { axiosInstance, BaseResponseList, BaseResponse } from '../network'
import { TariffModel } from './model'

export async function getTariff_API(): Promise<[null, BaseResponseList<TariffModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponseList<TariffModel>>await axiosInstance.get('installment/tariffs')

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}
export async function singleTariff_API(id: number): Promise<[null, BaseResponse<TariffModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponse<TariffModel>>await axiosInstance.get(`installment/tariffs/${id}`)

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}

export async function createTariff_API(data: TariffModel): Promise<[null, boolean] | [Error, boolean]> {
  try {
    await axiosInstance.post('installment/tariffs', data)

    return [null, true]
  } catch (error) {
    console.error(error)
    return [error as Error, false]
  }
}

export async function updateTariff_API(data: TariffModel): Promise<[null, boolean] | [Error, boolean]> {
  try {
    await axiosInstance.put(`installment/tariffs/${data.id}`, data)

    return [null, true]
  } catch (error) {
    console.error(error)
    return [error as Error, false]
  }
}
