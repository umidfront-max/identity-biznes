<template>
  <div class="custom-table-container table-auto-height" :class="{ 'vab-table-fullscreen': isFullscreen }">
    <vab-query-form>
      <vab-query-form-top-panel>
        <el-form inline label-width="49px" :model="searchForm" @submit.prevent>
          <el-form-item v-show="showFilterableFields" label="">
            <el-input v-model="searchForm.search" clearable placeholder="Please enter a keyword" />
          </el-form-item>
          <el-form-item
            v-for="filterableField in props.filterableFields"
            v-show="!showFilterableFields"
            :key="filterableField.prop"
            :label="filterableField.label"
          >
            <!-- TODO - add support for other types of fields -->
            <el-input v-model="searchForm[filterableField.prop]" clearable :placeholder="'Please enter a ' + filterableField.label" />
          </el-form-item>
          <el-form-item>
            <el-button :icon="Search" :loading="listLoading" native-type="submit" type="primary" @click="queryData">Search</el-button>
            <el-button
              v-if="filterableFields.length > 0"
              class="hidden-xs-only"
              text
              type="primary"
              @click="handleCollapseFilterableFields"
            >
              <span v-if="showFilterableFields">Show other filters</span>
              <span v-else>Hide advanced filters</span>
              <vab-icon class="vab-dropdown" :class="{ 'vab-dropdown-active': showFilterableFields }" icon="arrow-up-s-line" />
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-top-panel>
      <vab-query-form-left-panel>
        <slot name="table-standalone-actions" :selected-rows="selectRows" />
      </vab-query-form-left-panel>
      <vab-query-form-right-panel>
        <div class="custom-table-right-tools">
          <el-button @click="queryData">
            <vab-icon icon="refresh-line" />
          </el-button>
          <el-button @click="clickFullScreen">
            <vab-icon :icon="isFullscreen ? 'fullscreen-exit-fill' : 'fullscreen-fill'" />
          </el-button>
          <el-popover trigger="hover" :width="162">
            <el-radio-group v-model="lineHeight">
              <el-radio-button label="large">Large</el-radio-button>
              <el-radio-button label="default">Default</el-radio-button>
              <el-radio-button label="small">Small</el-radio-button>
            </el-radio-group>
            <template #reference>
              <el-button>
                <vab-icon icon="line-height" />
              </el-button>
            </template>
          </el-popover>
          <el-popover popper-class="custom-table-checkbox" trigger="hover">
            <template #reference>
              <el-button>
                <vab-icon icon="settings-line" />
              </el-button>
            </template>
            <el-checkbox-group v-model="checkList">
              <vab-draggable item-key="{ element }" :list="tableColumns" v-bind="dragOptions">
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
        </div>
      </vab-query-form-right-panel>
    </vab-query-form>
    <el-table
      ref="tableSortRef"
      v-loading="listLoading"
      :border="true"
      :data="props.listResponse?.data ?? []"
      :size="lineHeight"
      :stripe="true"
      @selection-change="setSelectRows"
      @sort-change="handleSortChange"
    >
      <el-table-column type="selection" width="38" />
      <el-table-column align="center" label="№" width="55">
        <template #default="{ $index }">
          {{ $index + (props.listResponse?.meta?.from ?? 1) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Actions" width="237">
        <template #default="{ row }">
          <slot name="table-inline-actions" :row="row" />
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in finallyColumns"
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
          <span v-else>{{ item.displayUsing ? item.displayUsing(row) : row[item.prop] }}</span>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty class="vab-data-empty" description="No data" />
      </template>
    </el-table>
    <el-pagination
      background
      :current-page="props.currentFilters.page ?? 1"
      :layout="layout"
      :page-count="props.listResponse?.meta?.last_page ?? 1"
      :page-size="props.currentFilters.per_page ?? 10"
      :total="props.listResponse?.meta?.total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import VabDraggable from 'vuedraggable'
import { BaseListRequest } from '/@/base/baseListRequest.ts'
import { BaseListResponse } from '/@/base/baseListResponse.ts'
import { BaseTableColumn } from '/@/base/baseTableColumn.ts'
import { BaseTableFilterableField } from '/@/base/baseTableFilterableField.ts'

defineOptions({
  name: 'UniversalTable',
})

const props = defineProps<{
  listResponse?: BaseListResponse<any>
  currentFilters: BaseListRequest
  filterableFields: BaseTableFilterableField[]
  tableColumns: BaseTableColumn[]
  onFiltersChanged: (query: BaseListRequest) => void
}>()

const tableSortRef = ref<any>(null)
const showFilterableFields = ref<boolean>(true)
const lineHeight = ref<any>('default')
const isFullscreen = ref<boolean>(false)
const listLoading = ref<boolean>(true)
const layout = ref<string>('total, sizes, prev, pager, next, jumper')
const selectRows = ref<any>([])
const checkList = ref<any>([])

const dragOptions = computed(() => {
  return {
    animation: 600,
    group: 'description',
  }
})
const searchForm = reactive<any>({
  pageNo: 1,
  pageSize: 20,
  title: '',
})

const finallyColumns = computed(() => {
  return props.tableColumns.filter((item: any) => checkList.value.includes(item.label))
})

const fetchData = async (filters: BaseListRequest) => {
  listLoading.value = true
  await props.onFiltersChanged({
    ...props.currentFilters,
    ...filters,
  })
  listLoading.value = false
}

const handleSortChange = ({ prop, order }: { prop: string; order: string }) => {
  fetchData({
    sort: (order === 'descending' ? '-' : '') + prop,
  })
}

const handleSizeChange = (value: number) => {
  fetchData({
    per_page: value,
    page: 1,
  })
}

const handleCurrentChange = (value: number) => {
  fetchData({
    page: value,
  })
}

const queryData = () => {
  fetchData({
    page: 1,
    ...searchForm,
  })
}

const clickFullScreen = () => {
  isFullscreen.value = !isFullscreen.value
}

const setSelectRows = (value: any) => {
  selectRows.value = value
}

const handleCollapseFilterableFields = () => {
  showFilterableFields.value = !showFilterableFields.value
}

onBeforeMount(() => {
  props.tableColumns.forEach((item: any) => {
    if (item.checked) checkList.value.push(item.label)
  })
  fetchData({})
})
</script>

<style lang="scss" scoped>
.custom-table-container {
  .custom-table-right-tools {
    display: flex;
    align-items: center;
  }
}
</style>
