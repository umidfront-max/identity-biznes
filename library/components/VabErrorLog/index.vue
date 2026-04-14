<template>
  <div v-if="errorLogs.length > 0">
    <el-badge type="danger" :value="errorLogs.length" @click="dialogVisible = true">
      <vab-icon icon="bug-line" />
    </el-badge>

    <vab-dialog v-model="dialogVisible" append-to-body :title="t('error_log.exception_capture')" width="60%">
      <vab-error-log-content />
      <template #footer>
        <el-button @click="dialogVisible = false">{{ $t('buttons.cancel') }}</el-button>
        <el-button type="danger" @click="clearAll">{{ $t('error_log.not_shown_yet') }}</el-button>
      </template>
    </vab-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useErrorLogStore } from '/@/store/modules/errorLog'
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'VabErrorLog',
})

const { t } = useI18n()
const errorLogStore = useErrorLogStore()
const { errorLogs } = storeToRefs(errorLogStore)
const { clearErrorLog } = errorLogStore
const dialogVisible = ref<boolean>(false)

const clearAll = () => {
  dialogVisible.value = false
  clearErrorLog()
}
</script>
