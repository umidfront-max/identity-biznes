import { getCustomerPassportInfo_DEFAULT } from './default'
import { type CustomerPassportInfoModel } from './model'

export const _customerPassportInfoStore = ref<CustomerPassportInfoModel>(getCustomerPassportInfo_DEFAULT())
