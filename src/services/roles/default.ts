import { type RoleModel } from './model'

export function getRole_DEFAULT(): RoleModel {
  const item: RoleModel = {
    id: 0,
    name: '',
    created_at: new Date(),
    updated_at: new Date(),
    permission_groups: [],
  }

  return item
}
