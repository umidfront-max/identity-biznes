import { type TemplateThemeModel } from '../templateTheme'

export interface AvatarModel {
  id: string
  type: number
  preview_link: string
  link: string
  name: string
  original_name: string
  mime: string
}

export interface DeviceModel {
  deviceName: string
  deviceOS: string
  deviceType: string
}

export interface ProfileModel {
  id: number
  username: string
  first_name: string
  last_name: string
  phone: string
  status: PROFIL_STATUS_ENUM
  avatar: AvatarModel
  permissions: any
  template_theme: TemplateThemeModel[]
  language: string
}
export interface ProfilePasswordModel {
  password: string
  password_confirmation: string
}
export enum PROFIL_STATUS_ENUM {
  ACTIVE = 1,
  INACTIVE = 0,
}
