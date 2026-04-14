import { _PermissionsStore, _profileStore } from '../services/profile'
import { PERMISSION_ENUM } from '/@/router/pemissionsEnum'
import { isArray } from '/@/utils/validate.ts'
/**
 * Whether the target permission element can be accessed
 * @param target target(route|button) requires permission
 * @returns {boolean} Meet access conditions
 */
export function hasPermission(target: any) {
  if (_profileStore.value) return true
  // TODO check permissions after AVTO-14
  if (isArray(target) && target.length > 0)
    return can([], {
      permission: target,
      mode: 'oneOf',
    })
  // return can([...getRole, ...getPermission], {
  //   permission: target,
  //   mode: 'oneOf',
  // })
  // const { role, permission, mode = 'oneOf' } = target
  // return can([mode !== 'except'], {
  //   permission: [role ? can(getRole, { permission: role, mode }) : false, permission ? can(getPermission, { permission, mode }) : false],
  //   mode,
  // })
}

/**
 * Check if permissions are met
 * @param roleOrPermission Current user permissions
 * @param target target(route|button) requires permission
 * @returns {boolean} Meet access conditions
 */
function can(roleOrPermission: (string | boolean)[], target: any) {
  let hasRole = false
  const { permission, mode } = target
  if (mode === 'allOf') hasRole = permission.every((item: string) => roleOrPermission.includes(item))
  if (mode === 'oneOf') hasRole = permission.some((item: string) => roleOrPermission.includes(item))
  if (mode === 'except') hasRole = !permission.every((item: string) => roleOrPermission.includes(item))
  return hasRole
}

export function hasAccess(permssion: PERMISSION_ENUM) {
  let access = false

  const object = _PermissionsStore.value.get(permssion)

  if (object && object.all) {
    access = true
  }

  return access
}
