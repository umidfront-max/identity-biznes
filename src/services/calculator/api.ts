import { axiosInstance } from '../network'
import { CalculatorModel, CalculatorResponseModel } from './model'

export async function getCalculator_API(item: CalculatorModel): Promise<[null, CalculatorResponseModel[]] | [Error, boolean]> {
  try {
    const response = <CalculatorResponseModel[]>await axiosInstance.post('/installment/calculator/calculate', item)

    return [null, response]
  } catch (error) {
    return [error as Error, false]
  }
}
