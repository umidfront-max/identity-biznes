declare interface FormState {
  formData: any
  initialFormData: any
  list: object[]
  endpoint?: string
  theme?: any
}

declare interface StaticLists {
  annuityList: SelectOption[]
  layoutList: string[]
}

declare interface Tariff {
  id?: number | null
  name: any
  is_annual: boolean | null | object
  percent: number
  min_amount: number
  max_amount: number
  min_initial_fee: number
  max_initial_fee: number
}
declare interface Branch {
  id?: number | null
  inn: number | null
  name: string
  address: string
}

export declare interface UserInterface {
  id?: number | null
  avatar?: { preview_link: string } | any
  template_theme?: any
  username: string
  phone: any
  first_name: string
  last_name: string
  status: boolean
  password: any
  password_confirmation: any
}
