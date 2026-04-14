import { stringify } from 'qs'
import { contentType, debounce, messageName, timeout } from '/@/config'
import router from '/@/router'
import { RESET_ALL, _TOKEN, _deviceStore } from '/@/services/profile'
import { addErrorLog, needErrorLog } from '/@vab/plugins/errorLog'
import { gp } from '/@vab/plugins/vab'

let loadingInstance: any

const CODE_MESSAGE: any = {
  200: 'The server successfully returns the requested data',
  201: 'Create or modify data successfully',
  202: 'A request has entered the background queue (asynchronous task)',
  204: 'Data deleted successfully',
  400: 'Incorrect message sent',
  401: 'User does not have permission (token invalid, username, password incorrect, login expired)',
  402: 'Token expired',
  403: 'The user is authorized, but access is prohibited',
  404: 'The accessed resource does not exist',
  406: 'The requested format is not available',
  410: 'The requested resource has been permanently deleted and will not be seen',
  500: 'Server error',
  502: 'Gateway error',
  503: 'Service is unavailable, the server is temporarily overloaded or under maintenance',
  504: 'Gateway timeout',
}
export interface QueryDataModel {
  page: number
  per_page: number
  search: null | string
  sort: null | string
}
export function _queryData_DEFAULT() {
  const item: QueryDataModel = {
    page: 1,
    per_page: 10,
    search: null,
    sort: null,
  }

  return Object.assign({}, item)
}

/**
 * axios Request interceptor configuration
 * @param config
 * @returns {any}
 */
const requestConf = (config: any) => {
  // Non-standard writing method. You can customize headers according to the setting.config.js tokenName configuration.
  // if (token) config.headers[tokenName] = token

  config.headers['Device-Name'] = _deviceStore.value.deviceName
  config.headers['Device-Type'] = _deviceStore.value.deviceType
  config.headers[`Device-OS`] = _deviceStore.value.deviceOS

  // Standard writing method cannot be customized at will
  if (_TOKEN.value) config.headers['Authorization'] = `Bearer ${_TOKEN.value}`

  if (config.data && config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8')
    config.data = stringify(config.data)

  if (debounce.some((item: string) => config.url.includes(item))) loadingInstance = gp.$baseLoading()
  return config
}

/**
 * axios response interceptor
 * @param config {any} Request configuration
 * @param data {any} response data
 * @param status {any} HTTP status
 * @param statusText {any} HTTP status text
 * @returns {Promise<*|*>}
 */
const handleData = async ({ data, status, statusText }: { data: any; status: any; statusText: any }) => {
  if (loadingInstance) loadingInstance.close()
  switch (status) {
    case 200:
    case 201:
      return Promise.resolve(data)
    case 401:
      RESET_ALL()
      router.push({ path: '/login', replace: true })
      break
    case 403:
      router.push({ path: '/403' }).then(() => {})
      break
  }

  // Exception handling
  // If data.msg exists, overwrite the default reminder message
  const errMsg = `${data && data[messageName] ? data[messageName] : CODE_MESSAGE[status] ? CODE_MESSAGE[status] : statusText}`
  // Whether to display highlighted errors (consistent with errorHandler hook triggering logic)
  gp.$baseMessage(errMsg, 'error', 'hey')
  if (needErrorLog()) addErrorLog({ message: errMsg, stack: data, isRequest: true })
  return Promise.reject(data)
}

/**
 * @description axios initialization
 */

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BASE_URL}`,
  timeout,
  headers: {
    'Content-Type': contentType,
    // "Device-Type": _deviceStore.value.deviceType,
    // "Device-Name": _deviceStore.value.deviceName,
    // "Device-OS": _deviceStore.value.deviceOS,
  },
})

/**
 * @description axios request interceptor
 */
axiosInstance.interceptors.request.use(requestConf, (error) => {
  return Promise.reject(error)
})

/**
 * @description axios response interceptor
 */
axiosInstance.interceptors.response.use(
  (response) => handleData(response),
  (error) => {
    const { response } = error
    if (response === undefined) {
      if (loadingInstance) loadingInstance.close()
      gp.$baseMessage(
        'Failure to connect to the backend interface may be caused by the following reasons: the backend does not support cross-domain CORS, the interface address does not exist, the request times out, etc. Please contact the administrator to troubleshoot the backend interface problem.',
        'error',
        'hey'
      )
      return {}
    } else return handleData(response)
  }
)

// Mock API - backendsiz ishlash uchun
import { setupMockInterceptor } from '/@/mock'
setupMockInterceptor(axiosInstance)

export { axiosInstance }
