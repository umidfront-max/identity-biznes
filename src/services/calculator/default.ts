import { type CalculatorModel } from './model'

export function postCalculator_DEFAULT(): CalculatorModel {
  const object: CalculatorModel = {
    tariff_id: 0,
    amount: '',
    initial_amount: null,
    period: 0,
    portion: 0,
    id: 0,
  }
  return object
}
