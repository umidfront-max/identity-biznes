<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { LogsModel, getLogs_DEFAULT } from '/@/services/activeLogs'
import { formatDate_UTIL } from '~/src/utils/dateFormat'
const _title = ref('')
const _visible = ref(false)
const _formRef = ref<FormInstance>()
const _item = ref<LogsModel>(getLogs_DEFAULT())

function open(item: LogsModel) {
  console.log(item)
  _item.value = item
  _title.value = 'Log'
  _visible.value = true
}

function close() {
  reset()
}

function reset() {
  _formRef.value?.resetFields()
  _item.value = getLogs_DEFAULT()
  _visible.value = false
}

defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="_visible" append-to-body draggable :title="_title" width="900px" @close="close">
    <!-- <div>{{ _item?.user?.avatar.url_preview }}
      <img :src="_item?.user?.avatar?.url_preview" alt="">
    </div> -->
    <el-descriptions border :column="2" :title="'title: ' + _item.description">
      <el-descriptions-item>
        <template #label>{{ $t('profile.columns.description') }}</template>
        {{ _item.description }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('profile.columns.attributes.name') }}</template>
        {{ _item.properties.attributes.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('profile.columns.subject_id') }}</template>
        {{ _item.subject_id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('profile.columns.created_at') }}</template>
        {{ formatDate_UTIL(_item.created_at, false) }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('profile.columns.subject_id') }}</template>
        {{ _item.subject_id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('profile.columns.attributes_name') }}</template>
        {{ _item.properties?.attributes?.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('profile.columns.old_name') }}</template>
        {{ _item.properties?.old.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('profile.columns.username') }}</template>
        {{ _item.user?.username }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('profile.columns.first_name') }}</template>
        {{ _item.user?.first_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('profile.columns.last_name') }}</template>
        {{ _item.user?.last_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('profile.columns.phone') }}</template>
        {{ _item.user?.phone }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>{{ $t('profile.columns.status') }}</template>
        {{ _item.user?.status }}
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>
