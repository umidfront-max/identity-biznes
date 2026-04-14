import { getCustomerFullRequestInfo_DEFAULT } from './default'
import { type CustomerFullRequestInfoModel } from './model'

export const _customerFullInfoStore = ref<CustomerFullRequestInfoModel>(getCustomerFullRequestInfo_DEFAULT())
