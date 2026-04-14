import { BaseListRequest } from '/@/base/baseListRequest.ts'
import { BaseListResponse } from '/@/base/baseListResponse.ts'
import { BaseTableColumn } from '/@/base/baseTableColumn.ts'

export interface BaseState<T> {
  tableData?: BaseListResponse<T>
  currentFilters: BaseListRequest
  tableColumns: BaseTableColumn[]
}
