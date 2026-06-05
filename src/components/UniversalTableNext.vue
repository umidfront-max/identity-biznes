<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import VabDraggable from 'vuedraggable'
import { _queryData_DEFAULT, QueryDataModel } from '/@/services/network/axios'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const router = useRouter()
const route = useRoute()

const _showFilterableFields = ref(true)
const _lineHeight = ref<'large' | 'default' | 'small'>('default')
const _isFullscreen = ref(false)

const _selectedRows = ref<any>([])
const _checkedList = ref<any>([])

const _currentPage = ref(route.query?.currentPage || 1)
const _pageSize = ref(10)

const _finallyColumnsComputed = computed(() => {
  return props.tableColumns.filter((item: any) => _checkedList.value.includes(item.label))
})

const _pageCountComputed = computed(() => {
  console.log(_pageSize.value)
  return Math.floor(props.totalItems / _pageSize.value) + (props.totalItems % _pageSize.value ? 1 : 0)
})

const emits = defineEmits(['sort'])

const props = defineProps({
  items: {
    type: Array<any>,
    required: true,
  },
  tableColumns: {
    type: Array<any>,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  totalItems: {
    type: Number,
    default: 0,
  },
  filterableFields: {
    type: Array<any>,
    default: [],
  },
})

props.tableColumns.forEach((item: any) => {
  if (item.checked) _checkedList.value.push(item.label)
})

const dragOptions = computed(() => {
  return {
    animation: 600,
    group: 'description',
  }
})
const _queryData = ref<QueryDataModel>(_queryData_DEFAULT())
_queryData.value.search = route.query?.search as string
function queryData() {
  _queryData.value.search = (route.query?.search as string) || null
  emits('sort', _queryData.value)
}

function handleSort({ prop, order }: { prop: string; order: string }) {
  const sort = (order === 'descending' ? '-' : '') + prop

  router.replace({ query: { ...route.query, sort } })
  _queryData.value.sort = sort
  emits('sort', _queryData.value)
}

function handleSizeChange(value: number) {
  router.replace({ query: { ...route.query, pageSize: value } })
  _pageSize.value = value
  queryData()
}

function handleCurrentChange(value: number) {
  router.replace({ query: { ...route.query, currentPage: value } })
  _currentPage.value = value
  _queryData.value.page = value
  queryData()
}

function clickFullScreen() {
  _isFullscreen.value = !_isFullscreen.value
  router.replace({ query: { ...route.query, isFullscreen: JSON.stringify(_isFullscreen.value) } })
}

function setSelectedRows(value: number[]) {
  _selectedRows.value = value
}

function handleCollapseFilterableFields() {
  _showFilterableFields.value = !_showFilterableFields.value
}

function calculateIndex(index: number) {
  return index + 1 + (+_currentPage.value - 1) * _pageSize.value
}

watch(
  () => _lineHeight.value,
  (value: any) => {
    router.replace({ query: { ...route.query, lineHeight: value } })
  }
)
watch(
  () => _queryData.value.search,
  (value: any) => {
    router.replace({ query: { ...route.query, search: value } })
  }
)
</script>
<template>
  <div class="custom-table-container table-auto-height" :class="{ 'vab-table-fullscreen': _isFullscreen }">
    <vab-query-form>
      <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; margin-top: 10px; margin-bottom: 20px">
        <!-- <vab-query-form-top-panel> -->
        <el-form inline label-width="49px" :model="_queryData" @submit.prevent>
          <el-form-item v-show="_showFilterableFields" label="">
            <el-input
              v-model="_queryData.search"
              clearable
              :placeholder="t('components_universal_table.search_placeholder')"
              :prefix-icon="Search"
              size="large"
              style="width: 440px"
              @submit="queryData"
            />
          </el-form-item>
          <el-form-item>
            <!-- <el-button :icon="Search" :loading="props.loading" native-type="submit" type="primary" @click="queryData">
                {{ $t('components_universal_table.search') }}
              </el-button> -->
            <el-button
              v-if="filterableFields.length > 0"
              class="hidden-xs-only"
              text
              type="primary"
              @click="handleCollapseFilterableFields"
            >
              <span v-if="_showFilterableFields">{{ $t('components_universal_table.show_other') }}</span>
              <span v-else>Hide advanced filters</span>
              <vab-icon class="vab-dropdown" :class="{ 'vab-dropdown-active': _showFilterableFields }" icon="arrow-up-s-line" />
            </el-button>
            <el-popover popper-class="custom-table-checkbox" trigger="hover">
              <template #reference>
                <el-button size="large" style="padding: 0px 24px" type="primary">Фильтр</el-button>
              </template>
              <el-checkbox-group v-model="_checkedList">
                <vab-draggable item-key="{ element }" :list="props.tableColumns" v-bind="dragOptions">
                  <template #item="{ element }">
                    <div>
                      <el-checkbox :disabled="element.disableCheck" :label="element.label">
                        {{ element.label }}
                      </el-checkbox>
                    </div>
                  </template>
                </vab-draggable>
              </el-checkbox-group>
            </el-popover>
          </el-form-item>
        </el-form>
        <!-- </vab-query-form-top-panel> -->
        <!-- <vab-query-form-top-panel> -->
        <div class="custom-table-right-tools">
          <el-button size="large" style="padding: 12px" @click="queryData">
            <vab-icon icon="refresh-line" />
          </el-button>
          <el-button size="large" style="padding: 12px" @click="clickFullScreen">
            <vab-icon :icon="_isFullscreen ? 'fullscreen-exit-fill' : 'fullscreen-fill'" />
          </el-button>
          <el-popover trigger="hover" :width="162">
            <el-radio-group v-model="_lineHeight">
              <el-radio-button label="large">{{ $t('components_universal_table.large') }}</el-radio-button>
              <el-radio-button label="default">{{ $t('components_universal_table.default') }}</el-radio-button>
              <el-radio-button label="small">{{ $t('components_universal_table.small') }}</el-radio-button>
            </el-radio-group>
            <template #reference>
              <el-button size="large" style="padding: 12px">
                <vab-icon icon="line-height" />
              </el-button>
            </template>
          </el-popover>
          <!-- <el-popover popper-class="custom-table-checkbox" trigger="hover">
            <template #reference>
              <el-button>
                <vab-icon icon="settings-line" />
              </el-button>
            </template>
            <el-checkbox-group v-model="_checkedList">
              <vab-draggable item-key="{ element }" :list="props.tableColumns" v-bind="dragOptions">
                <template #item="{ element }">
                  <div>
                    <el-checkbox :disabled="element.disableCheck" :label="element.label">
                      {{ element.label }}
                    </el-checkbox>
                  </div>
                </template>
              </vab-draggable>
            </el-checkbox-group>
          </el-popover> -->

          <slot name="table-standalone-actions" :selected-rows="_selectedRows" />
        </div>
        <!-- </vab-query-form-top-panel> -->
      </div>
    </vab-query-form>
    <el-table
      v-loading="props.loading"
      :border="true"
      :data="props.items"
      :size="_lineHeight"
      :stripe="true"
      @selection-change="setSelectedRows"
      @sort-change="handleSort"
    >
      <el-table-column type="selection" width="38" />
      <el-table-column align="center" label="№" width="55">
        <template #default="{ $index }">
          {{ calculateIndex($index) }}
        </template>
      </el-table-column>

      <el-table-column
        v-for="(item, index) of _finallyColumnsComputed"
        :key="index"
        align="center"
        :label="item.label"
        :prop="item.prop"
        show-overflow-tooltip
        :sortable="item.sortable ? 'custom' : false"
      >
        <template #default="{ row }">
          <span v-if="item.type === 'rating'">
            <el-rate v-model="row.rate" disabled />
          </span>
          <el-popover v-if="item.type === 'image'" placement="top-start" trigger="hover">
            <el-image :src="row.image" />
            <template #reference>
              <el-image :src="row.image" />
            </template>
          </el-popover>
          <span v-if="item.iconUsing">
            <vab-icon :class="item.iconUsing(row)" :icon="item.iconUsing ? item.iconUsing(row) : row[item.prop]" />
          </span>
          <span v-else>{{ item.displayUsing ? item.displayUsing(row) : row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="t('components_universal_table.actions')" width="237">
        <template #default="{ row }">
          <slot name="table-inline-actions" :row="row" />
        </template>
      </el-table-column>
      <template #empty>
        <el-empty class="vab-data-empty" :description="t('components_universal_table.empty')" />
      </template>
    </el-table>
    <el-pagination
      background
      :current-page="+_currentPage"
      layout="total, sizes, prev, pager, next, jumper"
      :page-count="_pageCountComputed"
      :page-size="_pageSize"
      :total="props.totalItems"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.refresh-line {
  color: #2563eb;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.check-line { color: #10b981; }
.close-line { color: #ef4444; }

.custom-table-container {
  .custom-table-right-tools {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
</style>

<style lang="scss">
/* ---- Search input ---- */
.custom-table-container .el-form-item .el-input__wrapper {
  height: 40px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 0 1px #ececec;
  transition: box-shadow 0.15s ease;
}
.custom-table-container .el-form-item .el-input__wrapper:hover {
  box-shadow: 0 0 0 1px #d1d5db;
}
.custom-table-container .el-form-item .el-input__wrapper.is-focus {
  box-shadow: 0 0 0 1.5px #2563eb !important;
}

/* ---- Filter (blue) button in the form ---- */
.custom-table-container .el-form .el-button--primary {
  height: 40px;
  padding: 0 20px !important;
  font-size: 13px;
  font-weight: 600;
  color: #ffffff !important;
  background: #2563eb !important;
  border-color: #2563eb !important;
  border-radius: 10px !important;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25) !important;
  transition: all 0.15s ease !important;
}
.custom-table-container .el-form .el-button--primary:hover {
  background: #1d4ed8 !important;
  border-color: #1d4ed8 !important;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35) !important;
}

/* ---- Right tools (refresh, fullscreen, density) ---- */
.custom-table-container .custom-table-right-tools > .el-button,
.custom-table-container .custom-table-right-tools .el-popover__reference .el-button {
  width: 40px;
  height: 40px;
  padding: 0 !important;
  background: #ffffff !important;
  border: 1px solid #ececec !important;
  border-radius: 10px !important;
  color: #4b5563 !important;
  box-shadow: none !important;
  transition: all 0.15s ease !important;
}
.custom-table-container .custom-table-right-tools > .el-button [class*='ri-'],
.custom-table-container .custom-table-right-tools .el-popover__reference .el-button [class*='ri-'] {
  font-size: 18px;
  margin: 0 !important;
  color: #4b5563;
}
.custom-table-container .custom-table-right-tools > .el-button:hover,
.custom-table-container .custom-table-right-tools .el-popover__reference .el-button:hover {
  color: #2563eb !important;
  background: #eff6ff !important;
  border-color: #bfdbfe !important;
}
.custom-table-container .custom-table-right-tools > .el-button:hover [class*='ri-'],
.custom-table-container .custom-table-right-tools .el-popover__reference .el-button:hover [class*='ri-'] {
  color: #2563eb;
}

/* ---- Add (solid blue) button ---- */
.custom-table-container .custom-table-right-tools .el-button--primary {
  width: auto !important;
  height: 40px !important;
  padding: 0 22px !important;
  font-size: 13px;
  font-weight: 600;
  color: #ffffff !important;
  background: #2563eb !important;
  border: 1px solid #2563eb !important;
  border-radius: 10px !important;
  box-shadow: 0 2px 10px rgba(37, 99, 235, 0.3) !important;
}
.custom-table-container .custom-table-right-tools .el-button--primary img {
  filter: brightness(0) invert(1);
  width: 16px;
  height: 16px;
  margin-right: 6px;
}
.custom-table-container .custom-table-right-tools .el-button--primary:hover {
  background: #1d4ed8 !important;
  border-color: #1d4ed8 !important;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.4) !important;
}

/* ---- Delete (red, when rows selected) ---- */
.custom-table-container .custom-table-right-tools .el-button--danger {
  width: auto !important;
  height: 40px !important;
  padding: 0 22px !important;
  font-size: 13px;
  font-weight: 600;
  color: #ffffff !important;
  background: #ef4444 !important;
  border: 1px solid #ef4444 !important;
  border-radius: 10px !important;
  box-shadow: 0 2px 10px rgba(239, 68, 68, 0.3) !important;
}
.custom-table-container .custom-table-right-tools .el-button--danger img {
  filter: brightness(0) invert(1);
  width: 16px;
  height: 16px;
  margin-right: 6px;
}
.custom-table-container .custom-table-right-tools .el-button--danger:hover {
  background: #dc2626 !important;
  border-color: #dc2626 !important;
  box-shadow: 0 4px 16px rgba(239, 68, 68, 0.4) !important;
}

/* ---- Table ---- */
.custom-table-container .el-table {
  --el-table-border-color: #ececec;
  --el-table-header-bg-color: #fafafa;
  --el-table-row-hover-bg-color: #f9fafb;
  --el-table-tr-bg-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #ececec;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}
.custom-table-container .el-table th.el-table__cell {
  background: #fafafa !important;
  height: 44px;
}
.custom-table-container .el-table th.el-table__cell .cell {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}
.custom-table-container .el-table td.el-table__cell {
  height: 52px;
}
.custom-table-container .el-table td.el-table__cell .cell {
  font-size: 13px;
  color: #1f2937;
}
.custom-table-container .el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
  background: #fafafa;
}

/* ---- Action buttons in table (icons are SVG with stroke="white" so need SOLID backgrounds) ---- */
.custom-table-container .el-table .el-button {
  width: 34px;
  height: 34px;
  padding: 0 !important;
  margin: 0 3px;
  border-radius: 8px !important;
  border: none !important;
  box-shadow: none !important;
  transition: all 0.15s ease !important;
}
.custom-table-container .el-table .el-button img {
  width: 16px;
  height: 16px;
}

/* View — solid blue */
.custom-table-container .el-table .el-button--info {
  background: #3b82f6 !important;
}
.custom-table-container .el-table .el-button--info:hover {
  background: #2563eb !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3) !important;
}

/* Edit — solid amber */
.custom-table-container .el-table .el-button--warning {
  background: #f59e0b !important;
}
.custom-table-container .el-table .el-button--warning:hover {
  background: #d97706 !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(245, 158, 11, 0.35) !important;
}

/* Delete — solid red */
.custom-table-container .el-table .el-button--danger {
  background: #ef4444 !important;
}
.custom-table-container .el-table .el-button--danger:hover {
  background: #dc2626 !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(239, 68, 68, 0.35) !important;
}

/* ---- Pagination ---- */
.custom-table-container .el-pagination {
  margin-top: 20px;
  padding: 4px 0;
  justify-content: center;
}
.custom-table-container .el-pagination .el-pagination__total,
.custom-table-container .el-pagination .el-pagination__jump {
  font-size: 13px;
  color: #6b7280;
}
.custom-table-container .el-pagination .el-input__wrapper {
  height: 32px;
  border-radius: 8px;
  box-shadow: 0 0 0 1px #ececec;
}
.custom-table-container .el-pagination.is-background .btn-prev,
.custom-table-container .el-pagination.is-background .btn-next,
.custom-table-container .el-pagination.is-background .el-pager li {
  background: #ffffff !important;
  border: 1px solid #ececec !important;
  border-radius: 8px !important;
  color: #4b5563 !important;
  font-weight: 500;
  transition: all 0.15s ease !important;
}
.custom-table-container .el-pagination.is-background .btn-prev:hover:not(.is-disabled),
.custom-table-container .el-pagination.is-background .btn-next:hover:not(.is-disabled),
.custom-table-container .el-pagination.is-background .el-pager li:hover:not(.is-disabled) {
  color: #2563eb !important;
  border-color: #bfdbfe !important;
  background: #eff6ff !important;
}
.custom-table-container .el-pagination.is-background .el-pager li.is-active {
  background: #2563eb !important;
  border-color: #2563eb !important;
  color: #ffffff !important;
}

/* Light mode cell color */
.light .custom-table-container .el-table--default .cell {
  color: #1f2937;
}
.light .custom-table-container .cell span {
  color: #1f2937;
}
</style>
