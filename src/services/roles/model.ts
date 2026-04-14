export interface RoleModel {
  id: number
  name: string
  permission_groups: PermissionGroupModel[]
  created_at: Date
  updated_at: Date
}

export interface PermissionGroupModel {
  id: number
  name: string
  permissions: PermissionModel[]
  slug: string
}

export interface PermissionModel {
  branches: PermissionBranchModel[]
  id: number
  name: string
  slug: string
}

export interface PermissionBranchModel {
  editable: boolean
  enabled: boolean
  id: number
  name: string
}

export interface AttachPermissionModel {
  permission_id: number
  branch_id: number
  enabled: boolean
}
