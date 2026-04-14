import { getInstallment_DEFAULT, getInstallmentRequest_DEFAULT, getByPasport_DEFAULT } from './default'
import { type InstalmentModel, InstalmentRequestModel, ByPasportModel } from './model'

export const _instalmentStore = ref<InstalmentRequestModel>(getInstallmentRequest_DEFAULT())
export const _creditStore = ref<InstalmentModel>(getInstallment_DEFAULT())
export const _byPasportStore = ref<ByPasportModel>(getByPasport_DEFAULT())
