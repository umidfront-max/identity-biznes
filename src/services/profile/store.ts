import { useStorage } from '@vueuse/core'
import { device_DEFAULT, DeviceModel, getProfile_DEFAULT } from '.'
import { useTabsStore } from '/@/store/modules/tabs.ts'

export const _deviceStore = useStorage<DeviceModel>('device-store', device_DEFAULT())
export const _profileStore = useStorage('profile', getProfile_DEFAULT)
export const _TOKEN = useStorage('token', '')

export function RESET_ALL() {
  _TOKEN.value = ''
  _profileStore.value = getProfile_DEFAULT()
  _deviceStore.value = device_DEFAULT()

  localStorage.clear()
  sessionStorage.clear()

  const tabsStore = useTabsStore()
  tabsStore.delAllVisitedRoutes()
}
