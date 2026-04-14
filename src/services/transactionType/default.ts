import { type TransactionTypeModel } from './model'

export function getTransactionType_DEFAULT(): TransactionTypeModel {
  const object: TransactionTypeModel = {
    name: '',
    is_system: false,
    created_at: 0,
    updated_at: 0,
  }
  return object
}
