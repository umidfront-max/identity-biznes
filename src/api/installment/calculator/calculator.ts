import request from '/@/utils/request'
import { CalculatorDTO } from '/@/api/installment/calculator/dto/calculatorDTO.ts'
import { BaseResponse } from '/@/base/baseResponse.ts'

export function createCalculator(data: Omit<CalculatorDTO, 'id'>): Promise<BaseResponse<CalculatorDTO[]>> {
  return request({
    url: 'installment/calculator/calculate',
    method: 'post',
    data,
  })
}
