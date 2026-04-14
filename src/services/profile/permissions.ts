import { useStorage } from '@vueuse/core'
import { PERMISSION_ENUM } from '/@/router/pemissionsEnum'

export const _PermissionsStore = useStorage('_permissions', new Map())

export function hasAccess(permssion: PERMISSION_ENUM) {
  let access = false
  console.log('permssion', permssion)

  const object = _PermissionsStore.value.get(permssion)
  // console.log(_profileStore.value.permissions[permssion])
  // const object = _profileStore.value.permissions.get(permssion)
  console.log('object', object)

  if (object && object.all) {
    access = true
  }
  console.log('access', access)

  return access
}

export interface PermissionModel {
  user_view_all: {
    all: boolean
  }

  user_view: {
    all: boolean
  }

  user_create: {
    all: boolean
  }

  user_edit: {
    all: boolean
  }

  user_delete: {
    all: boolean
  }

  user_change_password: {
    all: boolean
  }

  user_change_avatar: {
    all: boolean
  }

  user_change_role: {
    all: boolean
  }

  user_devices: {
    all: boolean
  }

  user_revoke_device: {
    all: boolean
  }

  user_change_theme: {
    all: boolean
  }

  customer_view_all: {
    all: boolean
  }

  customer_view: {
    all: boolean
  }

  customer_create: {
    all: boolean
  }

  customer_info_by_passport: {
    all: boolean
  }

  customer_cards_view_all: {
    all: boolean
  }

  customer_cards_view: {
    all: boolean
  }

  customer_cards_create: {
    all: boolean
  }

  customer_cards_edit: {
    all: boolean
  }

  customer_cards_delete: {
    all: boolean
  }

  role_view_all: {
    all: boolean
  }

  role_view: {
    all: boolean
  }

  role_create: {
    all: boolean
  }

  role_edit: {
    all: boolean
  }

  role_delete: {
    all: boolean
  }

  role_permissions: {
    all: boolean
  }

  info_settings: {
    all: boolean
  }

  info_regions: {
    all: boolean
  }

  info_districts: {
    all: boolean
  }

  info_mahallas: {
    all: boolean
  }

  calculate_installment: {
    all: boolean
  }

  calculator_export: {
    all: boolean
  }

  installment_view_all: {
    all: boolean
  }
  installment_upload_document: {
    all: boolean
  }
  installment_finish: {
    all: boolean
  }
  installment_freeze: {
    all: boolean
  }
  installment_start: {
    all: boolean
  }
  activity_log_view_all: {
    all: boolean
  }
  installment_create_comment: {
    all: boolean
  }
  installment_update_comment: {
    all: boolean
  }
  installment_delete_comment: {
    all: boolean
  }
  installment_upload_image: {
    all: boolean
  }
  installment_delete_document: {
    all: boolean
  }
  installment_delete_image: {
    all: boolean
  }

  installment_view: {
    all: boolean
    branch_6: true
    branch_8: true
    branch_7: true
    branch_9: true
  }

  installment_create: {
    all: boolean
    branch_6: true
    branch_8: true
    branch_7: true
    branch_9: true
  }

  installment_edit: {
    all: boolean
    branch_6: true
    branch_8: true
    branch_7: true
    branch_9: true
  }

  installment_delete: {
    all: boolean
    branch_6: true
    branch_8: true
    branch_7: true
    branch_9: true
  }

  installment_attach_card: {
    all: boolean
    branch_6: true
    branch_8: true
    branch_7: true
    branch_9: true
  }

  installment_detach_card: {
    all: boolean
    branch_6: true
    branch_8: true
    branch_7: true
    branch_9: true
  }

  installment_attach_guarantor: {
    all: boolean
    branch_6: true
    branch_8: true
    branch_7: true
    branch_9: true
  }

  installment_update_guarantor: {
    all: boolean
    branch_6: true
    branch_8: true
    branch_7: true
    branch_9: true
  }

  installment_detach_guarantor: {
    all: boolean
    branch_6: true
    branch_8: true
    branch_7: true
    branch_9: true
  }

  tariff_view_all: {
    all: boolean
  }

  tariff_view: {
    all: boolean
  }

  tariff_edit: {
    all: boolean
  }

  tariff_delete: {
    all: boolean
  }

  tariff_create: {
    all: boolean
  }

  transaction_view_all: {
    all: boolean
    branch_6: true
    branch_8: true
    branch_7: true
    branch_9: true
  }

  transaction_view: {
    all: boolean
    branch_6: true
    branch_8: true
    branch_7: true
    branch_9: true
  }

  transaction_create: {
    all: boolean
    branch_6: true
    branch_8: true
    branch_7: true
    branch_9: true
  }

  transaction_edit: {
    all: boolean
    branch_6: true
    branch_8: true
    branch_7: true
    branch_9: true
  }

  transaction_delete: {
    all: boolean
    branch_6: true
    branch_8: true
    branch_7: true
    branch_9: true
  }

  transaction_type_view_all: {
    all: boolean
  }

  transaction_type_view: {
    all: boolean
  }

  transaction_type_create: {
    all: boolean
  }

  transaction_type_edit: {
    all: boolean
  }

  transaction_type_delete: {
    all: boolean
  }

  branch_view_all: {
    all: boolean
  }

  branch_view: {
    all: boolean
  }

  branch_edit: {
    all: boolean
  }

  branch_delete: {
    all: boolean
  }

  branch_create: {
    all: boolean
  }

  scoring_credit_history_view_all: {
    all: boolean
  }

  scoring_credit_history_view: {
    all: boolean
  }

  scoring_credit_history_create: {
    all: boolean
  }

  scoring_inps_history_view_all: {
    all: boolean
  }

  scoring_inps_history_view: {
    all: boolean
  }

  scoring_inps_history_create: {
    all: boolean
  }

  scoring_pension_info_view_all: {
    all: boolean
  }

  scoring_pension_info_view: {
    all: boolean
  }

  scoring_pension_info_create: {
    all: boolean
  }

  scoring_mib_info_view_all: {
    all: boolean
  }

  scoring_mib_info_view: {
    all: boolean
  }

  scoring_mib_info_create: {
    all: boolean
  }

  scoring_tax_info_view_all: {
    all: boolean
  }

  scoring_tax_info_view: {
    all: boolean
  }

  scoring_tax_info_create: {
    all: boolean
  }

  scoring_humo_view_all: {
    all: boolean
  }

  scoring_humo_view: {
    all: boolean
  }

  scoring_humo_create: {
    all: boolean
  }

  scoring_uzcard_view_all: {
    all: boolean
  }

  scoring_uzcard_view: {
    all: boolean
  }

  scoring_uzcard_create: {
    all: boolean
  }

  profile_edit: {
    all: boolean
  }

  profile_change_password: {
    all: boolean
  }

  profile_change_language: {
    all: boolean
  }

  profile_change_avatar: {
    all: boolean
  }

  profile_devices: {
    all: boolean
  }

  profile_revoke_device: {
    all: boolean
  }

  profile_change_theme: {
    all: boolean
  }

  scoring_credit_history_delete: {
    all: boolean
  }

  scoring_inps_history_delete: {
    all: boolean
  }

  scoring_pension_info_delete: {
    all: boolean
  }

  scoring_mib_info_delete: {
    all: boolean
  }

  scoring_tax_info_delete: {
    all: boolean
  }

  scoring_humo_delete: {
    all: boolean
  }

  scoring_uzcard_delete: {
    all: boolean
  }
}
