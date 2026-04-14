export interface UsersResponseModel {
  id: number
  username: string
  phone: string
  first_name: string
  last_name: string
  role: UserRoleModel
  status: number
  password: null | number
  password_confirmation: null | number
}
export interface UsersRequestModel {
  id: number
  inn: number | null
  name: string
  address: string
}
export interface UserRoleModel {
  created_at: string
  id: string
  name: string
  updated_at: string
}
