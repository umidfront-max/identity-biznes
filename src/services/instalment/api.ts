import { axiosInstance, BaseResponseList, BaseResponse } from '../network'
import { InstalmentModel, ByPasportModel, InstalmentRequestModel, CommentsModel } from './model'
import { CustomerFullRequestInfoModel } from '../customer'
export async function getInstalments_API(): Promise<[null, BaseResponseList<InstalmentModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponseList<InstalmentModel>>await axiosInstance.get('installment/installment')

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}
export async function postCustomerByPasport_API(
  data: ByPasportModel
): Promise<[null, BaseResponse<CustomerFullRequestInfoModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponse<CustomerFullRequestInfoModel>>await axiosInstance.post('/customer/by-passport', data)

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}
export async function singleInstallment_API(id: number): Promise<[null, BaseResponse<InstalmentModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponse<InstalmentModel>>await axiosInstance.get(`installment/installment/${id}`)

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}

export async function createInstallment_API(data: InstalmentRequestModel): Promise<[null, boolean] | [Error, boolean]> {
  try {
    await axiosInstance.post('installment/installment', data)

    return [null, true]
  } catch (error) {
    console.error(error)
    return [error as Error, false]
  }
}
export async function updateInstallment_API(data: InstalmentModel): Promise<[null, boolean] | [Error, boolean]> {
  try {
    await axiosInstance.put(`installment/installment/${data.id}`, data)

    return [null, true]
  } catch (error) {
    console.error(error)
    return [error as Error, false]
  }
}

export async function createComment_API(data: CommentsModel, id: string): Promise<[null, boolean] | [Error, boolean]> {
  try {
    await axiosInstance.post(`installment/installment/${id}/comment`, {
      comment: data.comment,
    })

    return [null, true]
  } catch (error) {
    console.error(error)
    return [error as Error, false]
  }
}
export async function createGuarantor_API(customer_id: number, id: number): Promise<[null, boolean] | [Error, boolean]> {
  try {
    await axiosInstance.post(`installment/installment/${id}/attach-guarantor`, {
      customer_id,
    })

    return [null, true]
  } catch (error) {
    console.error(error)
    return [error as Error, false]
  }
}
export async function updateComment_API(data: CommentsModel): Promise<[null, boolean] | [Error, boolean]> {
  try {
    await axiosInstance.put(`installment/installment/comment/${data.id}`, {
      comment: data.comment,
    })

    return [null, true]
  } catch (error) {
    console.error(error)
    return [error as Error, false]
  }
}
export async function createDocument_API(data: any, id: number) {
  try {
    const formData = new FormData()
    formData.append('file', data)

    const response = await axiosInstance({
      url: `installment/installment/${id}/document`,
      method: 'POST',
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return [null, response.data]
  } catch (error) {
    return [error, null]
  }
}
export async function createImage_API(data: any, id: number) {
  try {
    const formData = new FormData()
    formData.append('file', data)
    const response = await axiosInstance({
      url: `installment/installment/${id}/image`,
      method: 'POST',
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return [null, response.data]
  } catch (error) {
    return [error, null]
  }
}
