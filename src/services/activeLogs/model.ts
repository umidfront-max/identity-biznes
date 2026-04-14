export interface LogsModel {
  id: number
  created_at: number
  description: string
  event: string
  subject_type: string
  subject_id: number
  user: UserModel
  properties: PropertiesModel
}
export interface PropertiesModel {
  attributes: {
    name: string
  }
  old: {
    name: string
  }
}
export interface UserModel {
  id: number
  username: string
  first_name: string
  last_name: string
  phone: string
  status: number
  avatar: AvatarModel
}
export interface AvatarModel {
  id: string
  type: number
  preview_path: string
  path: string
  name: string
  original_name: string
  mime: string
}
