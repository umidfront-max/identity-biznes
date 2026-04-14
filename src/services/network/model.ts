export interface BaseResponseList<T> {
  data: T[]
  sortables: string[]
  meta: {
    total: number
    per_page: number
  }
}

export interface BaseResponse<T> {
  data: T
  message: string
  success: boolean
}
