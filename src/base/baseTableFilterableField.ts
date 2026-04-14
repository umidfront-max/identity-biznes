import { BaseTableColumnType } from '/@/base/baseTableColumnType.ts'

export interface BaseTableFilterableField {
  type?: BaseTableColumnType
  label: string
  prop: string
}
