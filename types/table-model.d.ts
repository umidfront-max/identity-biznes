declare interface QueryBody {
  search?: string
  sort?: string
  per_page?: string | number
  current_page?: string | number
}

declare interface TableCol {
  key: any
  label: string
  width?: any
}
