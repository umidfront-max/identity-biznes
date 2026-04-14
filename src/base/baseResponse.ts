export interface BaseResponse<T> {
  success: boolean | null
  data?: T
  message?: string
}
