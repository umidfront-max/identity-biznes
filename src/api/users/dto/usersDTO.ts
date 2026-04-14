import { BaseListRequest } from '/@/base/baseListRequest.ts'
import { BaseListResponse } from '/@/base/baseListResponse.ts'
import { BaseTableColumn } from '/@/base/baseTableColumn.ts'
export interface UsersRequestDTO {
  id?: number | null
  inn: number | null
  name: string
  address: string
}
export interface UsersResponseDTO {
  id: null | number
  username: string
  phone: string
  first_name: string
  last_name: string
  status: boolean
  password: null | number
  password_confirmation: null | number
}
export interface UserStoreType<T> {
  formData: T
  list: null | object
  theme: null
  tableData?: BaseListResponse<T>
  currentFilters: BaseListRequest
  tableColumns: BaseTableColumn[]
}
