export interface TariffModel {
  id: number
  name: string
  is_annual: boolean | string
  percent: number | string
  min_amount: number | string
  max_amount: number | string
  min_initial_fee: number | string
  max_initial_fee: number | string
  max_period: number | string
  min_period: number | string
}

export enum TARIFF_TYPES_ENUM {
  ANNUITY = 'Annuity',
  DIFFERENTIAL = 'Dependent',
}

export const TARIFF_TYPES = new Map<TARIFF_TYPES_ENUM, { label: string; value: string }>().set(TARIFF_TYPES_ENUM.ANNUITY, {
  label: 'Annuity',
  value: 'Annuity',
})
TARIFF_TYPES.set(TARIFF_TYPES_ENUM.DIFFERENTIAL, {
  label: 'Dependent',
  value: 'Dependent',
})
