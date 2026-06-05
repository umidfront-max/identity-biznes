<template>
  <el-dropdown @command="handleCommand" @visible-change="handleVisibleChange">
    <span class="avatar-dropdown">
      <span class="avatar-mark">{{ initials }}</span>
      <div class="username">
        <div class="username-info">
          <h3>{{ _profileStore.last_name + ' ' + _profileStore.first_name }}</h3>
          <p>{{ _profileStore.username }}</p>
        </div>
        <vab-icon class="vab-dropdown" :class="{ 'vab-dropdown-active': active }" icon="arrow-down-s-line" />
      </div>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="logout">
          <vab-icon icon="logout-circle-r-line" />
          <span>{{ $t('logout') }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { RESET_ALL, _profileStore, logout_API } from '~/src/services/profile'
import { toLoginRoute } from '/@/utils/routes'

defineOptions({
  name: 'VabAvatar',
})

const router = useRouter()
const active = ref<boolean>(false)

const initials = computed(() => {
  const f = _profileStore.value?.first_name?.[0] || ''
  const l = _profileStore.value?.last_name?.[0] || ''
  return (f + l).toUpperCase() || 'U'
})

const handleVisibleChange = (value: boolean) => {
  active.value = value
}
const handleCommand = async (command: any) => {
  switch (command) {
    case 'logout':
      await logout_API()
      RESET_ALL()
      router.push(toLoginRoute('/login'))
      location.reload()
      break
  }
}
</script>

<style lang="scss" scoped>
.avatar-dropdown {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 10px 4px 4px;
  margin-left: 8px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #f3f4f6;
  }
}

.avatar-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: -0.3px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.25);
}

.username {
  display: flex;
  align-items: center;
  gap: 4px;
}

.username-info {
  display: flex;
  flex-direction: column;
  line-height: 1.2;

  h3 {
    margin: 0;
    font-size: 13px;
    font-weight: 600;
    color: #111;
    letter-spacing: -0.1px;
  }

  p {
    margin: 2px 0 0;
    font-size: 11px;
    color: #6b7280;
  }
}

:deep(.vab-dropdown) {
  margin-left: 4px !important;
  font-size: 16px;
  color: #1f2937 !important;
  transition: transform 0.2s ease;
}

:deep(.vab-dropdown-active) {
  transform: rotate(180deg);
}
</style>
