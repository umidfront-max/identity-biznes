export interface BranchRequestDTO {
  id: number
  inn: number
  name: string
  address: string
}
export interface BranchResponseDTO {
  id?: number
  inn: number
  name: string
  address: string
  created_at: number
  updated_at: number
}
export interface UserStoreType<T> {
  formData: T
  list: null | object
  initialFormData: T
}
