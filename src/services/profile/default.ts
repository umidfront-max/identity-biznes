import { AvatarModel, PROFIL_STATUS_ENUM, type DeviceModel, type ProfileModel } from '.'

export function device_DEFAULT(): DeviceModel {
  const object: DeviceModel = {
    deviceName: '',
    deviceOS: '',
    deviceType: '',
  }

  return object
}

export function getAvatar_DEFAULT(): AvatarModel {
  const object: AvatarModel = {
    id: '',
    type: 0,
    preview_link: '',
    link: '',
    name: '',
    original_name: '',
    mime: '',
  }

  return object
}

export function getProfile_DEFAULT(): ProfileModel {
  const object: ProfileModel = {
    id: 0,
    username: '',
    first_name: '',
    last_name: '',
    phone: '',
    status: PROFIL_STATUS_ENUM.INACTIVE,
    avatar: getAvatar_DEFAULT(),
    permissions: new Map(),
    template_theme: [],
    language: '',
  }

  return object
}
