<template>
  <div class="comprehensive-table-container table-auto-height vab-table">
    <vab-card>
      <div class="vab-table-header">
        <h4 class="vab-table-header-title" style="margin: 0">
          {{ model.title }}
        </h4>
        <div>
          <vab-icon v-if="model.hasCreate" icon="add-box-fill" :style="{ fontSize: '30px' }" @click="handleAdd" />
        </div>
      </div>
    </vab-card>
    <el-table ref="vabTableRef" v-loading="model.isBusy.value" border :data="model.list.value">
      <el-table-column type="selection" width="38" />
      <el-table-column align="center" label="№" width="55">
        <template #default="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column :label="t('table.actions')" min-width="190">
        <template #default="{ row }">
          <el-button v-if="model.hasView" :icon="View" plain type="info" @click="handleView(row)" />
          <el-button v-if="model.hasEdit" :icon="Edit" plain type="warning" @click="updateItem(row)" />
          <el-button v-if="model.hasDelete" :icon="Delete" plain type="danger" @click="onDelete(row)" />
        </template>
      </el-table-column>
      <el-table-column v-for="col in model.tableColumns" :key="col.key" align="left" :label="col.label" :min-width="col.width">
        <template #default="{ row }">
          <slot :data="row" :name="col.key">
            {{ getValueFromGivenObjectByKey(row, col.key) }}
          </slot>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty class="vab-data-empty">
          <template #description></template>
        </el-empty>
      </template>
    </el-table>
    <vab-pagination :model="model" />
  </div>
</template>

<script lang="ts" setup>
import { Delete, Edit, View } from '@element-plus/icons-vue'
import TableModelConfig from '/@/config/table-model.config.ts'
import { getValueFromGivenObjectByKey } from '/@/utils/object.ts'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

defineOptions({ name: 'VabTable' })

const props = defineProps<{
  tableModel: TableModelConfig
}>()

const emits = defineEmits(['updateItem', 'deleteItem', 'createItem', 'viewItem', 'reviewItem'])

const model = props.tableModel

// METHODS =====>

const onDelete = (data: any) => {
  model.onDelete(data)
  emits('deleteItem', data)
}

const handleAdd = () => {
  emits('createItem')
}

const updateItem = (row: any) => {
  emits('updateItem', row)
}

const handleView = (row: object) => {
  model.setFormColumns(row)
  emits('viewItem', row)
}

// LIFECYCLES===>
onBeforeMount(() => {
  model.getList()
})
</script>
<style scoped lang="scss">
.vab-table {
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
