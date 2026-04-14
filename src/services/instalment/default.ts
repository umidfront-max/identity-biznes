import { type InstalmentModel, CommentsModel, type ByPasportModel, InstalmentRequestModel, CardRequestModel } from './model'
import { getBranch_DEFAULT } from '../branch'
import { getTariff_DEFAULT } from '../tariff'
import { getCustomerPassportInfo_DEFAULT } from '../customer'
export function getInstallment_DEFAULT(): InstalmentModel {
  const object: InstalmentModel = {
    id: 0,
    customer_id: 0,
    customer: getCustomerPassportInfo_DEFAULT(),
    branch_id: 0,
    branch: getBranch_DEFAULT(),
    tariff_id: 0,
    tariff: getTariff_DEFAULT(),
    graphs: [],
    cards: [],
    guarantors: [],
    documents: [],
    images: [],
    comments: [],
    type: 0,
    amount: 0,
    initial_fee: 0,
    description: '',
    starts_in: 0,
    next_pay_date: 0,
    created_at: 0,
    updated_at: 0,
  }
  return object
}
export function getInstallmentRequest_DEFAULT(): InstalmentRequestModel {
  const object: InstalmentRequestModel = {
    customer_id: null,
    branch_id: '',
    tariff_id: '',
    amount: null,
    initial_fee: null,
    period: null,
    description: '',
    starts_in: '',
  }
  return object
}
export function getByPasport_DEFAULT(): ByPasportModel {
  const object: ByPasportModel = {
    passport_series: '',
    passport_number: null,
    pinfl: null,
  }
  return object
}
export function getCardRequest_DEFAULT(): CardRequestModel {
  const object: CardRequestModel = {
    customer_id: 0,
    number: '',
    expiry: '',
    phone: '',
  }
  return object
}
export function getCommentsModel_DEFAULT(): CommentsModel {
  const object: CommentsModel = {
    id: null,
    installment_id: null,
    creator_id: null,
    creator_name: '',
    comment: '',
  }
  return object
}
