<template>
  <el-popover placement="bottom-end" trigger="hover" :width="320">
    <template #reference>
      <button class="notice-btn">
        <el-badge :is-dot="!!badge" type="danger">
          <vab-icon icon="notification-2-line" />
        </el-badge>
      </button>
    </template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="t('notice.notice')" name="notice">
        <div class="notice-list">
          <el-scrollbar>
            <ul v-if="badge">
              <li v-for="(item, index) in notices" :key="index">
                <el-avatar :size="40" :src="item.image" />
                <span v-html="item.notice" />
              </li>
            </ul>
            <el-empty v-else :description="t('no_data')" />
          </el-scrollbar>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="t('notice.email')" name="email">
        <div class="notice-list">
          <el-scrollbar>
            <ul v-if="badge">
              <li v-for="(item, index) in notices" :key="index">
                <el-avatar :size="40" :src="item.image" />
                <span>{{ item.email }}</span>
              </li>
            </ul>
            <el-empty v-else :description="t('no_data')" />
          </el-scrollbar>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="notice-clear" @click="handleClearNotice">
      <el-button text>
        <vab-icon icon="close-circle-line" />
        <span>{{ t('notice.clear_message') }}</span>
      </el-button>
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
import { useSettingsStore } from '/@/store/modules/settings'
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'VabNotice',
})

const { t } = useI18n()
const $baseMessage = inject<any>('$baseMessage')
const settingsStore = useSettingsStore()
const { theme } = storeToRefs(settingsStore)
const activeName = ref<string>('notice')
const notices = ref<Array<any>>([])
const badge = ref<any>(undefined)

const fetchData = async () => {
  // const { data } = await getList()
  // notices.value = data.list
  notices.value = []
  // badge.value = data.total === 0 ? undefined : data.total
}

const handleClick = () => {
  fetchData()
}

const handleClearNotice = () => {
  badge.value = ''
  notices.value = []
  $baseMessage(t('notice.successfully_cleared'), 'success', 'hey')
}

onBeforeMount(() => {
  if (theme.value.showNotice) fetchData()
})
</script>

<style lang="scss" scoped>
.notice-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background: #f3f4f6;
  border: none;
  border-radius: 10px;
  color: #111111;
  cursor: pointer;
  transition: all 0.15s ease;

  :deep([class*='ri-']) {
    font-size: 18px;
    margin: 0 !important;
    color: #111111 !important;
  }

  &:hover {
    background: #e5e7eb;
  }
}

.dark .notice-btn {
  background: #1f2937;
}

.dark .notice-btn :deep([class*='ri-']) {
  color: #d1d5db !important;
}

.dark .notice-btn:hover {
  background: #374151;
}

:deep() {
  .el-tabs__active-bar {
    min-width: 28px;
  }

  .el-badge__content.is-dot {
    width: 8px;
    height: 8px;
    top: 4px;
    right: 4px;
    border: 2px solid #ffffff;
    background: #ef4444;
  }
}

.notice-list {
  height: 315px;

  ul {
    padding: 0 15px 0 0;
    margin: 0;

    li {
      display: flex;
      align-items: center;
      padding: 10px 0 15px 0;

      &:hover {
        background-color: var(--el-color-primary-light-9);
        border-radius: var(--el-border-radius-base);
      }

      :deep() {
        .el-avatar {
          flex-shrink: 0;
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }

      span {
        margin-left: 10px;
      }
    }
  }
}

.notice-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0 0 0;
  font-size: var(--el-font-size-default);
  text-align: center;
  cursor: pointer;
  border-top: 1px solid var(--el-border-color);
}
</style>
