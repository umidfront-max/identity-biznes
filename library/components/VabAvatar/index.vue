<template>
  <el-dropdown @command="handleCommand" @visible-change="handleVisibleChange">
    <span class="avatar-dropdown">
      <el-avatar class="user-avatar" :src="_profileStore.avatar?.preview_link || './static/svg/avatar.svg'" />
      <div class="username">
        <div>
          <h3 class="">
            {{ _profileStore.last_name + ' ' + _profileStore.first_name }}
          </h3>
          <p class="">{{ _profileStore.username }}</p>
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
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;

  .user-avatar {
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    padding: 8px;
    margin-left: 15px;
    cursor: pointer;
    border-radius: 50%;
  }

  .username {
    position: relative;
    display: flex;
    align-content: center;
    align-items: center;
    width: max-content;
    height: 40px;
    margin-left: 6px;
    line-height: 40px;
    cursor: pointer;

    [class*='ri-'] {
      margin-left: 0 !important;
    }
  }
}

// custom style
.username {
  h3 {
    margin: 16px 0px 8px 0px !important;
    margin-top: 1px;
    font-size: 12px;
    font-weight: 600;
    line-height: 10px !important;
  }
  p {
    margin-top: 4px !important;
    font-size: 12px;
    line-height: 10px !important;
  }
}
</style>
