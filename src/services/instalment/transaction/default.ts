import { type TransactionResponseModel, InstallmentModel, TransactionRequestModel, TransactionTypeResModel } from './model'
import { getCustomerShortDetails_DEFAULT } from '../../customer'
export function getTransactionResponse_DEFAULT(): TransactionResponseModel {
  const object: TransactionResponseModel = {
    id: 0,
    installment_id: 0,
    installment: getInstallmentModel_DEFAULT(),
    customer_id: 0,
    customer: getCustomerShortDetails_DEFAULT(),
    card_id: 0,
    card: null,
    transaction_type_id: 0,
    transaction_type: getTransactionType_DEFAULT(),
    amount: 0,
    created_at: 0,
    updated_at: 0,
  }
  return object
}
export function getInstallmentModel_DEFAULT(): InstallmentModel {
  const object: InstallmentModel = {
    id: 0,
    customer_id: 0,
    branch_id: 0,
    tariff_id: 0,
    type: 0,
    amount: '',
    initial_fee: '',
    description: '',
    sms_notify: false,
    any_card_charge: false,
    is_blacklist: false,
    status: 0,
    period: 0,
    plum_id: null,
    starts_in: '',
    next_pay_date: null,
    created_at: '',
    updated_at: '',
    deleted_at: null,
    withdrawn_auto_charge: false,
  }
  return object
}

export function getTransactionType_DEFAULT(): TransactionTypeResModel {
  const object: TransactionTypeResModel = {
    created_at: '',
    deleted_at: null,
    id: 0,
    is_system: false,
    name_en: '',
    name_ru: '',
    name_uz: '',
    updated_at: '',
  }
  return object
}

export function getTransactionRequest_DEFAULT(): TransactionRequestModel {
  const object: TransactionRequestModel = {
    installment_id: '',
    customer_id: '',
    transaction_type_id: '',
    amount: '',
  }
  return object
}
