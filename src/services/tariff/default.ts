import { type TariffModel } from './model'

export function getTariff_DEFAULT(): TariffModel {
  const object: TariffModel = {
    id: 0,
    name: '',
    is_annual: '',
    percent: '',
    min_amount: '',
    max_amount: '',
    min_initial_fee: '',
    max_initial_fee: '',
    max_period: '',
    min_period: '',
  }

  return object
}
