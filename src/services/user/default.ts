import { type UsersRequestModel, type UsersResponseModel, type UserRoleModel } from './model'

export function userResponse_DEFAULT(): UsersResponseModel {
  const object: UsersResponseModel = {
    id: 0,
    username: '',
    phone: '',
    first_name: '',
    role: userRole_DEFAULT(),
    last_name: '',
    status: 0,
    password: null,
    password_confirmation: null,
  }

  return object
}
export function userRequest_DEFAULT(): UsersRequestModel {
  const object: UsersRequestModel = {
    id: 0,
    inn: null,
    name: '',
    address: '',
  }
  return object
}
export function userRole_DEFAULT(): UserRoleModel {
  const object: UserRoleModel = {
    created_at: '',
    id: '',
    name: '',
    updated_at: '',
  }
  return object
}
