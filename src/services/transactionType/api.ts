import { axiosInstance, BaseResponseList, BaseResponse } from '../network'
import { TransactionTypeModel } from './model'

export async function getTransactionType_API(): Promise<[null, BaseResponseList<TransactionTypeModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponseList<TransactionTypeModel>>await axiosInstance.get('installment/transaction-type')

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}
export async function getSingleTransactionType_API(id: number): Promise<[null, BaseResponse<TransactionTypeModel>] | [Error, boolean]> {
  try {
    const response = <BaseResponse<TransactionTypeModel>>await axiosInstance.get(`installment/transaction-type/${id}`)

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}

export async function createTransactionType_API(data: TransactionTypeModel): Promise<[null, boolean] | [Error, boolean]> {
  try {
    await axiosInstance.post('installment/transaction-type', { name: data.name })

    return [null, true]
  } catch (error) {
    console.error(error)
    return [error as Error, false]
  }
}

export async function updateTransactionType_API(data: TransactionTypeModel): Promise<[null, boolean] | [Error, boolean]> {
  try {
    await axiosInstance.put(`installment/transaction-type/${data.id}`, data)

    return [null, true]
  } catch (error) {
    console.error(error)
    return [error as Error, false]
  }
}
