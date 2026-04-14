import { type LogsModel, UserModel, PropertiesModel, AvatarModel } from './model'

export function getLogs_DEFAULT(): LogsModel {
  const object: LogsModel = {
    id: 0,
    event: '',
    description: '',
    subject_type: '',
    subject_id: 0,
    user: getUser_DEFAULT(),
    properties: getProperties_DEFAULT(),
    created_at: 0,
  }

  return object
}
export function getAvatar_DEFAULT(): AvatarModel {
  const object: AvatarModel = {
    id: '',
    type: 0,
    preview_path: '',
    path: '',
    name: '',
    original_name: '',
    mime: '',
  }

  return object
}

export function getUser_DEFAULT(): UserModel {
  const object: UserModel = {
    id: 0,
    username: '',
    first_name: '',
    last_name: '',
    phone: '',
    status: 0,
    avatar: getAvatar_DEFAULT(),
  }

  return object
}
export function getProperties_DEFAULT(): PropertiesModel {
  const object: PropertiesModel = {
    attributes: {
      name: '',
    },
    old: {
      name: '',
    },
  }

  return object
}
