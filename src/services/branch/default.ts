import { type BranchModel } from './model'

export function getBranch_DEFAULT(): BranchModel {
  const object: BranchModel = {
    id: 0,
    inn: 0,
    name: '',
    address: '',
    created_at: 0,
    updated_at: 0,
  }

  return object
}
