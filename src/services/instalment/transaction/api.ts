import { axiosInstance, BaseResponseList, BaseResponse } from '../../network'
import { TransactionRequestModel, TransactionResponseModel } from './model'

export async function getTransaction_API(): Promise<[null, BaseResponseList<TransactionResponseModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponseList<TransactionResponseModel>>await axiosInstance.get('installment/transaction')

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}
export async function getSingleTransaction_API(id: number): Promise<[null, BaseResponse<TransactionResponseModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponse<TransactionResponseModel>>await axiosInstance.get(`installment/transaction/${id}`)

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}

export async function createTransaction_API(data: TransactionRequestModel): Promise<[null, boolean] | [Error, boolean]> {
  try {
    await axiosInstance.post('installment/transaction', data)

    return [null, true]
  } catch (error) {
    console.error(error)
    return [error as Error, false]
  }
}

export async function updateTransaction_API(data: TransactionRequestModel): Promise<[null, boolean] | [Error, boolean]> {
  try {
    await axiosInstance.put(`installment/transaction/${data.id}`, data)

    return [null, true]
  } catch (error) {
    console.error(error)
    return [error as Error, false]
  }
}
