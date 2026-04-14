import { BaseTableColumnType } from '/@/base/baseTableColumnType.ts'

export interface BaseTableColumn {
  type?: BaseTableColumnType
  label: string
  prop: string
  sortable?: boolean
  filterable?: boolean
  disableCheck?: boolean
  checked?: boolean
  displayUsing?: (row: any) => string
}
